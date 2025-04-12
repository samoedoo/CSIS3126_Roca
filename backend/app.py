import os
from flask import Flask, request, jsonify, flash
import mysql.connector
from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS

# Load environment variables from .env file
load_dotenv()

# Get MySQL credentials from .env
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = os.getenv('MYSQL_DB')
SECRET_KEY = os.getenv('SECRET_KEY')

# Initialize Flask app
app = Flask(__name__)
app.secret_key = SECRET_KEY

# Enable CORS
CORS(app)  # This will allow requests from all origins. You can also restrict this if needed.

# MySQL connection
def get_db_connection():
    connection = mysql.connector.connect(
        host=MYSQL_HOST,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DB
    )
    return connection

# Homepage route
@app.route('/')
def home():
    return 'Welcome to the Study Planner API!'

# Login API route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Receive JSON data from the frontend
    username = data.get('username')
    password = data.get('password')

    # Check login credentials in database
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    connection.close()

    if user:
        return jsonify({"message": "Login successful!"}), 200  # Respond with success
    else:
        return jsonify({"message": "Invalid username or password!"}), 400  # Respond with error message

# Registration API route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()  # Receive JSON data from the frontend
    username = data.get('username')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if password != confirm_password:
        return jsonify({"message": "Passwords do not match!"}), 400  # Respond with error if passwords don't match

    # Insert new user into database
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"message": "Username already taken!"}), 400  # Respond with error if username is already taken

    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    connection.commit()
    connection.close()

    return jsonify({"message": "Registration successful!"}), 201  # Respond with success

# Dashboard route (after login)
@app.route('/dashboard')
def dashboard():
    return 'Welcome to your dashboard!'

if __name__ == '__main__':
    app.run(debug=True)
