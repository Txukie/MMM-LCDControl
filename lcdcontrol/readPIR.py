#!/usr/bin/python
# coding: utf8
"""MMM-LCDControl - MagicMirror Module
LCDControl Script
The MIT License (MIT)

Copyright (c) 2017 Alberto de Tena Rojas (MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
"""

import sys
from time import sleep
import RPi.GPIO as GPIO
import json
import config

def to_node(type, message):
    # convert to json and print (node helper will read from stdout)
    try:
        print(json.dumps({type: message}))
    except Exception:
        pass
    # stdout has to be flushed manually to prevent delays in the node helper communication
    sys.stdout.flush()


def main():
    
    GPIO.setmode(GPIO.BCM)

    GPIO.setup(config.get("GPIO_PIR"), GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

    global PIRStatus

    try:
        PIRStatus = GPIO.input(config.get("GPIO_PIR"))
        
        GPIO.cleanup()
        
    except Exception, e:
        to_node("status","Some unexpected error: " + str(e))

if __name__ == "__main__":
    main()
