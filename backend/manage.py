#!/usr/bin/env python

import os
import sys
import environ
from pathlib import Path

def main():

    current_path = Path(__file__).parent.resolve()
    env = environ.Env()
    env.read_env(str(current_path / ".env.local"))

    """
    Ideally best to keep default to False for production reasons 
    but to ease installation it is keept to true in case you forget to configure env file
    """
    # DEBUG = env.bool('DEBUG', False)
    DEBUG = env.bool('DEBUG', True)

    if DEBUG:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admin.settings.local')
    else:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admin.settings.production')

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
