from . import db
from sqlalchemy.orm import relationship

class Item(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String(80))
	description = db.Column(db.String(500))
	thumbnail = db.Column(db.String(500))
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

	def __init__(self, name, thumbnail, user_id, description=None):
		self.name = name
		self.description = description
		self.thumbnail = thumbnail
		self.user_id = user_id

	def __repr__(self):
		return '<Item %r>' % (self.name)

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	first_name = db.Column(db.String(80))
	last_name = db.Column(db.String(80))
	email = db.Column(db.String(120), unique=True)
	password = db.Column(db.String(80))
	items = relationship('Item')

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