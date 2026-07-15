import os
import sys
import sqlite3
from datetime import datetime

# Ensure backend package modules import correctly regardless of CWD
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from config import DATABASE_FILE


# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_connection():

    conn = sqlite3.connect(
        DATABASE_FILE,
        timeout=30,
        check_same_thread=False
    )

    conn.row_factory = sqlite3.Row

    conn.execute("PRAGMA foreign_keys = ON")

    return conn


# ==========================================
# CREATE DATABASE
# ==========================================

def create_database():

    conn = get_connection()

    cursor = conn.cursor()

    # ---------------- USERS ----------------

    cursor.execute("""

    CREATE TABLE IF NOT EXISTS users(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        email TEXT UNIQUE NOT NULL,

        password TEXT NOT NULL,

        photo TEXT DEFAULT '',

        provider TEXT DEFAULT 'local',

        created_at TEXT

    )

    """)

    # --------------- BIRTHDAYS -------------

    cursor.execute("""

    CREATE TABLE IF NOT EXISTS birthdays(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_id INTEGER NOT NULL,

        name TEXT NOT NULL,

        dob TEXT NOT NULL,

        gender TEXT,

        relationship TEXT,

        phone TEXT,

        email TEXT,

        address TEXT,

        favorite_gift TEXT,

        favorite_color TEXT,

        notes TEXT,

        important INTEGER DEFAULT 0,

        anniversary_type TEXT,

        anniversary_date TEXT,

        created_at TEXT,

        updated_at TEXT,

        FOREIGN KEY(user_id)

        REFERENCES users(id)

        ON DELETE CASCADE

    )

    """)

    # ------------- ANNIVERSARIES ------------

    cursor.execute("""

    CREATE TABLE IF NOT EXISTS anniversaries(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_id INTEGER NOT NULL,

        person1 TEXT NOT NULL,

        person2 TEXT NOT NULL,

        date TEXT NOT NULL,

        relationship TEXT,

        notes TEXT,

        important INTEGER DEFAULT 0,

        created_at TEXT,

        updated_at TEXT,

        FOREIGN KEY(user_id)

        REFERENCES users(id)

        ON DELETE CASCADE

    )

    """)

    conn.commit()

    conn.close()

    print("Database Ready")
    
def database_health():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM users")

    users = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM birthdays")

    birthdays = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM anniversaries")

    anniversaries = cursor.fetchone()[0]

    conn.close()

    return {

        "users": users,

        "birthdays": birthdays,

        "anniversaries": anniversaries

    }


# ==========================================
# SAVE BIRTHDAY
# ==========================================

def save_birthday(data):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        person_id = data.get("id")

        user_id = data.get("user_id")

        name = data.get("name", "").strip()

        dob = data.get("dob", "").strip()

        gender = data.get("gender", "")

        relationship = data.get("relationship", "")

        phone = data.get("phone", "")

        email = data.get("email", "")

        address = data.get("address", "")

        favorite_gift = data.get("favorite_gift", "")

        favorite_color = data.get("favorite_color", "")

        notes = data.get("notes", "")

        important = int(data.get("important", False))

        anniversary_type = data.get("anniversary_type", "")

        anniversary_date = data.get("anniversary_date", "")

        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # ============================
        # UPDATE
        # ============================

        if person_id:

            cursor.execute("""

                UPDATE birthdays

                SET

                    name=?,

                    dob=?,

                    gender=?,

                    relationship=?,

                    phone=?,

                    email=?,

                    address=?,

                    favorite_gift=?,

                    favorite_color=?,

                    notes=?,

                    important=?,

                    anniversary_type=?,

                    anniversary_date=?,

                    updated_at=?

                WHERE id=? AND user_id=?

            """,

            (

                name,

                dob,

                gender,

                relationship,

                phone,

                email,

                address,

                favorite_gift,

                favorite_color,

                notes,

                important,

                anniversary_type,

                anniversary_date,

                now,

                person_id,

                user_id

            ))

            conn.commit()

            return {

                "success": True,

                "message": "Profile updated successfully."

            }

        # ============================
        # DUPLICATE CHECK
        # ============================

        cursor.execute("""

            SELECT id

            FROM birthdays

            WHERE

                LOWER(name)=LOWER(?)

            AND

                user_id=?

        """,

        (

            name,

            user_id

        ))

        duplicate = cursor.fetchone()

        if duplicate:

            return {

                "success": False,

                "message": "A person with this name already exists."

            }

        # ============================
        # INSERT
        # ============================

        cursor.execute("""

            INSERT INTO birthdays(

                user_id,

                name,

                dob,

                gender,

                relationship,

                phone,

                email,

                address,

                favorite_gift,

                favorite_color,

                notes,

                important,

                anniversary_type,

                anniversary_date,

                created_at,

                updated_at

            )

            VALUES(

                ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?

            )

        """,

        (

            user_id,

            name,

            dob,

            gender,

            relationship,

            phone,

            email,

            address,

            favorite_gift,

            favorite_color,

            notes,

            important,

            anniversary_type,

            anniversary_date,

            now,

            now

        ))

        conn.commit()

        return {

            "success": True,

            "message": "Profile saved successfully."

        }

    except sqlite3.IntegrityError as e:

        print("\nSQLITE ERROR")
        print(e)
        print()

        return {
            "success": False,
            "message": str(e)
        }

    except Exception as e:

        print("DATABASE ERROR:", e)

        return {
            "success": False,
            "message": str(e)
        }

    finally:

        conn.close()
        # ==========================================
# GET ALL BIRTHDAYS
# ==========================================

def get_all_birthdays(user_id):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        cursor.execute("""

            SELECT *

            FROM birthdays

            WHERE user_id=?

            ORDER BY LOWER(name)

        """,

        (user_id,))

        return [

            dict(row)

            for row in cursor.fetchall()

        ]

    finally:

        conn.close()


# ==========================================
# FIND BIRTHDAY
# ==========================================

def find_birthday(user_id, name):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        cursor.execute("""

            SELECT *

            FROM birthdays

            WHERE

                user_id=?

            AND

                LOWER(name)=LOWER(?)

        """,

        (

            user_id,

            name

        ))

        row = cursor.fetchone()

        if row:

            return dict(row)

        return None

    finally:

        conn.close()


# ==========================================
# GET PROFILE
# ==========================================

def get_profile(user_id, profile_id):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        cursor.execute("""

            SELECT *

            FROM birthdays

            WHERE

                id=?

            AND

                user_id=?

        """,

        (

            profile_id,

            user_id

        ))

        row = cursor.fetchone()

        if row:

            return dict(row)

        return None

    finally:

        conn.close()


# ==========================================
# DELETE BIRTHDAY
# ==========================================

def delete_birthday(user_id, person_id):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        cursor.execute("""

            DELETE

            FROM birthdays

            WHERE

                id=?

            AND

                user_id=?

        """,

        (

            person_id,

            user_id

        ))

        conn.commit()

        return cursor.rowcount > 0

    finally:

        conn.close()


# ==========================================
# UPDATE PROFILE
# ==========================================

def update_profile(user_id, profile_id, data):

    data["id"] = profile_id

    data["user_id"] = user_id

    return save_birthday(data)


# ==========================================
# SAVE / UPDATE ANNIVERSARY
# ==========================================

def save_anniversary(data):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        anniversary_id = data.get("id")
        user_id = data.get("user_id")

        person1 = data.get("person1", "").strip()
        person2 = data.get("person2", "").strip()

        date = data.get("date", "").strip()

        relationship = data.get("relationship", "").strip()

        notes = data.get("notes", "").strip()

        important = int(data.get("important", False))

        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # ==========================
        # UPDATE
        # ==========================

        if anniversary_id:

            cursor.execute("""

                UPDATE anniversaries

                SET

                    person1=?,
                    person2=?,
                    date=?,
                    relationship=?,
                    notes=?,
                    important=?,
                    updated_at=?

                WHERE

                    id=?
                    AND user_id=?

            """,

            (

                person1,
                person2,
                date,
                relationship,
                notes,
                important,
                now,
                anniversary_id,
                user_id

            ))

            conn.commit()

            return {

                "success": True,
                "message": "Anniversary updated successfully."

            }

        # ==========================
        # INSERT
        # ==========================

        cursor.execute("""

            INSERT INTO anniversaries(

                user_id,
                person1,
                person2,
                date,
                relationship,
                notes,
                important,
                created_at,
                updated_at

            )

            VALUES(?,?,?,?,?,?,?,?,?)

        """,

        (

            user_id,
            person1,
            person2,
            date,
            relationship,
            notes,
            important,
            now,
            now

        ))

        conn.commit()

        return {

            "success": True,
            "message": "Anniversary saved successfully."

        }

    except Exception as e:

        print("DATABASE ERROR :", e)

        return {

            "success": False,
            "message": str(e)

        }

    finally:

        conn.close()


# ==========================================
# GET ALL ANNIVERSARIES
# ==========================================

def get_all_anniversaries(user_id):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        cursor.execute("""

            SELECT *

            FROM anniversaries

            WHERE user_id=?

            ORDER BY date

        """,

        (user_id,))

        return [

            dict(row)

            for row in cursor.fetchall()

        ]

    finally:

        conn.close()


        # ==========================================
# GET SINGLE ANNIVERSARY
# ==========================================

def get_anniversary(user_id, anniversary_id):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        cursor.execute("""

            SELECT *

            FROM anniversaries

            WHERE

                id=?
                AND user_id=?

        """,

        (

            anniversary_id,
            user_id

        ))

        row = cursor.fetchone()

        if row:

            return dict(row)

        return None

    finally:

        conn.close()


# ==========================================
# DELETE ANNIVERSARY
# ==========================================

def delete_anniversary(user_id, anniversary_id):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        cursor.execute("""

            DELETE

            FROM anniversaries

            WHERE

                id=?

            AND

                user_id=?

        """,

        (

            anniversary_id,

            user_id

        ))

        conn.commit()

        return cursor.rowcount > 0

    finally:

        conn.close()
        # ==========================================
# IMPORTANT BIRTHDAYS
# ==========================================

def get_important_birthdays(user_id):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        cursor.execute("""

            SELECT *

            FROM birthdays

            WHERE

                user_id=?

            AND

                important=1

            ORDER BY LOWER(name)

        """,

        (user_id,))

        return [

            dict(row)

            for row in cursor.fetchall()

        ]

    finally:

        conn.close()


# ==========================================
# IMPORTANT ANNIVERSARIES
# ==========================================

def get_important_anniversaries(user_id):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        cursor.execute("""

            SELECT *

            FROM anniversaries

            WHERE

                user_id=?

            AND

                important=1

            ORDER BY date

        """,

        (user_id,))

        return [

            dict(row)

            for row in cursor.fetchall()

        ]

    finally:

        conn.close()


# ==========================================
# CLEAR DATABASE
# ==========================================

def clear_database(user_id):

    conn = get_connection()

    try:

        cursor = conn.cursor()

        cursor.execute(

            """

            DELETE

            FROM birthdays

            WHERE user_id=?

            """,

            (user_id,)

        )

        cursor.execute(

            """

            DELETE

            FROM anniversaries

            WHERE user_id=?

            """,

            (user_id,)

        )

        conn.commit()

        return True

    finally:

        conn.close()