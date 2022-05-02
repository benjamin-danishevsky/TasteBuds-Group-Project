from flask import Blueprint, jsonify, session, request
from app.models import Event, User, users_groups, db

events_route = Blueprint('events', __name__)


@events_route.route('/')
def events():
    events = Event.query.all()

    return {
        "events": [event.to_dict() for event in events]
    }

@events_route.route('/<int:id>')
def single_event(id):
    event = Event.query.get(id)
    return {
        "event": event.to_dict()
    }

@events_route.route('/new-event', methods=['GET', 'POST'])
def new_event():
    