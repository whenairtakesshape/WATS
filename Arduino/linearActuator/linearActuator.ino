#include <ZaberBinary.h>

ZaberShield shield(ZABERSHIELD_ADDRESS_AA);
ZaberBinary zb(shield);

// Input pins from Pico
int pin0 = ;
int pin1 = ;
int pin2 = ;

void setup() {
  // put your setup code here, to run once:
  shield.begin(9600);
  pinMode(pin0, INPUT);
  pinMode(pin1, INPUT);
  pinMode(pin2, INPUT);
}

void loop() {
  if (readPins() == 0) {
    returnHome();
    delay(200);
  } else if (readPins() == 1)) {
    motion1();
  } else if (readPins() == 2)) {
    motion2();
  } else if (readPins() == 3)) {
    motion3();
  } else if (readPins() == 4)) {
    motion4();
  }
}

int readPins() {
  return digitalRead(pin0) * pow(2, 0) +  digitalRead(pin1) * pow(2, 0) + digitalRead(pin2) * pow(2, 2);
}

void returnHome() {
  zb.send(0, ZaberBinary::Command::HOME, 0);
  zb.pollUntilIdle(1);
  zb.pollUntilIdle(2);
}

void motion1() {

}

void motion2() {

}

void motion3() {

}

void motion4() {

}