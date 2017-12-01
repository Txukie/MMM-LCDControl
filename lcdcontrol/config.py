#!/usr/bin/python
# coding: utf8
"""MMM-LCDControl - MagicMirror Module
Face Recognition script config
The MIT License (MIT)

Copyright (c) 2017 Alberto de Tena Rojas (MIT License)
"""

import inspect
import os
import json
import sys
import platform

def to_node(type, message):
    print(json.dumps({type: message}))
    sys.stdout.flush()


_platform = platform.uname()[4]
path_to_file = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))

CONFIG = json.loads(sys.argv[1]);

def get(key):
    return CONFIG[key]
