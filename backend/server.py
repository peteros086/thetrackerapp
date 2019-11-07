from flask import Flask, jsonify, request, send_from_directory, redirect, url_for
import os
from flask_cors import CORS
import flask_login
import databaseFuncs
import infoFuncs

app = Flask(__name__, static_folder='./templates/build/static',
            template_folder='./templates')
app.secret_key = 'super secret string' #CHANGE THIS SOON!!
CORS(app)

login_manager = flask_login.LoginManager()
login_manager.init_app(app)

users = {'asdf': {'password': 'secret'}}

class User(flask_login.UserMixin):
    pass


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
	print(request.remote_addr)
	print(request.json)
	print(request.json['traitList'])
	if request.json['command'] == 'giveMeInfo':
		traitList = request.json['traitList']
		httpResponse = jsonify(infoFuncs.returnSelectedTraits(traitList))
		return httpResponse
	badResponse = jsonify({'ERROR':'SOMETHING BAD HAPPENED'})
	return badResponse






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
"""

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)


