from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    print(user)
    return user.to_dict()


@user_routes.route('/<int:id>/join')
def get_events_for_user(id):
    user = User.query.get(id)
    events = user.events
    return {
        "events": [event.to_dict() for event in events]
    }


@user_routes.route('/<int:id>/calendar', methods=['POST'])
def filter_events(id):
    print('IN THE ROUTE')
    user = User.query.get(id)
    events = user.events

    res = request.json

    print(events, 'events \n')

    eventList = []

    element = res['datetime']

    date = element.split()[0]

    print(date, "\n")


    for event in events:
        if str(event.date).split()[0] == str(date):
            eventList.append(event)
    if len(eventList):
        return {"event": [event.to_dict() for event in eventList]}
    elif str(date) == ':00':
        return {
            "event": [event.to_dict() for event in events]
        }
    else:
        return {}


@user_routes.route('/<int:id>/groups')
def user_groups(id):
    user = User.query.get(id)
    groups = user.group

    print(groups, '<-- \n')
    return {
        "groups": [group.to_dict() for group in groups]
    }
