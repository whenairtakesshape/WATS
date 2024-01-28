# When Air Takes Shape Version 2.0
# 2021-09-26

# Imports
# Import Servo Library for RDS51150
# Raspberry Pi Pico W
from time import sleep
from machine import Pin, PWM, ADC


# Pin Definitions
SERVO_1_PIN = 2
SERVO_2_PIN = 3
SERVO_3_PIN = 4
POTENTIOMETER_1_PIN = 28
POTENTIOMETER_2_PIN = 27
POTENTIOMETER_3_PIN = 26



# Functions
def init():
    # Initialize Servos
    global servo_1 
    servo_1 = PWM(Pin(SERVO_1_PIN))
    global servo_2 
    servo_2 = PWM(Pin(SERVO_2_PIN))
    global servo_3
    servo_3 = PWM(Pin(SERVO_3_PIN))
    # Initialize Potentiometers
    global potentiometer_1
    potentiometer_1 = ADC(Pin(POTENTIOMETER_1_PIN))
    global potentiometer_2
    potentiometer_2 = ADC(Pin(POTENTIOMETER_2_PIN))
    global potentiometer_3
    potentiometer_3 = ADC(Pin(POTENTIOMETER_3_PIN))
    # Initialize Servo Values
    global servo_1_value
    servo_1_value = 0
    global servo_2_value
    servo_2_value = 0
    global servo_3_value
    servo_3_value = 0
    # Initialize Potentiometer Values
    global potentiometer_1_value
    potentiometer_1_value = 0
    global potentiometer_2_value
    potentiometer_2_value = 0
    global potentiometer_3_value
    potentiometer_3_value = 0


# Main 
def main():
    #call init function
    init()
    #while loop
    while True:
        #read potentiometer values
        potentiometer_1_value = potentiometer_1.read_u16()
        potentiometer_2_value = potentiometer_2.read_u16()
        potentiometer_3_value = potentiometer_3.read_u16()
        #map potentiometer values to servo values
        servo_1_value = map(potentiometer_1_value, [0, 65535], [0, 65535])
        servo_2_value = map(potentiometer_2_value, [0, 65535], [0, 65535])
        servo_3_value = map(potentiometer_3_value, [0, 65535], [0, 65535])
        #print servo values
        print(potentiometer_1_value)
        #write servo values
        servo_1.duty_u16(servo_1_value)
        servo_2.duty_u16(servo_2_value)
        servo_3.duty_u16(servo_3_value)
        #sleep
        sleep(0.1)
        
main()
