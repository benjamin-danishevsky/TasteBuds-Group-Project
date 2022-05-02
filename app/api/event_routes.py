from flask import Blueprint, jsonify, session, request
from app.models import Event, db

events_route = Blueprint('events', __name__)


@events_route.route('/')
def events():
    events = Event.query.all()
    print('Events => ', events)
    # Events =>  [<Event 1>, <Event 2>, <Event 3>, <Event 4>]
    # print('Event 1', events[0].to_dict())
    return "test"
    return {
        "events": [event.to_dict() for event in events]
    }
