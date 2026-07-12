import bcrypt

from datetime import datetime

from flask_jwt_extended import create_access_token

from database import get_connection


# ==========================================
# REGISTER USER
# ==========================================

def register_user(data):

    conn = get_connection()

    cursor = conn.cursor()

    try:

        name = data.get("name", "").strip()

        email = data.get("email", "").strip().lower()

        password = data.get("password", "").strip()

        if not name or not email or not password:

            return {

                "success": False,

                "message": "All fields are required."

            }

        cursor.execute(

            "SELECT id FROM users WHERE email=?",

            (email,)

        )

        if cursor.fetchone():

            return {

                "success": False,

                "message": "Email already registered."

            }

        password_hash = bcrypt.hashpw(

            password.encode(),

            bcrypt.gensalt()

        ).decode()

        cursor.execute(

            """

            INSERT INTO users(

                name,

                email,

                password,

                created_at

            )

            VALUES(?,?,?,?)

            """,

            (

                name,

                email,

                password_hash,

                datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            )

        )

        conn.commit()

        return {

            "success": True,

            "message": "Account created successfully."

        }

    finally:

        conn.close()


# ==========================================
# LOGIN USER
# ==========================================

def login_user(data):

    conn = get_connection()

    cursor = conn.cursor()

    try:

        email = data.get("email", "").strip().lower()

        password = data.get("password", "").strip()

        cursor.execute(

            "SELECT * FROM users WHERE email=?",

            (email,)

        )

        row = cursor.fetchone()

        if row is None:

            return {

                "success": False,

                "message": "Invalid email or password."

            }

        user = dict(row)

        if not bcrypt.checkpw(

            password.encode(),

            user["password"].encode()

        ):

            return {

                "success": False,

                "message": "Invalid email or password."

            }

        token = create_access_token(

            identity=str(user["id"])

        )

        return {

            "success": True,

            "message": "Login successful.",

            "token": token,

            "user": {

                "id": user["id"],

                "name": user["name"],

                "email": user["email"],

                "photo": user["photo"]

            }

        }

    finally:

        conn.close()