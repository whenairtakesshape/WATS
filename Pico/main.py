# When Air Takes Shape Version 2.0
# 2021-09-26

# Imports
from time import sleep
from machine import Pin, PWM, ADC
import machine
import _thread
import bluetooth
from ble_peripheral import BLESimplePeripheral

# Pin Definitions (based on GP numbers)
PIN0 = Pin(2, Pin.OUT)
PIN1 = Pin(3, Pin.OUT)
PIN2 = Pin(4, Pin.OUT)

PINS = [PIN0, PIN1, PIN2]

#Bluetooth
USE_BLUETOOTH = True # Set to True to use Bluetooth
ble = bluetooth.BLE()
bt_peripheral = BLESimplePeripheral(ble)

#Blutooth Callback to receive Data
def on_rx(data):
    print("Bluetooth Data Received: ", data)
    perform_command(data)

def perform_command(command):
    print("Command Received: ", command)
    # Perform the command
    if command == b'h':
        PerformHome()
    elif command == b's':
        PerformStop()
    elif command == b'r':
        PerformReset()
    elif command == b'0':
        PerformMotion(1)
    elif command == b'1':
        PerformMotion(2)
    elif command == b'2':
        PerformMotion(3)
    elif command == b'3':
        PerformMotion(4)
    elif command == b'4':
        PerformMotion(5)
    elif command == b'5':
        PerformMotion(6)
    else:
        print("Invalid Command")
    threadRunning = False

def PerformHome():
    PIN0.value(0)
    PIN1.value(0)
    PIN2.value(0)
    print("Performing Home")

def PerformStop():
    PerformHome()
    print("Performing Stop")

def PerformReset():
    PerformHome()
    print("Performing Reset")

def PerformMotion(motion):
    print("Performing Motion: ", motion)

    num = motion

    for i in range(len(PINS)):
        PINS[i].value(num % 2)
        num = num // 2
        
# Main 
def main():
    if USE_BLUETOOTH:  # If we're using Bluetooth, run this main loop instead
        while True:
            if (bt_peripheral.is_connected()):
                bt_peripheral.on_write(on_rx)
                print("listening")

if __name__ == "__main__":
    #call init function
    main()