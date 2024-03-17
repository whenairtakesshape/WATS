# When Air Takes Shape Version 2.0
# 2021-09-26

# Imports
from time import sleep
from machine import Pin, PWM, ADC
import _thread

#Servo(2) Base start 48 (vertical)
Base_offset = 48

#Servo (1) Elbow start 80
Elbow_offset = 80

# Pin Definitions (based on GP numbers)
SERVO_1_ELBOW_PIN = 2
SERVO_2_BASE_PIN = 3
STEPPER_DIR_PIN = 4
STEPPER_PUL_PIN = 5
POTENTIOMETER_1_PIN = 28
POTENTIOMETER_2_PIN = 27
POTENTIOMETER_3_PIN = 26

SMOOTH_MOVEMENT = (40, 60, 20, 70)
SMOOTH_MOVEMENT_FLIPPED = (60, 40, 20, 70)


class ServoMotor:
    def __init__(self, servo_pin_num, potentiometer_pin_num, frequency=50):
        self.servo = PWM(Pin(servo_pin_num), freq=frequency)
        self.potentiometer = ADC(Pin(potentiometer_pin_num))
        self.servo_val = 0
        self.potentiometer_val = 0
        
    def set_potentiometer_servo_values(self):
        self.potentiometer_val = self.potentiometer.read_u16()
        self.servo_val = int((self.potentiometer_val / 65535) * 180)
        return self.set_servo_position(self.servo_val)
    
    def set_servo_position(self, angle):
        # Map the angle (0 to 180 degrees) to the pulse width (500 to 2500 microseconds)
        if angle < 0:
            angle = 0
        elif angle > 180:
            angle = 180
        print(f"Current angle {angle}")
            
        servo_cycle = int((angle/180) * 10000)
        self.servo.duty_u16(servo_cycle)
        
        return angle

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
        self.degree_per_pulse = 360 * 1 / 400
        
    def set_potentiometer_stepper_values(self):
        self.potentiometer_val = self.potentiometer.read_u16()
        self.set_desired_position(int((self.potentiometer_val / 65535) * 180))

    def set_desired_position(self, angle, time = 3):
        if angle < 0:
            angle = 0
        elif angle > 180:
            angle = 180
        self.desired_angle = angle
        self.run_stepper(time = time)

    def run_stepper(self, time = 3):
        # Rotate the stepper motor until the desired angle is reached
        time_step = time / abs(self.desired_angle - self.stepper_angle) * self.degree_per_pulse
        print(f"TIME STEP {time_step}")

        while self.desired_angle > self.stepper_angle:
            self.rotate_stepper("cw")
            sleep(time_step)
            self.stepper_angle += self.degree_per_pulse
        while self.desired_angle < self.stepper_angle:
            self.rotate_stepper("ccw")
            sleep(time_step)
            self.stepper_angle -= self.degree_per_pulse

    def rotate_stepper(self, direction):
        print(direction)
        # Set the direction of the stepper motor
        if direction == "cw":
            print("GOING CW")
            self.stepper_dir.high()
        elif direction == "ccw":
            print("GOING CCW")
            self.stepper_dir.low()
        
        sleep(10e-6)

        # Rotate the stepper motor
        self.stepper_pul.high()
        sleep(0.01)
        self.stepper_pul.low()
        print(self.stepper_angle)
        sleep(0.01)

def move_servos(start_base_angle: int, end_base_angle: int, start_elbow_angle: int, end_elbow_angle: int, 
                elbow_servo = ServoMotor(SERVO_1_ELBOW_PIN, POTENTIOMETER_1_PIN), 
                base_servo = ServoMotor(SERVO_2_BASE_PIN, POTENTIOMETER_2_PIN),
                time = 10):
    """
      time: the amount of time in seconds to produce the full contraction and extension motion
    """
    maxSteps = max(abs(end_base_angle - start_base_angle), abs(end_elbow_angle - start_elbow_angle))
    if maxSteps == 0:

        base_servo.set_servo_position(start_base_angle)
        elbow_servo.set_servo_position(start_elbow_angle)

        return
    else:
        timestep = time / maxSteps / 2
    print(maxSteps)
    print(timestep)

    curr_base = start_base_angle
    curr_elbow = start_elbow_angle

    max_base_move = abs(end_base_angle - start_base_angle)
    max_elbow_move = abs(end_elbow_angle - start_elbow_angle)

    base_servo.set_servo_position(curr_base)
    elbow_servo.set_servo_position(curr_elbow)

    while(True):
        currtime = 0

        # Calculated sign of movement
        move_base = (end_base_angle - start_base_angle) / max_base_move
        move_elbow = (end_elbow_angle - start_elbow_angle) / max_elbow_move

        # Move until both angles are at end angles
        while(abs(curr_base - start_base_angle) < max_base_move or abs(curr_elbow - start_elbow_angle) < max_elbow_move):
            # Check if time is high enough to move enough step AND if end is not reached

            if (currtime / (time / 2)) >= (abs(curr_base - start_base_angle) + 1) / max_base_move and abs(curr_base - start_base_angle) < max_base_move:
                curr_base += move_base
                base_servo.set_servo_position(curr_base)
    
            if (currtime / (time / 2)) >= (abs(curr_elbow - start_elbow_angle) + 1) / max_elbow_move and abs(curr_elbow - start_elbow_angle) < max_elbow_move:
                curr_elbow += move_elbow
                elbow_servo.set_servo_position(curr_elbow)
            
            print(f"Current base: {curr_base}")
            print(f"Current elbow: {curr_elbow}")

            currtime = currtime + timestep
            sleep(timestep)
        
        move_base = (start_base_angle - end_base_angle) / max_base_move
        move_elbow = (start_elbow_angle - end_elbow_angle) / max_elbow_move
        
        while(abs(curr_base - end_base_angle) < max_base_move or abs(curr_elbow - end_elbow_angle) < max_elbow_move):
            # Check if time is high enough to move enough step AND if end is not reached
            if ((currtime - time / 2) / (time / 2)) >= (abs(curr_base - end_base_angle) + 1) / max_base_move and abs(curr_base - end_base_angle) < max_base_move:
                curr_base += move_base
                base_servo.set_servo_position(curr_base)
    
            if ((currtime - time / 2) / (time / 2)) >= (abs(curr_elbow - end_elbow_angle) + 1) / max_elbow_move and abs(curr_elbow - end_elbow_angle) < max_elbow_move:
                curr_elbow += move_elbow
                elbow_servo.set_servo_position(curr_elbow)
            
            print(f"Current base: {curr_base}")
            print(f"Current elbow: {curr_elbow}")

            currtime = currtime + timestep
            sleep(timestep)

def move_stepper(rotation_angle, stepper = StepperMotor(STEPPER_DIR_PIN, STEPPER_PUL_PIN, POTENTIOMETER_3_PIN)):
    # stepper.set_potentiometer_stepper_values()
    # stepper.rotate_stepper("ccw")

    while(True):
        print(rotation_angle)
        stepper.set_desired_position(rotation_angle, time = 1)
        stepper.set_desired_position(0, time = 1)


def core1_thread():
    servo_1 = ServoMotor(SERVO_1_ELBOW_PIN, POTENTIOMETER_1_PIN)
    servo_2 = ServoMotor(SERVO_2_BASE_PIN, POTENTIOMETER_2_PIN)

    servo_2.set_servo_position(35)
    servo_1.set_servo_position(15)

    # move_servos(*SMOOTH_MOVEMENT_FLIPPED, time = 10, elbow_servo = servo_1, base_servo = servo_2)

def core0_thread():
    stepper = StepperMotor(STEPPER_DIR_PIN, STEPPER_PUL_PIN, POTENTIOMETER_3_PIN)
    move_stepper(10, stepper = stepper)

# Main 
def main():
    servo_1 = ServoMotor(SERVO_1_ELBOW_PIN, POTENTIOMETER_1_PIN)
    servo_2 = ServoMotor(SERVO_2_BASE_PIN, POTENTIOMETER_2_PIN)
    #call init function
    # threadythread = _thread.start_new_thread(core1_thread, ())
    core0_thread()
        
if __name__ == "__main__":
    main()