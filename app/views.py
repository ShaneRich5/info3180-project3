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


# ==============================================================
# 						Item Routes
# ==============================================================
@app.route('/api/items', methods=['GET'])
def list_items():
	items = db.session.query(Item).all()
	item_list = map(lambda x:x__repr__(), items)
	return jsonify({'items': item_list})

@app.route('/api/users/<user_id>/wishlists/<wishlist_name>/items/<item_no>', methods=['GET'])
def get_wishlist_item_by_index(user_id, wishlist_name, item_no):
	wishlist = db.session.query(Wishlist).filter_by(name=wishlist_name, user_id=user_id).first()
	items = db.session.query(Item).filter_by(wishlist_id=wishlist.id,).all()
	return jsonify({
		'item': items[0]
	})
	item_list = map(lambda x:x__repr__(), items)


@app.route('/api/users/<user_id>/wishlists/<wishlist_name>/items', methods=['GET'])
def get_wishlist_items(user_id, wishlist_name):
	wishlist = db.session.query(Wishlist).filter_by(name=wishlist_name, user_id=user_id).first()
	items = db.session.query(Item).filter_by(wishlist_id=wishlist.id,).all()
	item_list = map(lambda x:x__repr__(), items)
	return jsonify({
		'items': item_list,
		'count': len(items)
	})

@app.route('/api/users/<user_id>/wishlists/<wishlist_name>/items', methods=['POST'])
def save_wishlist_item(user_id, wishlist_name):
	token = request.headers.get('auth-token')
	data = MultiDict(mapping=request.json)
	inputs = ItemForm(data, csrf_enabled=False)

	if not inputs.validate():
		return jsonify({'error': 'invalid inputs'})

	wishlist = db.session.query(Wishlist).filter(user_id=user_id, name=wishlist_name).first()
	
	name = data['name']
	description = data['description']

	item = Item(name, description=description)

	wishlist.items.append(item)

	db.session.add(item)
	db.session.commit()

	return jsonify(item.__repr__())


# ==============================================================
# 						User Routes
# ==============================================================
@app.route('/api/users', methods=['GET'])
def list_users():
	users = db.session.query(User).all()

	if (users == None):
		return jsonify({'error': 'error loading users'})

	user_list = map(lambda x:x.__repr__(), users)

	return jsonify({'users': user_list})

@app.route('/api/users/<id>')
def get_user_by_id(id):
	user = User.query.filter(User.id == id).first()

	if (user == None):
		return jsonify({"error": "Could not find user"})

	return jsonify(user.__repr__())


# ==============================================================
# 						Wishlist Routes
# ==============================================================
@app.route('/api/users/<user_id>/wishlists/<wishlist_name>', methods=['GET'])
def get_wishlist_by_name(user_id, wishlist_name):
	wishlist = db.session.query(Wishlist).filter_by(name=wishlist_name, user_id=user_id).first()
	items = db.session.query(Item).filter_by(wishlist_id=wishlist.id).all()
	item_list = map(lambda x:x.__repr__(), items)
	
	return jsonify({
		'wishlist': wishlist.__repr__(),
		'items': item_list,
		'item_count': len(items)
	})

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
