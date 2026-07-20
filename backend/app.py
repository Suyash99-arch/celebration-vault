import os
import sys

# Ensure backend package modules import correctly regardless of CWD
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    get_jwt_identity
)

from config import (
    DATABASE_FILE,
    HOST,
    PORT,
    DEBUG,
    JWT_SECRET_KEY,
    JWT_ACCESS_TOKEN_EXPIRES
)

from database import (
    create_database,
    database_health,
    save_birthday,
    get_all_birthdays,
    find_birthday,
    get_profile,
    update_profile,
    delete_birthday,
    save_anniversary,
    get_anniversary,
    get_all_anniversaries,
    delete_anniversary,
    get_important_birthdays,
    get_important_anniversaries,
    clear_database
)

from utils import (
    calculate_age,
    next_birthday,
    validate_date,
    format_date,
    is_birthday_today,
    days_until_birthday
)

from auth import (
    register_user,
    login_user
)

# =====================================================
# FLASK
# =====================================================

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = JWT_ACCESS_TOKEN_EXPIRES
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"
app.config["CORS_HEADERS"] = "Content-Type,Authorization"

jwt = JWTManager(app)

# =====================================================
# JWT ERROR HANDLERS
# =====================================================

@jwt.unauthorized_loader
def unauthorized_callback(reason):

    print("=" * 60)
    print("JWT UNAUTHORIZED")
    print(reason)
    print("=" * 60)

    return jsonify({
        "success": False,
        "message": reason
    }), 401


@jwt.invalid_token_loader
def invalid_token_callback(reason):

    print("=" * 60)
    print("JWT INVALID")
    print(reason)
    print("=" * 60)

    return jsonify({
        "success": False,
        "message": reason
    }), 422


@jwt.expired_token_loader
def expired(jwt_header, jwt_payload):

    return jsonify({

        "success": False,

        "message": "Session expired. Please login again."

    }), 401


# =====================================================
# CORS
# =====================================================

from flask_cors import CORS

from flask_cors import CORS

CORS(
    app,
    resources={r"/*": {"origins": [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://celebration-vault-h4plab3ke-suyash99-archs-projects.vercel.app"
    ]}},
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"]
)

# =====================================================
# CREATE DATABASE
# =====================================================

create_database()



# =====================================================
# HOME
# =====================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({

        "success": True,

        "application": "Birthday Vault",

        "version": "3.0"

    })

# =====================================================
# DATABASE STATUS
# =====================================================

@app.route("/database-status")
@jwt_required()
def database_status():

    return jsonify({

        "success": True,

        "database": database_health()

    })


# =====================================================
# GET ALL BIRTHDAYS
# =====================================================

@app.route("/birthdays", methods=["GET"])
@jwt_required()
def birthdays():

    try:

        user_id = int(get_jwt_identity())

        people = get_all_birthdays(user_id)

        result = []

        for person in people:

            result.append({

                "id": person["id"],

                "name": person["name"],

                "dob": person["dob"],

                "relationship": person.get("relationship", ""),

                "phone": person.get("phone", ""),

                "email": person.get("email", ""),

                "address": person.get("address", ""),

                "notes": person.get("notes", ""),

                "important": bool(person.get("important", 0)),

                "anniversary_type": person.get("anniversary_type", ""),

                "anniversary_date": person.get("anniversary_date", ""),

                "formatted_dob": format_date(person["dob"]),

                "age": calculate_age(person["dob"]),

                "days_left": next_birthday(person["dob"]),

                "days_left_number": days_until_birthday(person["dob"]),

                "today": is_birthday_today(person["dob"])

            })

        return jsonify({

            "success": True,

            "count": len(result),

            "birthdays": result

        })

    except Exception as e:

        print("BIRTHDAY ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500




# =====================================================
# SAVE BIRTHDAY
# =====================================================

@app.route("/save", methods=["POST"])
@jwt_required()
def save():

    try:

        data = request.get_json()

        if not data:

            return jsonify({
                "success": False,
                "message": "No data received"
            }), 400

        user_id = int(get_jwt_identity())

        data["user_id"] = user_id

        name = data.get("name", "").strip()
        dob = data.get("dob", "").strip()

        if not name or not dob:

            return jsonify({
                "success": False,
                "message": "Name and DOB required"
            }), 400

        if not validate_date(dob):

            return jsonify({
                "success": False,
                "message": "Invalid date"
            }), 400

        result = save_birthday(data)

        print("SAVE RESULT:", result)

        status = 200 if result["success"] else 400

        return jsonify(result), status

    except Exception as e:

        print("SAVE ERROR:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# =====================================================
# SEARCH PERSON
# =====================================================

@app.route("/search/<name>", methods=["GET"])
@jwt_required()
def search(name):

    try:

        user_id = int(get_jwt_identity())

        person = find_birthday(user_id, name)

        if not person:

            return jsonify({

                "success": False,

                "message": "Person not found"

            }), 404

        return jsonify({

            "success": True,

            "id": person["id"],

            "name": person["name"],

            "dob": person["dob"],

            "formatted_dob": format_date(person["dob"]),

            "age": calculate_age(person["dob"]),

            "days_left": next_birthday(person["dob"]),

            "days_left_number": days_until_birthday(person["dob"]),

            "today": is_birthday_today(person["dob"]),

            "relationship": person.get("relationship", ""),

            "phone": person.get("phone", ""),

            "email": person.get("email", ""),

            "address": person.get("address", ""),

            "notes": person.get("notes", ""),

            "important": bool(person.get("important", 0)),

            "anniversary_type": person.get("anniversary_type", ""),

            "anniversary_date": person.get("anniversary_date", "")

        })

    except Exception as e:

        print("SEARCH ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500



# =====================================================
# GET PROFILE
# =====================================================

@app.route("/profile/<int:profile_id>", methods=["GET"])
@jwt_required()
def profile(profile_id):

    try:

        user_id = int(get_jwt_identity())

        person = get_profile(user_id, profile_id)

        if not person:

            return jsonify({

                "success": False,

                "message": "Profile not found"

            }), 404

        return jsonify({

            "success": True,

            "profile": person

        })

    except Exception as e:

        print("PROFILE ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500




# =====================================================
# UPDATE PROFILE
# =====================================================

@app.route("/update/<int:profile_id>", methods=["PUT"])
@jwt_required()
def update_profile_route(profile_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "message": "No data received"
            }), 400

        result = update_profile(
            int(get_jwt_identity()),
            profile_id,
            data
        )

        status = 200 if result["success"] else 400
        return jsonify(result), status

    except Exception as e:
        print("UPDATE ERROR:", e)
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
    


# =====================================================
# DELETE PROFILE
# =====================================================

@app.route("/delete/<int:profile_id>", methods=["DELETE"])
@jwt_required()
def delete(profile_id):

    try:

        user_id = int(get_jwt_identity())

        success = delete_birthday(user_id, profile_id)

        if success:

            return jsonify({

                "success": True,

                "message": "Profile deleted successfully."

            })

        return jsonify({

            "success": False,

            "message": "Profile not found."

        }), 404

    except Exception as e:

        print("DELETE ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500





# =====================================================
# SAVE ANNIVERSARY
# =====================================================

@app.route("/save-anniversary", methods=["POST"])
@jwt_required()
def save_new_anniversary():

    try:

        data = request.get_json()

        if not data:

            return jsonify({

                "success": False,

                "message": "No data received"

            }), 400

        user_id = int(get_jwt_identity())

        data["user_id"] = user_id

        if (
            not data.get("person1")
            or not data.get("person2")
            or not data.get("date")
        ):

            return jsonify({

                "success": False,

                "message": "Please fill all required fields"

            }), 400

        if not validate_date(data["date"]):

            return jsonify({

                "success": False,

                "message": "Invalid date"

            }), 400

        result = save_anniversary(data)

        status = 200 if result["success"] else 400

        return jsonify(result), status

    except Exception as e:

        print("ANNIVERSARY SAVE ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500





# =====================================================
# GET ANNIVERSARIES
# =====================================================

@app.route("/anniversaries", methods=["GET"])
@jwt_required()
def anniversaries():

    try:

        user_id = int(get_jwt_identity())

        data = get_all_anniversaries(user_id)

        result = []

        for item in data:

            result.append({

                "id": item["id"],

                "person1": item["person1"],

                "person2": item["person2"],

                "date": item["date"],

                "relationship": item.get("relationship", ""),

                "notes": item.get("notes", ""),

                "important": bool(item.get("important", 0)),

                "formatted_date": format_date(item["date"]),

                "days_left": next_birthday(item["date"]),

                "days_left_number": days_until_birthday(item["date"])

            })

        return jsonify({

            "success": True,

            "count": len(result),

            "anniversaries": result

        })

    except Exception as e:

        print("ANNIVERSARY ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500



# =====================================================
# GET SINGLE ANNIVERSARY
# =====================================================

@app.route("/anniversary/<int:anniversary_id>", methods=["GET"])
@jwt_required()
def get_anniversary_route(anniversary_id):

    try:

        user_id = int(get_jwt_identity())

        anniversary = get_anniversary(
            user_id,
            anniversary_id
        )

        if not anniversary:

            return jsonify({

                "success": False,
                "message": "Anniversary not found."

            }), 404

        return jsonify({

            "success": True,
            "anniversary": anniversary

        })

    except Exception as e:

        print("GET ANNIVERSARY ERROR:", e)

        return jsonify({

            "success": False,
            "message": str(e)

        }), 500


# =====================================================
# DELETE ANNIVERSARY
# =====================================================

@app.route("/delete-anniversary/<int:id>", methods=["DELETE"])
@jwt_required()
def remove_anniversary(id):

    try:

        user_id = int(get_jwt_identity())

        success = delete_anniversary(user_id, id)

        if success:

            return jsonify({

                "success": True,

                "message": "Anniversary deleted successfully."

            })

        return jsonify({

            "success": False,

            "message": "Anniversary not found."

        }), 404

    except Exception as e:

        print("DELETE ANNIVERSARY ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500





# =====================================================
# IMPORTANT ITEMS
# =====================================================

@app.route("/important", methods=["GET"])
@jwt_required()
def important():

    try:

        user_id = int(get_jwt_identity())

        birthdays = get_important_birthdays(user_id)

        anniversaries = get_important_anniversaries(user_id)

        return jsonify({

            "success": True,

            "birthdays": birthdays,

            "anniversaries": anniversaries

        })

    except Exception as e:

        print("IMPORTANT ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500





# =====================================================
# HEALTH
# =====================================================

@app.route("/health")
def health():

    return jsonify({

        "success": True,

        "status": "Healthy",

        "database": database_health()

    })





# =====================================================
# CLEAR DATABASE
# =====================================================

@app.route("/clear", methods=["DELETE"])
@jwt_required()
def clear():

    try:

        user_id = int(get_jwt_identity())

        clear_database(user_id)

        return jsonify({

            "success": True,

            "message": "All your data has been removed."

        })

    except Exception as e:

        print("CLEAR ERROR:", e)

        return jsonify({

            "success": False,

            "message": str(e)

        }), 500






# =====================================================
# EXPORT DATABASE
# =====================================================

@app.route("/export")
@jwt_required()
def export_database():

    return send_file(

        DATABASE_FILE,

        as_attachment=True,

        download_name="birthday_vault.db"

    )






# =====================================================
# IMPORT DATABASE
# =====================================================

@app.route("/import", methods=["POST"])
@jwt_required()
def import_database():

    if "database" not in request.files:

        return jsonify({

            "success": False,

            "message": "No file selected."

        }), 400

    file = request.files["database"]

    file.save(DATABASE_FILE)

    return jsonify({

        "success": True,

        "message": "Database imported successfully."

    })

# =====================================================
# REGISTER
# =====================================================

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({
            "success": False,
            "message": "No data received."
        }), 400

    result = register_user(data)
    print("REGISTER RESULT:", result)

    if result["success"]:
        return jsonify(result), 201
    return jsonify(result), 400

# =====================================================
# LOGIN
# =====================================================

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({
            "success": False,
            "message": "No data received."
        }), 400

    result = login_user(data)
    print("LOGIN RESULT:", result)

    if result["success"]:
        return jsonify(result)
    return jsonify(result), 401






# =====================================================
# RUN
# =====================================================

if __name__ == "__main__":

    print("=" * 60)
    print("Birthday Vault Backend Started")
    print(f"Host : {HOST}")
    print(f"Port : {PORT}")
    print("=" * 60)

    app.run(

        host=HOST,

        port=PORT,

        debug=DEBUG

    )
