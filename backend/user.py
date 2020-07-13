import flask_login


"""
    From this link:
    https://stackoverflow.com/questions/10695093/how-to-implement-user-loader-callback-in-flask-login
"""

class User(flask_login.UserMixin):
    """
        Flask-login user class.
    """

    def __init__(self):
        self.id = None
        self.position = None
        self.name = None
        self._is_authenticated = True
        self._is_active = True
        self._is_anoymous = False

    @property
    def is_authenticated(self):
        return self._is_authenticated

    @is_authenticated.setter
    def is_authenticated(self, val):
        self._is_authenticated = val

    @property
    def is_active(self):
        return self._is_active

    @is_active.setter
    def is_active(self, val):
        self._is_active = val

    @property
    def is_anoymous(self):
        return self._is_anoymous

    @is_anoymous.setter
    def is_anoymous(self, val):
        self._is_anoymous = val