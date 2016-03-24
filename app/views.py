from app import app
from flask import send_from_directory, request, url_for, redirect, jsonify

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
@app.route('/')
def base():
	""" Render the base html file """
	return app.send_static_file("base.html")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def assets(path):
	""" Respond with static files """
	return app.send_static_file(path)

@app.route('/api/logout', methods=['POST'])
def logout():
	return jsonify({'e': 'f'})

@app.route('/api/login', methods=['POST'])
def login():
	return jsonify({'c': 'd'})

@app.route('/api/register', methods=['POST'])
def register():
	return jsonify({'a': 'b'})

@app.route('')