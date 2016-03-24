from . import db

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	first_name = db.Column(db.String(80))
	last_name = db.Column(db.String(80))
	email = db.Column(db.String(30))
	password = db.Column(db.String(80))

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
		return '<User %r %r>' % (self.first_name, self.last_name)