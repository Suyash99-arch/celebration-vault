import os
import sys
from datetime import datetime

# Ensure backend package modules import correctly regardless of CWD
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from config import DATE_FORMAT


def parse_date(date_value):
    """
    Accept:
    - datetime object
    - YYYY-MM-DD
    - DD-MM-YYYY
    """

    # If Excel already returned a datetime object
    if isinstance(date_value, datetime):
        return date_value

    date_string = str(date_value).strip()

    formats = [
        "%Y-%m-%d",
        "%d-%m-%Y",
        "%Y-%m-%d %H:%M:%S"
    ]

    for fmt in formats:
        try:
            return datetime.strptime(date_string, fmt)
        except ValueError:
            pass

    raise ValueError(f"Invalid date format: {date_string}")


def validate_date(date_string: str) -> bool:
    """
    Check if the date is in the correct format.
    """

    try:
        datetime.strptime(date_string, DATE_FORMAT)
        return True

    except ValueError:
        return False


def calculate_age(dob: str) -> str:

    dob = parse_date(dob)

    today = datetime.today()

    years = today.year - dob.year
    months = today.month - dob.month
    days = today.day - dob.day

    if days < 0:

        from calendar import monthrange

        previous_month = today.month - 1 or 12
        previous_year = today.year if today.month != 1 else today.year - 1

        days += monthrange(previous_year, previous_month)[1]
        months -= 1

    if months < 0:
        months += 12
        years -= 1

    parts = []

    if years:
        parts.append(f"{years} Year{'s' if years != 1 else ''}")

    if months:
        parts.append(f"{months} Month{'s' if months != 1 else ''}")

    if days:
        parts.append(f"{days} Day{'s' if days != 1 else ''}")

    if not parts:
        return "Today 🎉"

    return " ".join(parts)


def next_birthday(dob: str) -> str:

    dob = parse_date(dob)

    today = datetime.today()

    next_birthday = dob.replace(year=today.year)

    if next_birthday.date() < today.date():
        next_birthday = next_birthday.replace(year=today.year + 1)

    years = next_birthday.year - today.year
    months = next_birthday.month - today.month
    days = next_birthday.day - today.day

    if days < 0:

        from calendar import monthrange

        previous_month = next_birthday.month - 1 or 12
        previous_year = next_birthday.year if next_birthday.month != 1 else next_birthday.year - 1

        days += monthrange(previous_year, previous_month)[1]
        months -= 1

    if months < 0:
        months += 12
        years -= 1

    if years == 0 and months == 0 and days == 0:
        return "Today 🎉"

    parts = []

    if years:
        parts.append(f"{years} Year{'s' if years != 1 else ''}")

    if months:
        parts.append(f"{months} Month{'s' if months != 1 else ''}")

    if days:
        parts.append(f"{days} Day{'s' if days != 1 else ''}")

    return " ".join(parts)


def is_birthday_today(dob: str) -> bool:
    """
    Check whether today is the birthday.
    """

    dob = parse_date(dob)

    today = datetime.today()

    return (
        dob.day == today.day
        and dob.month == today.month
    )


def format_date(dob: str) -> str:
    """
    Convert 2004-05-21
    into
    21 May 2004
    """

    dob = parse_date(dob)

    return dob.strftime("%d %B %Y")


def weekday_of_birth(dob: str) -> str:
    """
    Returns Monday, Tuesday, etc.
    """

    dob = parse_date(dob)

    return dob.strftime("%A")
from datetime import datetime

def days_until_birthday(dob: str) -> int:

    dob = parse_date(dob)

    today = datetime.today()

    next_birthday = dob.replace(year=today.year)

    if next_birthday.date() < today.date():
        next_birthday = next_birthday.replace(year=today.year + 1)

    return (next_birthday.date() - today.date()).days