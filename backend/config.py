from pathlib import Path
from datetime import timedelta

# ==========================================
# PROJECT
# ==========================================

BASE_DIR = Path(__file__).resolve().parent

APP_NAME = "Birthday Vault"
API_VERSION = "3.0"

# ==========================================
# DATABASE
# ==========================================

DATABASE_FILE = BASE_DIR / "birthday.db"

import os

# ==========================================
# FLASK
# ==========================================

HOST = "0.0.0.0"
PORT = int(os.environ.get("PORT", 5000))
DEBUG = False

# ==========================================
# JWT
# ==========================================

import os

JWT_SECRET_KEY = os.environ.get(
    "JWT_SECRET_KEY",
    "birthday_vault_dev_secret"
)

JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)

# ==========================================
# DATE
# ==========================================

DATE_FORMAT = "%Y-%m-%d"