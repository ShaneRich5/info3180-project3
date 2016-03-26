from app import app, db
from app.models import User, Item
from flask import send_from_directory, request, url_for, redirect, jsonify
from werkzeug.datastructures import MultiDict
from forms import RegisterForm, LoginForm

@app.route('/')
@app.route('/home')
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
	data = MultiDict(mapping=request.json)
	inputs = LoginForm(data, csrf_enabled=False)

	if not inputs.validate():
		return transform(300, message="Invalid inputs")
	else:
		data = request.get_json()

		user = db.session.query(User).filter_by(email=data['email']).first()

		if not user:
			return transform(404, message="Invalid email")

		if not user.password != data['password']:
			return transform(404, message="Invalid credentials")

		return transform(200, data=user)

@app.route('/api/register', methods=['POST'])
def register():
	data = MultiDict(mapping=request.json)	
	inputs = RegisterForm(data, csrf_enabled=False)
	
	if not inputs.validate():
		return transform(300, message="Invalid inputs")
	else:
		# data = request.get_json()

		firstName = data.get('first_name')
		lastName = data.get('last_name')
		email = data.get('email')
		password = data.get('password')

		user = User(email, password, firstName, lastName)

		db.session.add(user)
		db.session.commit()

		return transform(200, 
			data=user, 
			message='User created successfully')

@app.route('/api/users', methods=['GET'])
def list_users():
	users = User.query.all()

	if (users == None):
		return transform(404, message="Error loading users")

	return transform(200, data=users)

@app.route('/api/users/<id>')
def get_user_by_id(id):
	user = User.query.filter(User.id == id).first()

	if (user == None):
		return transform()

	return transform(200, data=user)

def transform(status, data=None, message=None):
	return jsonify({
		'status': status,
		'data': data,
		'message': message
	})