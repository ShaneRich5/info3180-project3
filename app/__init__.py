from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='static')

app.config['SECRET_KEY'] = "changeme"
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/wishlist'

db = SQLAlchemy(app)

from app import views, models