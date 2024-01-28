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
    servo_1 = PWM(Pin(SERVO_1_PIN, Pin.OUT), freq=50)
    global servo_2 
    servo_2 = PWM(Pin(SERVO_2_PIN))
    global servo_3
    servo_3 = PWM(Pin(SERVO_3_PIN), freq=50)
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


def set_servo_position(angle):
    # Map the angle (0 to 180 degrees) to the pulse width (500 to 2500 microseconds)
    pulse_width = int((angle / 270.0) * (2500 - 500) + 500)
    
    # Set the duty cycle based on the pulse width
    servo_1.duty_u16(pulse_width * 65535 // 20000)  # Convert microseconds to duty cycle


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
        servo_1_value = int((potentiometer_1_value / 65535) * 10000)
        servo_2_value = int((potentiometer_2_value / 65535) * 180)
        servo_3_value = int((potentiometer_3_value / 65535) * 180)
        #print servo values
        print(servo_1_value)
        #write servo values
        servo_1.duty_u16(servo_1_value)
        servo_2.duty_u16(servo_2_value)
        #servo_3.duty_u16(servo_3_value)
        #set_servo_position(servo_1_value)
        #sleep
        sleep(0.1)
        
main()

