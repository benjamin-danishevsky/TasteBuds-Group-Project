from .db import db
from .users_in_groups import users_groups
from .users_attending_event import users_events
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String, nullable=True)

    groups = db.relationship('Group', back_populates='owner')

    group = db.relationship(
        'Group',
        secondary=users_groups,
        back_populates='users'
    )

    events = db.relationship(
        'Event',
        secondary=users_events,
        back_populates='users'
    )

    event = db.relationship(
        'Event',
        back_populates='owner'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
