# When Air Takes Shape Version 2.0
# 2021-09-26

# Imports
from time import sleep
from machine import Pin, PWM, ADC


# Pin Definitions
SERVO_1_PIN = 2
SERVO_2_PIN = 3
STEPPER_DIR_PIN = 4
STEPPER_PUL_PIN = 5
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

class StepperMotor:
    def __init__(self, stepper_dir_pin_num, stepper_pul_pin_num, potentiometer_pin_num):
        self.stepper_dir = Pin(stepper_dir_pin_num, mode=Pin.OUT)
        self.stepper_pul = Pin(stepper_pul_pin_num, mode=Pin.OUT)
        self.potentiometer = ADC(Pin(potentiometer_pin_num))
        self.stepper_angle = 0
        self.desired_angle = 0
        self.potentiometer_val = 0
        self.stepper_dir.low()
        self.stepper_pul.low()
        
    def set_potentiometer_stepper_values(self):
        self.potentiometer_val = self.potentiometer.read_u16()
        self.set_desired_position(int((self.potentiometer_val / 65535) * 180))

    def set_desired_position(self, angle):
        if angle < 0:
            angle = 0
        elif angle > 180:
            angle = 180
        self.desired_angle = angle
        self.run_stepper()

    def run_stepper(self):
        # Rotate the stepper motor until the desired angle is reached
        if self.desired_angle > self.stepper_angle:
            self.rotate_stepper("cw")
            sleep(0.01)
            self.stepper_angle += 1   
        elif self.desired_angle < self.stepper_angle:
            self.rotate_stepper("ccw")
            sleep(0.01)
            self.stepper_angle -= 1

    def rotate_stepper(self, direction):
        # Set the direction of the stepper motor
        if direction == "cw":
            self.stepper_dir.high()
        elif direction == "ccw":
            self.stepper_dir.low()

        # Rotate the stepper motor
        self.stepper_pul.high()
        sleep(0.01)
        self.stepper_pul.low()
        print(self.stepper_angle)
        sleep(0.01)

# Main 
def main():
    #call init function
    servo_1 = ServoMotor(SERVO_1_PIN, POTENTIOMETER_1_PIN)
    servo_2 = ServoMotor(SERVO_2_PIN, POTENTIOMETER_2_PIN)
    stepper = StepperMotor(STEPPER_DIR_PIN, STEPPER_PUL_PIN, POTENTIOMETER_3_PIN)
    
    #while loop
    while True:
        servo_1.set_potentiometer_servo_values()
        servo_2.set_potentiometer_servo_values()
        stepper.set_potentiometer_stepper_values()
        #stepper.rotate_stepper("ccw")
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


