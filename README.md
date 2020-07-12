# DPI Tracker Site

Here is the new repo

## Frontend

Written in React with react-bootstrap.  I used a creative-tim template.

To run, go to the folder and type the command

`
npm start
`

The login info is sent through slack.  To

When finished making changes to the front end, create a build and move it to the 'templates' folder in the backend by using the following commands:

`
npm run build
scp -r build ../../backend/templates
`

## Backend

Python and Flask (the dream team).  Hosted on AWS using my personal account.  I am paying for it now using my debit card, but that should change if the website gets actual use.

To run the backend, use the following command:

`
python3 server.py
`

## Backend

######Generic get-<item> route
    The get-<item> route is very general and can be used for accessing the Mongo database. Takes a GET request. Returns JSON data. Possible items include:
    - people
    - dpis
    An example might include: `http://127.0.0.1:5000/get-people`