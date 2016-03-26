from . import db
from sqlalchemy.orm import relationship

# helper table
items = db.Table('item_wishlist',
	db.Column('item_id', db.Integer, db.ForeignKey('item.id')),
	db.Column('wishlist_id', db.Integer, db.ForeignKey('wishlist.id')),
	db.Column('status', db.String(20))
)

class Token(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	value = db.Column(db.String(200), unique=true)
	expire_at = db.Column(db.DateTime())

	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

	def __repr__(self):
		return {
			'value': self.value,
			'expire_at': self.expire_at
		}

class Item(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String(80))
	description = db.Column(db.String(500))
	thumbnail = db.Column(db.String(500))
	wishlist_id = db.Column(db.Integer, db.ForeignKey('user.id'))

	def __init__(self, name, thumbnail, user_id, description=None):
		self.name = name
		self.description = description
		self.thumbnail = thumbnail
		self.user_id = user_id

	def __repr__(self):
		return {
			'name': self.name,
			'description': self.description,
			'thumbnail': self.thumbnail
		}

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	first_name = db.Column(db.String(80))
	last_name = db.Column(db.String(80))
	email = db.Column(db.String(120), unique=True)
	password = db.Column(db.String(80))
	last_login_at = db.Column(db.DateTime())
	wishlists = db.relationship('Wishlist', backref='User',
		lazy='dynamic')
	tokens = db.relationship('Token', backref='User',
		lazy='dynamic')

	def __init__(self, email, password, first_name, last_name):
		self.email = email
		self.password = password
		self.first_name = first_name
		self.last_name = last_name

	def is_authenticated(self):
		""" Add real logic here """
		return True 

	def is_active(self):
		""" Is active user """
		return True

	def get_id(self):
		try:
			return unicode(self.id) #py2
		except NameError:
			return str(self.id) #py3

	def __repr__(self):
		return {
			'first_name': self.first_name,
			'last_name': self.last_name,
			'email': self.email
		}

class Wishlist(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	description = db.Column(db.String(500))
	created_at = db.Column(db.DateTime())
	modified_at = db.Column(db.DateTime())
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	items = db.relationship('Item', secondary=items,
		backref=db.backref('wishlist', lazy='dynamic'))

	def __init__(self, description, created_at, modified_at):
		self.description = description
		self.created_at = created_at
		self.modified_at = modified_at

	def __repr__(self):
		return {
			'description': self.description,
			'created_at': self.created_at,
			'modified_at': self.modified_at
		}

