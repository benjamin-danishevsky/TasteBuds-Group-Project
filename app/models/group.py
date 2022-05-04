from .db import db
from .users_in_groups import users_groups

class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    background_img = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)

    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner = db.relationship("User", back_populates='groups')
    groups = db.relationship('Event', back_populates='events', cascade="all, delete-orphan")

    users = db.relationship(
        "User",
        secondary=users_groups,
        back_populates='group'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'background_img': self.background_img,
            'city': self.city,
            'state': self.state,
            'owner_id':self.owner_id
        }
