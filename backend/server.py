from flask import Flask, jsonify, request, send_from_directory, redirect, url_for
import os
from flask_cors import CORS
import flask_login
import databaseFuncs
import emailFuncs
from user import User

# Define where flask will load the react files from
app = Flask(__name__, static_folder='./templates/build/static',
            template_folder='./templates')

app.secret_key = 'super secret string' #CHANGE THIS SOON!!
CORS(app)

# Define the login manager
login_manager = flask_login.LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def user_loader(user_id):
	print('::::::')
	print(user_id)
	info = databaseFuncs.findInfoFromUsername(user_id)
	user = User()
	user.id = user_id
	#user.position = info[1]
	#user.name = info[0]
	print('LOGGED IN {}'.format(user_id))
	return user

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
	# This function serves the react front end
    if path != "" and os.path.exists('./templates/build' + path):
        return send_from_directory('./templates/build', path)
    else:
        return send_from_directory('./templates/build', 'index.html')

@app.route('/login', methods=['POST'])
def recordLogin():
	# This functin logs the user in
	cUser = request.json['username']
	cPass = request.json['password']
	result = databaseFuncs.checkLogin(cUser, cPass)
	#loginStatus is True if correct, False if not
	loginStatus = result[0]
	print(result)
	if result[0]:
		user = User()
		user.id = cUser
		print('.............')
		flask_login.login_user(user, remember=True)
		return redirect(url_for('protected'))
	else:
		return jsonify({'ID': None, 'AUTH': flask_login.current_user.is_authenticated})

@app.route('/logout', methods=['POST'])
def logout():
	# This function logs the user out
	if request.json['command'] == 'logout':
		flask_login.logout_user()
		authStatus = flask_login.current_user.is_authenticated
		#authStatus should be False after logout occurs
		print(authStatus)
		httpResponse = jsonify({'ID': None, 'AUTH': authStatus})
		return httpResponse
	else: 
		return 'an error occured'

@app.route('/returnEmails', methods=['POST'])
def returnEmails():
	# This function returns the list of emails that the user is supposed to send
	# Get the username of the user TODO: Update to meta info from login
	user = request.json['username']
	# Get the email list from the database
	subject, body, target = emailFuncs.returnList(user)
	# Return the email
	serverResponse = jsonify({'subject':subject, 'body': body, 'recipient': target})
	return serverResponse

@app.route('/sendEmail', methods=['POST'])
def sendEmail():
	# This function sends an email from the user to the recipient
	# It is called from the front end when sending the email back to the server
	if request.json['command'] == 'send':
		# Get the email info from the http request
		emailUsername = request.json['user']
		emailPassword = request.json['pwd']
		emailSubject = request.json['subject']
		emailBody = request.json['body']
		emailRecipient = request.json['recipient']
		[temp, emailProvider] = emailUsername.split('@')
		# Try to send the email, return the error if unsuccessful
		try:
			if emailProvider == 'gmail.com':
				emailFuncs.gmailEmail(emailUsername, emailPassword, emailRecipient, emailBody, emailSubject)
			else:
				emailFuncs.sendOutlookEmail(emailUsername, emailPassword, emailRecipient, emailBody, emailSubject)
			status = 'SENT'
			httpResponse = jsonify({'Status': "SUCCESS", 'DETAILS': 'sent!'})			
		except Exception as e:
			print("type error: " + str(e))
			httpResponse = jsonify({'Status': "ERROR", 'DETAILS': str(e)})
		return httpResponse
	else: 
		return 'an error occured'



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
	#print(flask_login.current_user.is_authenticated)
	#print('$$$$$$$$$$$$$')
	httpResponse = jsonify({'ID': 'tempID', 'AUTH': True})
	return httpResponse
#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
"""

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)


