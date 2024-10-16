# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory database for demonstration
tasks = [
    {'id': 1, 'title': 'Task One', 'description': 'First task description'},
    {'id': 2, 'title': 'Task Two', 'description': 'Second task description'}
]

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Flask Backend!"})

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    new_task = request.get_json()
    new_task['id'] = len(tasks) + 1
    tasks.append(new_task)
    return jsonify(new_task), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
