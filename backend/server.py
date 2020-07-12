from flask import Flask, jsonify, request, send_from_directory, redirect, url_for, Response
import os
from flask_cors import CORS
import flask_login
import databaseFuncs
#import infoFuncs
from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId


app = Flask(__name__, static_folder='./templates/build/static',
            template_folder='./templates')
app.secret_key = 'super secret string' #CHANGE THIS SOON!!
CORS(app)

login_manager = flask_login.LoginManager()
login_manager.init_app(app)

users = {'asdf': {'password': 'secret'}}

class User(flask_login.UserMixin):
    pass

#MongoDB Setup with mongo-flask bullshit, don't use
#app.config["MONGO_URI"] = "mongodb://localhost:27017/test"
#mongo = PyMongo(app)
client = MongoClient('localhost', 27017)
db = client['test']


@login_manager.user_loader
def user_loader(email):
    user = User()
    user.id = email
    return user

# Serve React App

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists('./templates/build' + path):
        return send_from_directory('./templates/build', path)
    else:
        return send_from_directory('./templates/build', 'index.html')

@app.route('/login', methods=['POST'])
def recordLogin():
	cUser = request.json['username']
	cPass = request.json['password']
	result = databaseFuncs.checkLogin(cUser, cPass)
	#loginStatus is True if correct, False if not
	loginStatus = result[0]
	print(result)
	print(result[0])
	if result[0]:
		user = User()
		user.id = cUser
		flask_login.login_user(user)
		return redirect(url_for('protected'))
	else:
		return jsonify({'ID': None, 'AUTH': flask_login.current_user.is_authenticated})

@app.route('/logout', methods=['POST'])
def logout():
	if request.json['command'] == 'logout':
		flask_login.logout_user()
		authStatus = flask_login.current_user.is_authenticated
		#authStatus should be False after logout occurs
		print(authStatus)
		httpResponse = jsonify({'ID': None, 'AUTH': authStatus})
		return httpResponse
	else:
		return 'an error occured'



@app.route('/returnTraits', methods=['POST'])
def returnTraits():
	#print(request.remote_addr)
	#print(request.json)
	traitList = request.json['traitList']
	try:
		currrentUsername = str(flask_login.current_user.id)
		print(currrentUsername)
		print('>>>>>>>>>>>>')
		databaseFuncs.updateTraits(currrentUsername, traitList)
	except Exception as e:
		print(e)
	if request.json['command'] == 'giveMeInfo':
		traitList = request.json['traitList']
		return jsonify({'TRAIT FUNCTION REPLACED!!!!'})
	badResponse = jsonify({'ERROR':'SOMETHING BAD HAPPENED'})
	return badResponse

#Functions that build out the database with Mongo

'''
@app.route('/add-person', methods=['POST'])
def addPerson():
	collection = db['people']
	post_id = collection.insert_one(request.json).inserted_id
	return dumps(post_id)

@app.route('/add-dpi', methods=['POST'])
def addDpi():
	collection = db['dpis']
	post_id = collection.insert_one(request.json).inserted_id
	return dumps(post_id)

	'''

@app.route('/get-<item>', methods=['GET'])
def getThings(item=None):
	collection = db[item]
	r = Response(response = dumps(collection.find()), mimetype="application/json")
	return r

@app.route('/add-<item>', methods=['POST'])
def addThing(item=None):
	collection = db[item]
	#Returns the id of the added item
	postId = collection.insert_one(request.json).inserted_id
	r = Response(response = dumps(postId), mimetype="application/json")
	return r

@app.route('/remove-<item>', methods=['DELETE'])
def removeThing(item=None):
	collection = db[item]
	if (request.args.get('_id') != None):
		args = {'_id': ObjectId(request.args.get('_id'))}
	else:
		args = request.args
	item = collection.find_one_and_delete(args)
	r = Response(response = dumps(item), mimetype="application/json")
	return r








"""
#____________________________________________
#USE THE BELOW VERSION OF '/protected' ROUTE WHEN DONE MAKING FRONT END CHANGES
#E.G. npm run build -> scp -r build /path/to/backed/templates -> python3 server.py
@app.route('/protected')
@flask_login.login_required
def protected():
	print(flask_login.current_user.is_authenticated)
	httpResponse = jsonify({'ID':flask_login.current_user.id, 'AUTH': flask_login.current_user.is_authenticated})
	return httpResponse
#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
"""


#____________________________________________
#USE THIS VERSION OF '/protected' ROUTE IF RUNNING THE FRONT END SEPERAELY FROM REACT
#E.G. npm run <------ while in front end folder
@app.route('/protected')
def protected():
	print(flask_login.current_user.is_authenticated)
	print('$$$$$$$$$$$$$')
	httpResponse = jsonify({'ID': 'tempID', 'AUTH': True})
	return httpResponse
#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)


