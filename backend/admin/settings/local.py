from .base import * #noqa
from .base import env

DEBUG = True

SECRET_KEY = env.str('SECRET_KEY', default='django-insecure-)udk^l*hobneqn5-fm@k7@cukxhq7a%#_(0fsmpzjb%%)=@=$z')

ALLOWED_HOSTS = ["*"]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# For easy startup
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Uncomment to run on postgress db on development
"""
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env.str('POSTGRES_NAME',  'django1'),
        'USER': env.str('POSTGRES_USER',  'tomassolanosanchez'),
        'PASSWORD': env.str('POSTGRES_PASSWORD',  ''),
        'HOST': env.str('POSTGRES_HOST',  'localhost'),
    }
}
"""

CORS_ALLOWED_ORIGINS = [
    # React development server
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_HEADERS = ['content-disposition', 'accept-encoding',
                      'content-type', 'accept', 'origin', 'authorization', 'credentials', 'X-CSRFToken']

CORS_ALLOW_CREDENTIALS = True

CORS_EXPOSE_HEADERS = ["Content-Type", "X_CSRFToken"]


# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = 'email'
EMAIL_HOST_PASSWORD = env.str("EMAIL_HOST_PASSWORD")