import os
from .base import *  # noqa
from .base import env

env.read_env(str(BASE_DIR / ".env.production"))

DEBUG = False

SECRET_KEY = env.str("SECRET_KEY")

ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS")

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env.str('DB_NAME'),
        'USER': env.str('DB_USER'),
        'PASSWORD': env.str('DB_PASS'),
        'HOST': env.str('DB_HOST'),
        'PORT': env.int('DB_PORT', 5432)
    }
}

# httpS for prod
URL_PROTOCOL = env.str("URL_PROTOCOL", default="https://")
# For production it would share the domain
FRONTEND_URL = env.str("FRONTEND_URL", default="example.com")

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True