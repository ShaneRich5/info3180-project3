from flask import Flask
# from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='static')

from app import views