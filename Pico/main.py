# When Air Takes Shape Version 2.0
# 2021-09-26

# Imports
from time import sleep
from machine import Pin, PWM, ADC
import machine
import _thread
import bluetooth
from ble_peripheral import BLESimplePeripheral
from stepper import Stepper

# Pin Definitions (based on GP numbers)
SERVO_1_ELBOW_PIN = 2
SERVO_2_BASE_PIN = 3
STEPPER_DIR_PIN = 4
STEPPER_PUL_PIN = 5
POTENTIOMETER_1_PIN = 28
POTENTIOMETER_2_PIN = 27
POTENTIOMETER_3_PIN = 26

"""
Base servo limits: (60, 120)
Elbow servo limits: (45, 160)
The above servo limits are the safe region. Servos do 10 degrees/sec pretty nicely :)
Home location = base = 100, elbow = 180

Stepper speed: Max speed is 35 rpm at 8 Nm torque -> try to set speed below 0.5 rps if unsure
               More testing needed to determine torque with actual model.
"""
LOWEST_BASE = 120
LOWEST_ELBOW = 160
HIGHEST_BASE = 60
HIGHEST_ELBOW = 45
curr_base = 80
curr_elbow = 71.5


# Angle order is: start_base_angle,end_base_angle, start_elbow_angle, end_elbow_angle
TEST_MOTION = [(80, 80, 55, 105, 5, 1), 
                (80, 80, 105, 55, 5, 1)]
TEST_MOTION_2 = [(60, 80, 55, 90, 2, 1), 
                (80, 60, 90, 55, 2, 1)]

MOTION_LIST = [TEST_MOTION, TEST_MOTION, TEST_MOTION, TEST_MOTION_2, TEST_MOTION_2]

FLOATING_POINT_ERR = -1e-3

#Bluetooth
USE_BLUETOOTH = True # Set to True to use Bluetooth
ble = bluetooth.BLE()
bt_peripheral = BLESimplePeripheral(ble)

newCommand = False
threadRunning = False

#Blutooth Callback to receive Data
def on_rx(data):
    global newCommand
    global threadRunning
    newCommand = True
    print("Bluetooth Data Received: ", data)

    # Wait for last command to end before starting new command
    while (threadRunning):
        print("Waiting")
        sleep(0.5)

    newCommand = False
    commandThread = _thread.start_new_thread(perform_command, (data,))

def perform_command(command):
    global threadRunning
    threadRunning = True
    print("Command Received: ", command)
    # Perform the command
    if command == b'h':
        PerformHome()
    elif command == b's':
        PerformStop()
    elif command == b'r':
        PerformReset()
    elif command == b'c':
        PerformContraction()
    elif command == b'e':
        PerformExpansion()
    elif command == b'q':
        PerformClockwise()
    elif command == b'w':
        PerformCounterClockwise()
    elif command == b'n':
        PerformStepExpansion()
    elif command == b'm':
        PerformStepContraction()
    elif command == b'0':
        PerformMotion(0)
    elif command == b'1':
        PerformMotion(1)
    elif command == b'2':
        PerformMotion(2)
    elif command == b'3':
        PerformMotion(3)
    elif command == b'4':
        PerformMotion(4)
    elif command == b'5':
        PerformMotion(5)
    else:
        print("Invalid Command")
    threadRunning = False

def PerformHome():
    print("Performing Home")
    global curr_base
    global curr_elbow
    move_servos_set_timestep(curr_base, LOWEST_BASE, curr_elbow, LOWEST_ELBOW)
    curr_elbow = LOWEST_ELBOW
    curr_base = LOWEST_BASE

def GoToTallest():
    move_servos_set_timestep(curr_base, HIGHEST_BASE, curr_elbow, HIGHEST_ELBOW, 5, 0.1)

def PerformStop():
    PerformHome()
    print("Performing Stop")

def PerformReset():
    print("Performing Reset")

def PerformMotion(motion):
    print("Performing Motion: ", motion)

    PerformMotionServos(motion)

def PerformMotionServos(motion):
    global newCommand
    global threadRunning
    ServosToStartPosition(motion)

    while(True):
        for step in MOTION_LIST[motion]:
            move_servos_set_timestep(*step)
            print(f"New command: {newCommand}")
            if (newCommand):
                print("ALERT: received new command")
                return

def ServosToStartPosition(motion: int):
    start_base = MOTION_LIST[motion][0][0]
    start_elbow = MOTION_LIST[motion][0][2]

    move_servos_set_timestep(curr_base, start_base, curr_elbow, start_elbow, 3, 0.05)

def PerformMotionSteppers(motion):
    print("Stepper motion feature coming soon")
        
class ServoMotor:
    # Time in seconds of minimum and maximum accepted pulse lengths
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
        # print(f"Current angle {angle}")
            
        servo_cycle = int(65535 * (angle * (self.max_pulse - self.min_pulse) * self.freq / 270 + self.freq * self.min_pulse))

        if servo_cycle < self.min_pulse / (1 / self.freq) * 65535:
          servo_cycle = int(self.min_pulse / (1 / self.freq) * 65535) + 1
        if servo_cycle > self.max_pulse / (1 / self.freq) * 65535:
          servo_cycle =  int(self.max_pulse / (1 / self.freq) * 65535) - 1
        self.servo.duty_u16(servo_cycle)
        
        return angle

def move_servos(start_base_angle: float, end_base_angle: float, start_elbow_angle: float, end_elbow_angle: float, 
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
                             time = time, 
                             timestep = 1, 
                             base_servo = base_servo, 
                             elbow_servo = elbow_servo)

def move_servos_set_timestep(start_base_angle: int, 
                             end_base_angle: int, 
                             start_elbow_angle: int, 
                             end_elbow_angle: int, 
                             time = 10,
                             timestep = 0.1,
                             base_servo = ServoMotor(SERVO_2_BASE_PIN, POTENTIOMETER_2_PIN), 
                             elbow_servo = ServoMotor(SERVO_1_ELBOW_PIN, POTENTIOMETER_1_PIN)):
    """
      start_base_angle, end_base_angle, start_elbow_angle, end_elbow_angle : 0 <= angle <= 270
      time: the amount of time in seconds to produce the full contraction and extension motion
      timestep: Time between two steps
    """
    global curr_base
    global curr_elbow
    curr_base = start_base_angle
    curr_elbow = start_elbow_angle

    
    if time == 0 or timestep == 0 or timestep > time:
        print("Improper times passed to servo moving function")
        base_servo.set_servo_position(start_base_angle)
        elbow_servo.set_servo_position(start_elbow_angle)
        return
    elif start_base_angle == end_base_angle and start_elbow_angle == end_elbow_angle:
        base_servo.set_servo_position(start_base_angle)
        elbow_servo.set_servo_position(start_elbow_angle)
        return

    max_base_move = abs(end_base_angle - start_base_angle)
    max_elbow_move = abs(end_elbow_angle - start_elbow_angle)

    base_step_size = max_base_move / (time / timestep)
    elbow_step_size = max_elbow_move / (time / timestep)

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


def servos_thread():
    servo_1 = ServoMotor(SERVO_1_ELBOW_PIN, POTENTIOMETER_1_PIN)
    servo_2 = ServoMotor(SERVO_2_BASE_PIN, POTENTIOMETER_2_PIN)

    while(True):
        for motion in TEST_MOTION:
            move_servos_set_timestep(*motion, base_servo = servo_2, elbow_servo = servo_1)

def smooth_stepper_thread():
    stepper = Stepper(STEPPER_PUL_PIN, STEPPER_DIR_PIN, steps_per_rev=800)
    angle = 30
    rotationsPerSecond = 0.1
    stepper.speed_rps(rotationsPerSecond)
    while(True):
        stepper.target_deg(angle)
        sleep(angle / 360 / rotationsPerSecond * 1.2)
        stepper.target_deg(0)
        sleep(angle / 360 / rotationsPerSecond * 1.2)

def jerky_stepper_thread():
    stepper = Stepper(STEPPER_PUL_PIN, STEPPER_DIR_PIN, steps_per_rev=800)
    angle = 30
    rps = 0.5
    stepper.speed_rps(rps)
    while(True):
        stepper.target_deg(angle)
        sleep(angle / 360 / rps * 1.2)
        stepper.target_deg(0)
        sleep(angle / 360 / rps * 1.2)

# Main 
def main():
    # smooth_stepper_thread()
    elbow_servo = ServoMotor(SERVO_1_ELBOW_PIN, POTENTIOMETER_1_PIN)
    base_servo = ServoMotor(SERVO_2_BASE_PIN, POTENTIOMETER_2_PIN)

    # for i in range(5):
    #     print(f"Performing motion {i}")
    #     global threadRunning
    #     threadRunning = True
    #     commandThread = _thread.start_new_thread(PerformMotion, (i,))
    #     sleep(3)
    #     global newCommand
    #     newCommand = True

    #     print(f"Thread running {threadRunning}")
    #     while(threadRunning):
    #         print(f"Thread running {threadRunning}")
    #         sleep(0.5)
    #     newCommand = False

    if USE_BLUETOOTH:  # If we're using Bluetooth, run this main loop instead
        while True:
            if (bt_peripheral.is_connected()):
                bt_peripheral.on_write(on_rx)
                print("listening")

if __name__ == "__main__":
    #call init function
    main()