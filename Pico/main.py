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

FLOATING_POINT_ERR = -1e-3


class ServoMotor:
    min_pulse = 0.0005
    max_pulse = 0.0025

    def __init__(self, servo_pin_num, potentiometer_pin_num, frequency=50):
        self.servo = PWM(Pin(servo_pin_num), freq=frequency)
        self.freq = frequency
        self.potentiometer = ADC(Pin(potentiometer_pin_num))
        self.servo_val = 0
        self.potentiometer_val = 0
        
    def set_potentiometer_servo_values(self):
        self.potentiometer_val = self.potentiometer.read_u16()
        self.servo_val = int((self.potentiometer_val / 65535) * 180)
        return self.set_servo_position(self.servo_val)
    
    def set_servo_position(self, angle):
        # Map the angle (0 to 270 degrees) to the pulse width (500 to 2500 microseconds)
        if angle < 0:
            angle = 0
        elif angle > 270:
            angle = 270
        print(f"Current angle {angle}")
            
        servo_cycle = int(65535 * (angle * (self.max_pulse - self.min_pulse) * self.freq / 270 + self.freq * self.min_pulse))

        if servo_cycle < self.min_pulse / (1 /  self.freq) * 65535:
          servo_cycle = int(self.min_pulse / (1 /  self.freq) * 65535) + 1
        if servo_cycle > self.max_pulse / (1 /  self.freq) * 65535:
          servo_cycle =  int(self.max_pulse / (1 /  self.freq) * 65535) - 1
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

    def set_desired_position(self, angle, time:float = 3):
        if angle < 0:
            angle = 0
        elif angle > 180:
            angle = 180
        self.desired_angle = angle
        self.run_stepper(time = time)

    def run_stepper(self, time:float = 3):
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
                base_servo = ServoMotor(SERVO_2_BASE_PIN, POTENTIOMETER_2_PIN),
                elbow_servo = ServoMotor(SERVO_1_ELBOW_PIN, POTENTIOMETER_1_PIN), 
                time = 10):
    """
      start_base_angle, end_base_angle, start_elbow_angle, end_elbow_angle : 0 <= angle <= 270
      time: the amount of time in seconds to produce the full contraction and extension motion
    """
    move_servos_set_timestep(start_base_angle,
                             end_base_angle, 
                             start_elbow_angle, 
                             end_elbow_angle, 
                             base_servo = base_servo, 
                             elbow_servo = elbow_servo, 
                             time = time, 
                             timestep = 1)

def move_servos_set_timestep(start_base_angle: int, 
                             end_base_angle: int, 
                             start_elbow_angle: int, 
                             end_elbow_angle: int,
                             base_servo = ServoMotor(SERVO_2_BASE_PIN, POTENTIOMETER_2_PIN), 
                             elbow_servo = ServoMotor(SERVO_1_ELBOW_PIN, POTENTIOMETER_1_PIN), 
                             time = 10,
                             timestep = 0.1):
    """
      start_base_angle, end_base_angle, start_elbow_angle, end_elbow_angle : 0 <= angle <= 270
      time: the amount of time in seconds to produce the full contraction and extension motion
      timestep: Time between two steps
    """
    if time == 0 or timestep == 0:
        base_servo.set_servo_position(start_base_angle)
        elbow_servo.set_servo_position(start_elbow_angle)
        return
    elif start_base_angle == end_base_angle and start_elbow_angle == end_elbow_angle:
        base_servo.set_servo_position(start_base_angle)
        elbow_servo.set_servo_position(start_elbow_angle)
        return
    elif timestep > time / 2:
        print("Timestep parameter too large")
        return

    curr_base = start_base_angle
    curr_elbow = start_elbow_angle

    max_base_move = abs(end_base_angle - start_base_angle)
    max_elbow_move = abs(end_elbow_angle - start_elbow_angle)

    base_step_size = max_base_move / (time / 2 / timestep)
    elbow_step_size = max_elbow_move / (time / 2 / timestep)

    while(True):
        # Reset angles to prevent build-up of error
        curr_base = start_base_angle
        curr_elbow = start_elbow_angle
        base_servo.set_servo_position(curr_base)
        elbow_servo.set_servo_position(curr_elbow)
        currtime = 0

        # Calculate sign of movement
        move_base = (end_base_angle - start_base_angle) / max_base_move * base_step_size if max_base_move != 0 else 0
        move_elbow = (end_elbow_angle - start_elbow_angle) / max_elbow_move * elbow_step_size if max_elbow_move != 0 else 0

        # Move until both angles are at end angles
        while(abs(curr_base - start_base_angle) - max_base_move < FLOATING_POINT_ERR or 
              abs(curr_elbow - start_elbow_angle) - max_elbow_move < FLOATING_POINT_ERR):
            # Check if reached end as security
            if abs(curr_base - start_base_angle) - max_base_move < FLOATING_POINT_ERR:
                curr_base += move_base
                base_servo.set_servo_position(curr_base)
    
            if abs(curr_elbow - start_elbow_angle) - max_elbow_move < FLOATING_POINT_ERR:
                curr_elbow += move_elbow
                elbow_servo.set_servo_position(curr_elbow)
            
            print(f"Current base: {curr_base}")
            print(f"Current elbow: {curr_elbow}")

            currtime = currtime + timestep
            sleep(timestep)

        curr_base = end_base_angle
        curr_elbow = end_elbow_angle
        base_servo.set_servo_position(curr_base)
        elbow_servo.set_servo_position(curr_elbow)
        
        move_base = (start_base_angle - end_base_angle) / max_base_move * base_step_size if max_base_move != 0 else 0
        move_elbow = (start_elbow_angle - end_elbow_angle) / max_elbow_move * elbow_step_size if max_elbow_move != 0 else 0
        
        while (abs(curr_base - end_base_angle) - max_base_move < FLOATING_POINT_ERR or 
               abs(curr_elbow - end_elbow_angle) - max_elbow_move < FLOATING_POINT_ERR):
            # Check if reached end as security
            if abs(curr_base - end_base_angle) - max_base_move < FLOATING_POINT_ERR:
                curr_base += move_base
                base_servo.set_servo_position(curr_base)
    
            if abs(curr_elbow - end_elbow_angle) - max_elbow_move < FLOATING_POINT_ERR:
                curr_elbow += move_elbow
                elbow_servo.set_servo_position(curr_elbow)
            
            print(f"Current base: {curr_base}")
            print(f"Current elbow: {curr_elbow}")

            currtime = currtime + timestep
            sleep(timestep)

def move_stepper(rotation_angle, stepper = StepperMotor(STEPPER_DIR_PIN, STEPPER_PUL_PIN, POTENTIOMETER_3_PIN), time = 5):
    # stepper.set_potentiometer_stepper_values()
    # stepper.rotate_stepper("ccw")

    while(True):
        print(rotation_angle)
        stepper.set_desired_position(rotation_angle, time = time / 2)
        stepper.set_desired_position(0, time = time / 2)


def core1_thread():
    servo_1 = ServoMotor(SERVO_1_ELBOW_PIN, POTENTIOMETER_1_PIN)
    servo_2 = ServoMotor(SERVO_2_BASE_PIN, POTENTIOMETER_2_PIN)

    move_servos_set_timestep(5, 5, 30, 110, base_servo = servo_2, elbow_servo = servo_1, time = 5, timestep = 0.05)

def core0_thread():
    stepper = StepperMotor(STEPPER_DIR_PIN, STEPPER_PUL_PIN, POTENTIOMETER_3_PIN)
    move_stepper(180, stepper = stepper, time = 2)

# Main 
def main():
    servo_1 = ServoMotor(SERVO_1_ELBOW_PIN, POTENTIOMETER_1_PIN)
    servo_2 = ServoMotor(SERVO_2_BASE_PIN, POTENTIOMETER_2_PIN)

    #call init function
    try:
        threadythread = _thread.start_new_thread(core1_thread, ())
        core0_thread()
    except (KeyboardInterrupt, SystemExit):
        print("Proper ending of program has not been implemented yet (sorry) :)")
    finally:
        servo_1.set_servo_position(0)
        servo_2.set_servo_position(0)
        print("good riddance")

if __name__ == "__main__":
    #call init function
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        print("Proper ending of program has not been implemented yet (sorry) :))")
    finally:
        print("PLEASE good riddance")