from .db import db
from .users_attending_event import users_events

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    background_img= db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)

    events = db.relationship('Group', back_populates='groups', cascade="all, delete")


    users = db.relationship(
        "User",
        secondary=users_events,
        back_populates='events',
        cascade="all, delete"
    )
    owner = db.relationship(
        "User",
        back_populates='event',
        cascade="all, delete"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'date': self.date,
            'background_img': self.background_img,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
