from flask import Blueprint,request,jsonify
from db import get_connection
from flask_jwt_extended import (create_access_token,jwt_required,get_jwt_identity,get_jwt)
from datetime import timedelta
import bcrypt


routes = Blueprint("routes",__name__)

@routes.route("/register", methods=["POST"])
def register():

    data = request.json

    fname = data["fname"]
    lname = data["lname"]
    email = data["email"]
    password = data["password"]

    conn = get_connection()
    cursor = conn.cursor()
    
    hashed_password = bcrypt.hashpw(password.encode("utf-8"),bcrypt.gensalt()).decode("utf-8")

    cursor.execute("SELECT DATABASE()")
    # print("Current Database:", cursor.fetchone())

    sql = """
    INSERT INTO users(fname,lname,email,password)
    VALUES(%s,%s,%s,%s)
    """

    cursor.execute(sql, (fname, lname, email,hashed_password))
    # print("Insert executed")

    conn.commit()
    # print("Commit executed")

    cursor.execute("SELECT * FROM users")
    # print(cursor.fetchall())

    cursor.close()
    conn.close()

    return jsonify({"message": "Register successful"})

@routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print("Inside add_employee")
    print("Received:", data)

    email = data["email"]
    password = data["password"]

    print("Email:", email)
    print("Password:", password)

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    SELECT * FROM users
    WHERE email=%s
    """

    cursor.execute(sql, (email,))

    user = cursor.fetchone()

    print("User:", user)

    cursor.close()
    conn.close()
    

    if user and bcrypt.checkpw(password.encode("utf-8"),user["password"].encode("utf-8")):
        
        
        token = create_access_token(identity =str(user["id"]),additional_claims ={"email" : user["email"]},expires_delta=timedelta(hours=10))
        
        print("generated token",token)

        return jsonify({
            "success": True,
            "message": "Login successful",
            "token":token})

    else:
        return jsonify({
        "success": False,
        "message": "Invalid credentials"
        }), 401
     
     
     
@routes.route("/profile")
@jwt_required()

def profile():

    print("inside profile")
    current_user = get_jwt_identity()
    claims  = get_jwt()

    return jsonify({
        "message":"welcome",
        "id": current_user,
        "email": claims["email"]

    })   
    
@routes.route("/employee", methods=["POST"])
@jwt_required()
def add_employee():

    data = request.json
    print("Received:", data)

    emp_name = data["emp_name"]
    department = data["department"]
    joining_date = data["joining_date"]
    salary = data["salary"]
    location = data["location"]

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT DATABASE()")
    # print("Current Database:", cursor.fetchone())

    sql = """
    INSERT INTO employees_new(emp_name,department,joining_date,salary,location)
    VALUES(%s,%s,%s,%s,%s)
    """

    cursor.execute(sql, (emp_name,department,joining_date,salary,location))
    print("Insert executed")

    conn.commit()
    cursor.execute("SELECT * FROM employees_new")
    print(cursor.fetchall())

    cursor.close()
    conn.close()

    return jsonify({"message": "employee added successful"})

@routes.route("/employee", methods=["GET"])
# @jwt_required()
def get_employees():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT DATABASE()")
    cursor.execute("SELECT * FROM employees_new")
    employees = cursor.fetchall()
    print("Employees:", employees)

    cursor.close()
    conn.close()

    return jsonify(employees)

@routes.route("/employee/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_employee(id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM employees_new WHERE emp_id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Employee deleted successfully"})

@routes.route("/employee/<int:id>", methods=["PUT"])
@jwt_required()
def update_employee(id):
    
    data = request.json

    print("Employee ID:", id)
    print("Received Data:", data)
    
    conn = get_connection()
    cursor = conn.cursor()

    sql = """
    UPDATE employees_new
    SET
        emp_name=%s,
        department=%s,
        joining_date=%s,
        salary=%s,
        location=%s
    WHERE emp_id=%s
    """

    cursor.execute(sql, (
        data["emp_name"],
        data["department"],
        data["joining_date"],
        data["salary"],
        data["location"],
        id
    ))
    
    print("Rows updated:", cursor.rowcount)

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Employee updated successfully"})
        
    
    