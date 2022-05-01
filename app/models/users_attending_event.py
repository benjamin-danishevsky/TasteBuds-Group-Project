from .db import db

users_events = db.Table(
    'users_attending_event',

    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey('users.id'),
        primary_key=True
    ),

    db.Column(
        'event_id',
        db.Integer,
        db.ForeignKey('events.id'),
        primary_key=True
    )
)
