import sqlite3
import os

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
	c.execute('''CREATE TABLE users
             (user text, pass text, class text, traits text)''')
	conn.commit()
	conn.close()

def addUser(username, password, className):
	conn = sqlite3.connect(nameOfDB)
	c = conn.cursor()
	c.execute("INSERT INTO users VALUES (?,?,?,?)", [username, password, className, 'None Yet'])
	conn.commit()
	conn.close()

def removeUser(username):
	conn = sqlite3.connect(nameOfDB)
	c = conn.cursor()
	try:
		c.execute("DELETE FROM users where user = ?", [username])
		conn.commit()
		conn.close()
	except Error as e:
		print(e)

def checkLogin(username, password):
	conn = sqlite3.connect(nameOfDB)
	c = conn.cursor()
	c.execute('SELECT * FROM users WHERE user = ?', [username])
	userList = c.fetchall()
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
	elif userList[0][1] == password:
		#Correct Username, Correct Password
		conn.commit()
		conn.close()
		return [True, "IT CHECKS OUT"]
	else:
		#Correct Username, Wrong Password
		conn.commit()
		conn.close()
		return [False, "INCORRECT PASSWORD"]





#addUser('testing', 'database', 'bruh')


