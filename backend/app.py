import os
from flask import Flask, request, jsonify, flash
import mysql.connector
from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS
from datetime import datetime  # Import datetime to handle datetime conversions

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
CORS(app)  # This will allow requests from all origins.

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

# API for managing events (GET, POST, PUT)
@app.route('/api/events', methods=['GET', 'POST'])
@app.route('/api/events/<int:event_id>', methods=['GET', 'POST', 'PUT'])
def handle_event(event_id=None):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    if request.method == 'POST':
        # Handle adding new event
        data = request.get_json()
        title = data['title']
        start_str = data['start']
        end_str = data['end']
        description = data.get('description', '')
        user_id = data.get('user_id', 1)

        try:
            start = datetime.fromisoformat(start_str.replace("Z", "+00:00"))
            end = datetime.fromisoformat(end_str.replace("Z", "+00:00"))
        except ValueError:
            return jsonify({'message': 'Invalid datetime format'}), 400

        cursor.execute("""INSERT INTO events (user_id, title, start, end, description)
                          VALUES (%s, %s, %s, %s, %s)""",
                       (user_id, title, start, end, description))
        connection.commit()
        connection.close()
        return jsonify({'message': 'Event added successfully'}), 201

    elif request.method == 'PUT':
        # Handle updating an event
        data = request.get_json()
        title = data['title']
        start_str = data['start']
        end_str = data['end']
        description = data.get('description', '')

        try:
            start = datetime.fromisoformat(start_str.replace("Z", "+00:00"))
            end = datetime.fromisoformat(end_str.replace("Z", "+00:00"))
        except ValueError:
            return jsonify({'message': 'Invalid datetime format'}), 400

        cursor.execute("""UPDATE events SET title = %s, start = %s, end = %s, description = %s
                          WHERE id = %s""",
                       (title, start, end, description, event_id))
        connection.commit()
        connection.close()

        return jsonify({'message': 'Event updated successfully'}), 200

    else:
        # Handle GET request (fetch events)
        user_id = request.args.get('user_id', 1)
        cursor.execute("SELECT * FROM events WHERE user_id = %s", (user_id,))
        events = cursor.fetchall()
        connection.close()
        return jsonify(events)

# API for deleting an event (DELETE)
@app.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    # Connect to the database
    connection = get_db_connection()
    cursor = connection.cursor()

    # Delete the event from the database
    cursor.execute("DELETE FROM events WHERE id = %s", (event_id,))
    connection.commit()
    connection.close()

    return jsonify({'message': 'Event deleted successfully'}), 200

# API for managing courses (GET, POST)
@app.route('/api/courses', methods=['GET', 'POST'])
def handle_courses():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    if request.method == 'POST':
        data = request.get_json()
        name = data['name']
        user_id = data.get('user_id', 1)  # Replace with actual user session ID

        cursor.execute("""INSERT INTO courses (user_id, name)
                          VALUES (%s, %s)""",
                       (user_id, name))
        connection.commit()
        connection.close()
        return jsonify({'message': 'Course added successfully'}), 201

    else:
        user_id = request.args.get('user_id', 1)
        cursor.execute("SELECT * FROM courses WHERE user_id = %s", (user_id,))
        courses = cursor.fetchall()
        connection.close()
        return jsonify(courses)

if __name__ == '__main__':
    app.run(debug=True)
