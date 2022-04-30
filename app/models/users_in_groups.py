from .db import db

# class UsersGroups(db.Model):
#     __tablename__='users_in_groups'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
#     group_id=db.Column(db.Integer, db.ForeignKey('groups.id'))


users_groups = db.Table(
    'users_in_groups',

    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey('users.id')
        # primary_key=True
    ),

    db.Column(
        'group_id',
        db.Integer,
        db.ForeignKey('groups.id')
    )
)
