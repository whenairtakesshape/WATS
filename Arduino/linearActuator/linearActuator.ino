#include <ZaberBinary.h>

ZaberShield shield(ZABERSHIELD_ADDRESS_AA);
ZaberBinary zb(shield);

// Input pins from Pico
#define pin0 4
#define pin1 5
#define pin2 6

int lastSignal = -1;

void setup() {
  // put your setup code here, to run once:
  shield.begin(9600);
  Serial.begin(9600);
  
  pinMode(pin0, INPUT_PULLUP);
  pinMode(pin1, INPUT_PULLUP);
  pinMode(pin2, INPUT_PULLUP);
}

void loop() {
  Serial.print(readPins());
  Serial.print('\n');
  int incomingSignal = readPins();
  if (incomingSignal == 0) {
    if (lastSignal != 0) { // Want to avoid homing when already homed (jerky)
      lastSignal = 0;
      returnHome();
    }
  } else {
    lastSignal = incomingSignal;
  }
  
  if (incomingSignal == 1) {
    motion1();
  } else if (incomingSignal == 2) {
    motion2();
  } else if (incomingSignal == 3) {
    motion3();
  } else if (incomingSignal == 4) {
    motion4();
  } else if (incomingSignal == 5) {
    motion5();
  } else if (incomingSignal == 6) {
    motion6();
  }
  delay(200);
}

int readPins() {
  return digitalRead(pin0) * pow(2, 0) +  digitalRead(pin1) * pow(2, 1) + digitalRead(pin2) * pow(2, 2); // Calculates binary value of pins
}

void returnHome() {
  zb.send(0, ZaberBinary::Command::HOME, 0);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);
}

void motion1() {
  zb.send(0, 42, 12000);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);
  zb.send(0, ZaberBinary::Command::MOVE_ABS, 100000);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);
  zb.send(0, ZaberBinary::Command::MOVE_ABS, 400000);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);
}

void motion2() {

}

void motion3() {

}

void motion4() {

}

void motion5() {

}

void motion6() {
  zb.send(0, 42, 20000);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);
  zb.send(0, ZaberBinary::Command::MOVE_ABS, 100000);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);
  zb.send(0, ZaberBinary::Command::MOVE_ABS, 200000);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);
  zb.send(0, ZaberBinary::Command::MOVE_ABS, 170000);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);
  zb.send(0, ZaberBinary::Command::MOVE_ABS, 300000);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);
  zb.send(0, ZaberBinary::Command::MOVE_ABS, 270000);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);

}