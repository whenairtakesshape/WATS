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

class ServoMotor:
    def __init__(self, servo_pin_num, potentiometer_pin_num, frequency=50):
        self.servo = PWM(Pin(servo_pin_num), freq=frequency)
        self.potentiometer = ADC(Pin(potentiometer_pin_num))
        self.servo_val = 0
        self.potentiometer_val = 0
        
    def set_potentiometer_servo_values(self):
        self.potentiometer_val = self.potentiometer.read_u16()
        self.servo_val = int((self.potentiometer_val / 65535) * 180)
        self.set_servo_position(self.servo_val)
    
    def set_servo_position(self, angle):
        # Map the angle (0 to 180 degrees) to the pulse width (500 to 2500 microseconds)
        if angle < 0:
            angle = 0
        elif angle > 180:
            angle = 180
        servo_cycle = int((angle/180) * 10000)
        self.servo.duty_u16(servo_cycle)

# Main 
def main():
    #call init function
    servo_1 = ServoMotor(SERVO_1_PIN, POTENTIOMETER_1_PIN)
    servo_2 = ServoMotor(SERVO_2_PIN, POTENTIOMETER_2_PIN)
    #while loop
    while True:
        servo_1.set_potentiometer_servo_values()
        servo_2.set_potentiometer_servo_values()
#         for angle in range(20, 120, 1):
#             servo_1.set_servo_position(angle)
#             print(angle)
#             sleep(0.15)
#         for angle in range(120, 20, -1):
#             servo_1.set_servo_position(angle)
#             print(angle)
#             sleep(0.15)
        
if __name__ == "__main__":
    main()

