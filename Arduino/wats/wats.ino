#include <Arduino.h>
#include <Wire.h>
#include <AccelStepper.h>

#define TESTMODE 0  // 1 for test mode, 0 for normal mode
#define TESTACCELERATION 0 // 1 for testing acceleration configuration, 0 for normal mode
#define ROTATION_ENABLE 0

// Expansion steppers
#define dirPin_E A0
#define stepPin_E A1

// Contraction steppers
#define dirPin_C A2
#define stepPin_C A3

// Rotation Left
#define dirPin_RotL 10
#define stepPin_RotL 11

// Rotation Right
#define dirPin_RotR 12
#define stepPin_RotR 13

// Switches
#define microSwitchWinding 4
#define microSwitchUnWinding 5

#define resetSwitch 6

const int stepsPerRevolution = 200;
const int minSpeed = 200;
const int maxSpeed = 1000; //70
const int rotationMaxSpeed = 100;
const int maxAcceleration = 100; // Conservative arbitrary Value requires testing
int analogSpeed, speed;
bool interrupt = false;

AccelStepper expansionSteppers(AccelStepper::DRIVER, stepPin_E, dirPin_E);
AccelStepper contractionSteppers(AccelStepper::DRIVER, stepPin_C, dirPin_C);
AccelStepper rotationLeftStepper(AccelStepper::DRIVER, stepPin_RotL, dirPin_RotL);
AccelStepper rotationRightStepper(AccelStepper::DRIVER, stepPin_RotR, dirPin_RotR);

const int MaxExpansionLength = -4000;
const int MinExpansionLength = -100;

#define MOTIONLENGTH 4
// Motion array for Expansion/Contraction
// Pairs of integers ( Position, Speed)
// First index is the best motion
int motion[][MOTIONLENGTH]{
  {  MinExpansionLength*10, maxSpeed/1.8,  MaxExpansionLength,     maxSpeed/1.8 },
  {  MinExpansionLength*6, maxSpeed/1.6,  MaxExpansionLength*0.8, maxSpeed/1.6 },
  {  MinExpansionLength*4, maxSpeed/1.3,  MaxExpansionLength*0.5, maxSpeed/1.3 },
  {  MinExpansionLength*1, maxSpeed/1.2,  MaxExpansionLength*0.2, maxSpeed/1.2 },
  {  MinExpansionLength*1, maxSpeed/1.2,  MaxExpansionLength*0.1, maxSpeed/1.2 }
};

// Motion array for Rotation
// Pairs of integers ( Position, Speed)
int rotationMotion[][MOTIONLENGTH]{
  { 10, rotationMaxSpeed/1.9, -10, -rotationMaxSpeed/1.9 },
  { 50, rotationMaxSpeed/1.8, -50, -rotationMaxSpeed/1.8 },
  { 30, rotationMaxSpeed/1.7, -30, -rotationMaxSpeed/1.7 },
  { 40, rotationMaxSpeed/1.6, -40, -rotationMaxSpeed/1.6 },
  { 50, rotationMaxSpeed/1.5, -50, -rotationMaxSpeed/1.5 }
};

// Acceleration Array for Expansion/Contraction
// Pairs of integers (Acceleration, Position)
// First pair is for increasing speed
// Second pair is for decreasing speed
int accelerationMotion[][MOTIONLENGTH]{
  {maxAcceleration / 10, 0, -maxAcceleration / 10, 1},
  {maxAcceleration / 8, 0, -maxAcceleration / 8, 1},
  {maxAcceleration / 6, 0, -maxAcceleration / 6, 1},
  {maxAcceleration / 4, 0, -maxAcceleration / 4, 1},
  {maxAcceleration / 2, 0, -maxAcceleration / 2, 1}
};

int currentMotionIndex = -1;
int currentMotionStep = 0;
int currentAccelStep = 0;

void setup() {
  pinMode(dirPin_E, OUTPUT);
  pinMode(stepPin_E, OUTPUT);
  pinMode(dirPin_C, OUTPUT);
  pinMode(stepPin_C, OUTPUT);

  pinMode(microSwitchUnWinding, INPUT_PULLUP);
  pinMode(microSwitchWinding, INPUT_PULLUP);
  pinMode(resetSwitch, INPUT_PULLUP);

  expansionSteppers.setMaxSpeed(maxSpeed);
  contractionSteppers.setMaxSpeed(maxSpeed);
  rotationLeftStepper.setMaxSpeed(maxSpeed);
  rotationRightStepper.setMaxSpeed(maxSpeed);

  expansionSteppers.setCurrentPosition(0);
  contractionSteppers.setCurrentPosition(0);
  rotationLeftStepper.setCurrentPosition(0);
  rotationRightStepper.setCurrentPosition(0);

  // Serial
  Serial.begin(19200);
}

void loop() {
  
  PollSerial();
  // Perform Motion routines
  RunMotion();
  // Switches used for Debug
  HandleSwitches();

}

void RunMotion()
{
  // Early out if there is not Motion Index Set
  if (currentMotionIndex == -1)
    return;

  long distance = contractionSteppers.distanceToGo();
  long position = contractionSteppers.currentPosition();
  // Serial.println(distance);
  int direction = 1;
  if (distance < 0)
  {
    direction = -1;
  }
  

  if (direction * distance * motion[currentMotionIndex][currentMotionStep + 1] <= 0)
  {
      // Loop around if we are at the end of the motion array
      if (currentMotionStep + 2 >= MOTIONLENGTH) {
        currentMotionStep = 0;
      } else {
        currentMotionStep += 2;
      }

      contractionSteppers.moveTo(motion[currentMotionIndex][currentMotionStep]);
      expansionSteppers.moveTo(motion[currentMotionIndex][currentMotionStep]);
      #if ROTATION_ENABLE
        rotationLeftStepper.moveTo(rotationMotion[currentMotionIndex][currentMotionStep]);
        rotationRightStepper.moveTo(rotationMotion[currentMotionIndex][currentMotionStep]);
      #endif
  }

#if TESTACCELERATION
  if(position <= motion[currentMotionIndex][currentMotionStep]/2){
    currentAccelStep = 1;
    contractionSteppers.setAcceleration(accelerationMotion[currentMotionIndex][currentAccelStep]);
    expansionSteppers.setAcceleration(accelerationMotion[currentMotionIndex][currentAccelStep]);
  } else {
    currentAccelStep = 3;
    contractionSteppers.setAcceleration(accelerationMotion[currentMotionIndex][currentAccelStep]);
    expansionSteppers.setAcceleration(accelerationMotion[currentMotionIndex][currentAccelStep]);
  }
#endif

  contractionSteppers.run();
  contractionSteppers.setSpeed(direction * motion[currentMotionIndex][currentMotionStep + 1]);
  expansionSteppers.run();
  expansionSteppers.setSpeed(direction * motion[currentMotionIndex][currentMotionStep + 1]);

#if ROTATION_ENABLE
  rotationLeftStepper.run();
  rotationLeftStepper.setSpeed(rotationMotion[currentMotionIndex][currentMotionStep + 1]);
  rotationRightStepper.run();
  rotationRightStepper.setSpeed(rotationMotion[currentMotionIndex][currentMotionStep + 1]);
#endif //ROTATION_ENABLE

#if TESTMODE
  Serial.print("contraction pos: ");
  Serial.println(contractionSteppers.currentPosition());
#endif // TESTMODE

}


// Reset the structure positions
void PerformHome() {
  currentMotionIndex = -1;
  currentMotionStep = 0;
  currentAccelStep = 0;
  // TODO: Move the steppers to home position
}

// Set which motion index to run
void PerformMotion(int index) {
  currentMotionIndex = index;
  currentMotionStep = 0;
  currentAccelStep = 0;
}

void PerformStop() {
  Serial.write("Performing Stop\n");
  interrupt = true;
  currentMotionIndex = -1;
  currentMotionStep = 0;
  currentAccelStep = 0;
}

// Hard Reset for tesing purposes
void PerformReset() {
  Serial.write("Perform Reset\n");

  interrupt = true;
  currentMotionIndex = -1;
  currentMotionStep = 0;
  currentAccelStep = 0;

  expansionSteppers.setCurrentPosition(0);
  contractionSteppers.setCurrentPosition(0);
  rotationLeftStepper.setCurrentPosition(0);
  rotationRightStepper.setCurrentPosition(0);
}

void PerformExpansion() {
  speed = maxSpeed;
  contractionSteppers.moveTo(-1000);
  expansionSteppers.moveTo(-1000);
  Serial.print("Performing expansion: ");
  interrupt = false;
  while (!interrupt) {
    contractionSteppers.run();
    contractionSteppers.setSpeed(-speed);
    expansionSteppers.run();
    expansionSteppers.setSpeed(-speed);

    if(Serial.available() > 0 && Serial.read() == 's'){
      Serial.println("Stopping expansions...");
      interrupt = true;
    }
  }
  interrupt = false;
}

void PerformContraction(){
  speed = 1000;

  contractionSteppers.moveTo(1000);
  expansionSteppers.moveTo(1000);
  Serial.print("Performing contraction: ");
  interrupt = false;
  while (!interrupt) {
    contractionSteppers.run();
    contractionSteppers.setSpeed(speed);
    expansionSteppers.run();
    expansionSteppers.setSpeed(speed);

    if(Serial.available() > 0 && Serial.read() == 's'){
      Serial.println("Stopping contractions...");
      interrupt = true;
    }
  }
  interrupt = false;
}

void PerformStepExpansion() {
  contractionSteppers.move(-10);
  expansionSteppers.move(-10);
  
  Serial.println("Performing step expansion: ");
 
  contractionSteppers.run();
  contractionSteppers.setSpeed(-maxSpeed);
  expansionSteppers.run();
  expansionSteppers.setSpeed(-maxSpeed);

}

void PerformStepContraction(){
  speed = maxSpeed;

  contractionSteppers.move(10);
  expansionSteppers.move(10);
  
  Serial.println("Performing step contraction: ");

  contractionSteppers.run();
  contractionSteppers.setSpeed(speed);
  expansionSteppers.run();
  expansionSteppers.setSpeed(speed);

}

void PerformClockwise(){
  rotationLeftStepper.move(1);
  rotationRightStepper.move(1);

  Serial.println("Performing clockwise rotation: ");
  interrupt = false;
  while (!interrupt) {
    rotationLeftStepper.run();
    rotationLeftStepper.setSpeed(rotationMaxSpeed);
    rotationRightStepper.run();
    rotationRightStepper.setSpeed(rotationMaxSpeed);

    if(Serial.available() > 0 && Serial.read() == 's'){
      Serial.println("Stopping clockwise rotations...");
      interrupt = true;
    }
  }
  interrupt = false;
}

void PerformCounterClockwise(){
  rotationLeftStepper.move(-1);
  rotationRightStepper.move(-1);

  Serial.print("Performing counterclockwise rotation: ");
  interrupt = false;
  while (!interrupt) {
    rotationLeftStepper.run();
    rotationLeftStepper.setSpeed(-rotationMaxSpeed);
    rotationRightStepper.run();
    rotationRightStepper.setSpeed(-rotationMaxSpeed);

    if(Serial.available() > 0 && Serial.read() == 's'){
      Serial.println("Stopping counterclockwise rotations...");
      interrupt = true;
    }
  }
  interrupt = false;
}

// Check for any new commands
void PollSerial() {

  // Read from Serial for a command
  if (Serial.available() > 0) {
    char command = Serial.read();
    switch (command) {
      case 'h':
        PerformHome();
        break;
      case 's':
        PerformStop();
        break;
      case 'r':
        PerformReset();
        break;
      case 'c':
        PerformContraction();
        break;
      case 'e':
        PerformExpansion();
        break;
      case 'q':
        PerformClockwise();
        break;
      case 'w':
        PerformCounterClockwise();
        break;
      case 'n':
        PerformStepExpansion();
        break;
      case 'm':
        PerformStepContraction();
        break;
      default:
        // Test to see if the command is a number
        if (command >= '0' && command <= '4') {
          PerformMotion(command - '0');
        }
    }
  }
}

void HandleSwitches() {

  if (digitalRead(microSwitchUnWinding) == LOW) {
    speed = 1000;

    contractionSteppers.moveTo(-1000);
    expansionSteppers.moveTo(-1000);
    rotationLeftStepper.moveTo(-1000);
    rotationRightStepper.moveTo(-1000);

    while ((expansionSteppers.isRunning()) && digitalRead(microSwitchUnWinding) == LOW) {
      contractionSteppers.run();
      contractionSteppers.setSpeed(-speed);
      expansionSteppers.run();
      expansionSteppers.setSpeed(-speed);
      
      rotationLeftStepper.run();
      rotationLeftStepper.setSpeed(-speed);
      rotationRightStepper.run();
      rotationRightStepper.setSpeed(-speed);
      
    }
  }

  if (digitalRead(microSwitchWinding) == LOW) {
    speed = 1000;

    contractionSteppers.moveTo(1000);
    expansionSteppers.moveTo(1000);
    rotationLeftStepper.moveTo(1000);
    rotationRightStepper.moveTo(1000);

    while (( expansionSteppers.isRunning()) && digitalRead(microSwitchWinding) == LOW) {
      contractionSteppers.run();
      contractionSteppers.setSpeed(speed);
      expansionSteppers.run();
      expansionSteppers.setSpeed(speed);

      rotationLeftStepper.run();
      rotationLeftStepper.setSpeed(speed);
      rotationRightStepper.run();
      rotationRightStepper.setSpeed(speed);
    }
  }

  if(digitalRead(resetSwitch)==LOW)
  {
    PerformReset();
  }
}