from flask.cli import AppGroup
from .users import seed_users, undo_users
from .groups import seed_groups, undo_groups
from .events import seed_events, undo_events
from .users_groups import seed_users_in_groups, undo_users_groups
from .users_events import seed_users_in_events, undo_users_events
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_groups()
    seed_events()
    seed_users_in_groups()
    seed_users_in_events()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_groups()
    undo_events()
    undo_users_groups()
    undo_users_events()
    # Add other undo functions here
