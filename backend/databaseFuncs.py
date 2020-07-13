import sqlite3
import os
from passlib.hash import sha256_crypt


nameOfDB = 'userDB.db'

def createDB():
	conn = None
	try:
		conn = sqlite3.connect(nameOfDB)
	except Error as e:
		print(e)

def createUserTable():
	conn = sqlite3.connect(nameOfDB)
	c = conn.cursor()
	c.execute('''CREATE TABLE userTable
             (user text, pass text, class text, todo text)''')
	conn.commit()
	conn.close()

def hashPassword(unhashedPassword):
	"""
	 This function hashed the password for the user account
	"""
	password = sha256_crypt.encrypt(unhashedPassword)
	return password

def addUser(username, password, className, todo):
	hashedPassword = hashPassword(password)
	conn = sqlite3.connect(nameOfDB)
	c = conn.cursor()
	c.execute("INSERT INTO userTable VALUES (?,?,?,?)", [username, hashedPassword, className, todo])
	conn.commit()
	conn.close()

def removeUser(username):
	conn = sqlite3.connect(nameOfDB)
	c = conn.cursor()
	try:
		c.execute("DELETE FROM userTable where user = ?", [username])
		conn.commit()
		conn.close()
	except Error as e:
		print(e)

def checkLogin(username, password):
	conn = sqlite3.connect(nameOfDB)
	c = conn.cursor()
	c.execute('SELECT * FROM userTable WHERE user = ?', [username])
	userList = c.fetchall()
	print(username)
	if len(userList) == 0:
		#Username not in database
		conn.commit()
		conn.close()
		return [False, "User Not Found"]
	elif len(userList) > 1:
		#More than database entry with the same username
		conn.commit()
		conn.close()
		return [False, "Multiple Users Found, we need to sort this out"]
	elif sha256_crypt.verify(password, userList[0][1]):
		#Correct Username, Correct Password
		conn.commit()
		conn.close()
		return [True, "IT CHECKS OUT"]
	else:
		#Correct Username, Wrong Password
		conn.commit()
		conn.close()
		return [False, "INCORRECT PASSWORD"]

def findInfoFromUsername(username):
	"""
		This returns the info stored in the datbase about a particular user
			Used mainly in the login function
	"""
	conn = sqlite3.connect(nameOfDB)
	c = conn.cursor()
	c.execute("SELECT * FROM userTable where user = ?", [username])
	rows = c.fetchall()
	positon = ''
	for row in rows:
		info = row
	conn.commit()
	conn.close()
	return info

#print(checkLogin('testStudent', 'etdClassroom'))
