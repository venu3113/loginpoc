from flask import Blueprint,request,jsonify
from db import get_connection

routes = Blueprint("routes",__name__)

@routes.route("/register",methods=["POST"])

@routes.route("/register", methods=["POST"])
def register():

    data = request.json

    fname = data["fname"]
    lname = data["lname"]
    email = data["email"]
    password = data["password"]

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT DATABASE()")
    print("Current Database:", cursor.fetchone())

    sql = """
    INSERT INTO users(fname,lname,email,password)
    VALUES(%s,%s,%s,%s)
    """

    cursor.execute(sql, (fname, lname, email, password))
    print("Insert executed")

    conn.commit()
    print("Commit executed")

    cursor.execute("SELECT * FROM users")
    print(cursor.fetchall())

    cursor.close()
    conn.close()

    return jsonify({"message": "Register successful"})

@routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    print("Received:", data)

    email = data["email"]
    password = data["password"]

    print("Email:", email)
    print("Password:", password)

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    SELECT * FROM users
    WHERE email=%s AND password=%s
    """

    cursor.execute(sql, (email, password))

    user = cursor.fetchone()

    print("User:", user)

    cursor.close()
    conn.close()

    if user:
        return jsonify({
            "success": True,
            "message": "Login successful"
        })

    else:
        return jsonify({
        "success": False,
        "message": "Invalid credentials"
        }), 401
        
    
        
    
    