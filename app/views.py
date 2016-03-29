from app import app, db
from app.models import User, Item, AuthToken, Wishlist
from flask import send_from_directory, request, url_for, redirect, jsonify
from werkzeug.datastructures import MultiDict
from forms import RegisterForm, LoginForm, WishlistForm
from uuid import uuid4

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

@app.route('/api/users', methods=['GET'])
def list_users():
	users = db.session.query(User).all()

	if (users == None):
		return transform(404, message="Error loading users")

	user_list = map(lambda x:x.__repr__(), users)

	return jsonify({'users': user_list})

@app.route('/api/users/<id>')
def get_user_by_id(id):
	user = User.query.filter(User.id == id).first()

	if (user == None):
		return jsonify({"error": "Could not find user"})

	return jsonify(user.__repr__())

@app.route('/api/users/<user_id>/wishlists', methods=['GET'])
def get_all_wishlist(user_id):
	wishlists = db.session.query(Wishlist).filter_by(user_id=user_id).all()
	wishlist_list = map(lambda x:x.__repr__(), wishlists)
	return jsonify({
		'wishlists': wishlist_list,
		'count': len(wishlists)
	})

@app.route('/api/users/<user_id>/wishlists', methods=['POST'])
def save_wishlist(user_id):
	token = request.headers.get('auth-token')

	print token
	user = db.session.query(User).filter_by(id=user_id).first()
	auth = db.session.query(AuthToken).filter_by(token=token).first()

	# print auth

	if auth.user_id != user.id:
		return jsonify({'error': 'token not found'})

	data = MultiDict(mapping=request.json)

	inputs = WishlistForm(data, csrf_enabled=False)

	if not inputs.validate():
		return jsonify({'error': 'missing required fields'})

	name = data['name']
	description = data['description']

	wishlist = Wishlist(name, description)

	user.wishlists.append(wishlist)

	db.session.add(wishlist)
	db.session.commit()

	return jsonify(wishlist.__repr__())


@app.route('/api/login', methods=['POST'])
def login():
	data = MultiDict(mapping=request.json)
	inputs = LoginForm(data, csrf_enabled=False)

	if not inputs.validate():
		return jsonify({'error': 'Invalid credentials'})
	
	user = db.session.query(User).filter_by(email=data['email']).first()

	if not user:
		return jsonify({'error': 'invalid email'})

	if not user.password != data['password']:
		return jsonify({'error': 'invalid credentials'})

	return jsonify({'user': user.__repr__()})


@app.route('/api/register', methods=['POST'])
def register():
	data = MultiDict(mapping=request.json)	
	inputs = RegisterForm(data, csrf_enabled=False)
	
	if not inputs.validate():
		return transform(300, message="Invalid inputs")
	else:
		firstName = data.get('first_name')
		lastName = data.get('last_name')
		email = data.get('email')
		password = data.get('password')

		user = User(email, password, firstName, lastName)
		auth = AuthToken()

		user.tokens.append(auth)

		try:
			db.session.add(user)
			# db.session.add(auth)

			db.session.commit()
		except IntegrityError as e:
			return jsonify({"error": "email already taken"})

		response = auth.__repr__()
		response.update({
			'user_id': user.id,
			'first_name': user.first_name,
			'last_name': user.last_name
		})

		return jsonify(response)

# Helpers
def extract_json(request, form=None):
	data = MultiDict(mapping=request.json)
	# add form input extraction here
	
	return data #, input


def transform(status, data=None, message=None):
	response = {'status': status}

	if data is not None:
		response['data'] = data
	if message is not None:
		response['message'] = message

	return jsonify(response)
