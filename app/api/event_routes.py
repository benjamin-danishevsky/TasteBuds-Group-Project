from flask import Blueprint, jsonify, session, request
from app.models import Event, User, db, users_events
from app.forms import NewEventForm, UpdatedEventForm
from datetime import datetime
from sqlalchemy import delete

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

@events_route.route('/<int:id>', methods=['DELETE'])
def delete_event(id):
    deleted_event = Event.query.get(id)
    db.session.delete(deleted_event)
    db.session.commit()
    return deleted_event.to_dict()

@events_route.route('/<int:id>/update', methods=['POST'])
def update_event(id):
    current_event = Event.query.get(id)
    form = UpdatedEventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        data = form.data

        current_event.title = data["title"]
        current_event.description = data["description"]
        current_event.date = data["date"]
        current_event.location = data["location"]
        current_event.background_img = data["background_img"]
        current_event.updated_at = datetime.now()

        db.session.commit()

        return current_event.to_dict()

    return form.errors

@events_route.route('/<int:id>/join', methods=['POST', 'DELETE', 'GET'])
def attending_event(id):

    if request.method == 'GET':
        event = Event.query.get(id)
        users = event.users.all()
        return {
            "users": [user.to_dict() for user in users]
        }
    if request.method == 'POST':
        info = request.json # {'user_id': '1', 'event_id': '3'}
        insert1 = users_events.insert().values(user_id=info['user_id'], event_id=info['event_id'])
        db.session.execute(insert1)
        db.session.commit()
        return info

    if request.method == 'DELETE':
        delete_info = request.json # {'user_id': '1', 'event_id': '3'}
        print(users_events.metadata, '-----'*50)
        # deletion = (delete(users_events).where(users_events.user_id==delete_info['user_id']).where(users_events.event_id==delete_info['event_id']))
        # db.session.execute(deletion)
        # db.session.commit()
        return delete_info

# @events_route.route('/new-event', methods=['GET', 'POST'])
# def new_event():
#     form = NewEventForm()

#     if form.validate_on_submit():
#         data = form.data
#         event = Event(
#                       title=data['title'],
#                       description=data['description'],
#                       location=data['location'],
#                       date=data['date'],
#                       background_img=data['background_img'],
#                       created_at=datetime.now(),
#                       updated_at=datetime.now(),
#                       owner_id=data['owner_id'],
#                       group_id=data['group_id']
#                     )
#         db.session.add(event)
#         db.session.commit()
#         return 'Success'

#     return form.errors


"""
[ 'add_is_dependent_on', 'alias', 'allows_lambda', 'append_column',
'append_constraint', 'argument_for', 'bind', 'c', 'columns', 'comment', 'compare', 'compile', 'constraints', 'corresponding_column',
'create', 'create_drop_stringify_dialect', 'delete', 'description', 'dialect_kwargs', 'dialect_options',
'dispatch', 'drop', 'entity_namespace', 'exists', 'exported_columns', 'foreign_key_constraints', 'foreign_keys',
'fullname', 'get_children', 'implicit_returning', 'indexes', 'info', 'insert', 'is_clause_element', 'is_derived_from',
'is_selectable', 'join', 'key', 'kwargs', 'lateral', 'memoized_attribute', 'memoized_instancemethod', 'metadata', 'name',
'named_with_column', 'outerjoin', 'params', 'primary_key', 'replace_selectable', 'schema', 'select', 'selectable',
'self_group', 'stringify_dialect', 'supports_execution', 'table_valued', 'tablesample', 'to_metadata', 'tometadata',
'unique_params', 'update', 'uses_inspection']

"""
