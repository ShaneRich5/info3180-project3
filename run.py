from flask import Flask 
app = Flask(__name__)

@app.route('/')
@app.route('/helloworld')
def hello_world():
	return "Hello World"

@app.route('/home')
def 

if __name__ == '__main__':
	app.run(
		host='0.0.0.0',
		debug=True,
		port=5000
		)