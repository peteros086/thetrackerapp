import smtplib
import csv
from string import Template

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.message import EmailMessage

import datetime
from email import encoders
import imaplib
import time


# Returns the Emails that need to be sent
def returnList(person):
    # returns the email for ->person<-
    # TODO: Attach to server with stored info
    subject = 'HELLO DUDE'
    body = getEmailContent(person)
    recipient = 'peteros086@gmail.com'
    return subject, body, recipient

# Set your Email Template here
def getEmailContent(first_name):
    """
        This is currently the email body sent back to the frontend
    """

    email_content ="""
Multispace bro """+first_name+""",



_-_-_-_-_-_-_-_-_
*****************
-_-_-_-_-_-_-_-_-
    """

    return email_content

# Sends an Email
def sendOutlookEmail(username, password, emailOfRecipient, emailBody, subjectLine):
    """
        This function sends the email using the smtplib for python..
        It currently is only working on my gatech email for some reason!!!
    """
    msg = MIMEMultipart()
    # If outlook account use below 
    s = smtplib.SMTP(host='smtp.office365.com', port=587)
    s.starttls()
    s.login(username, password)
    msg['From']=username
    msg['To']=emailOfRecipient
    msg['Subject']=  subjectLine

    msg.attach(MIMEText(emailBody, 'plain'))
    s.send_message(msg)
    s.quit()
    del msg

def gmailEmail(username, password, emailOfRecipient, emailBody, subject):
    """
        This function sends the email using the smtplib for python..
        It currently is only working on my gatech email for some reason!!!
        Will eventually need to add googles oauth2 to send gmails, currently classified as a less secure app
        TO USE:
            Need to turn on 'less secure apps' on your google account for it to work
    """
    msg = EmailMessage()
    msg.set_content(emailBody)
    msg['Subject'] = subject
    msg['From'] = username
    msg['To'] = emailOfRecipient
    s = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    s.login(username, password)
    # This currently sends a message without formatting, but read as text rather than HTML
    # different than the format for the outlook email send, which sends html
    s.send_message(msg)
    s.close()
