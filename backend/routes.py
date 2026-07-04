from flask import Blueprint,request,jsonify
from db import get_connection

routes = Blueprint("routes",__name__)

@routes.route("/register",methods=["POST"])
def register():
    data = request.json
    
    fname = data["fname"]
    lname = data["lname"]
    email = data["email"]
    password = data["password"]
    
    conn = get_connection()
    cursor = conn.cursor()
    
    sql = """
    INSERT INTO USERS(fname,lname,email,password)
    values(%s,%s,%s,%s)
    """
    cursor.execute(sql,(fname,lname,email,password))
    
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return jsonify({"message":"register successful"})

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

    return jsonify({
        "success": False,
        "message": "Invalid credentials"
    }), 401
        
    
        
    
    