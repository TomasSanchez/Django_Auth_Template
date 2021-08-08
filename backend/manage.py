#!/usr/bin/env python

import os
import sys
import environ
from pathlib import Path

def main():

    current_path = Path(__file__).parent.resolve()
    env = environ.Env()
    env.read_env(str(current_path / ".env.local"))
    DEBUG = env.bool('DEBUG', False)

    if DEBUG:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admin.settings.settings')
    else:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admin.settings.production')

    
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admin.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
