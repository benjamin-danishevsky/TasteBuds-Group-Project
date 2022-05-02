from flask import Blueprint, jsonify, session, request
from app.models import Event, db

events_route = Blueprint('events', __name__)


@events_route.route('/')
def events():
    events = Event.query.all()

    return {
        "events": [event.to_dict() for event in events]
    }
