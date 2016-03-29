from flask.ext.wtf import Form
from wtforms.fields import TextField, TextAreaField
from wtforms.validators import Required, Email

class RegisterForm(Form):
	first_name = TextField('first_name', validators=[Required()])
	last_name = TextField('last_name', validators=[Required()])
	email = TextField('email', validators=[Required(), Email()])
	password = TextField('password', validators=[Required()])
	confirm = TextField('confirm', validators=[Required()])

class LoginForm(Form):
	email = TextField('email', validators=[Required(), Email()])
	password = TextField('password', validators=[Required()])

class WishlistForm(Form):
	name = TextField('name', validators=[Required()])
	description = TextAreaField('description')

class ItemForm(Form):
	name = TextField('name', validators=[Required()])
	description = TextAreaField('description')