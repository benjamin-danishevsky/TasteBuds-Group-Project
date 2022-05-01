from app.models import db, users_events

def seed_users_in_events():
    # pass
    insert1 = users_events.insert().values(user_id=1, event_id=1)
    insert2 = users_events.insert().values(user_id=1, event_id=2)
    insert3 = users_events.insert().values(user_id=1, event_id=3)
    insert4 = users_events.insert().values(user_id=2, event_id=1)
    insert5 = users_events.insert().values(user_id=2, event_id=2)
    insert6 = users_events.insert().values(user_id=2, event_id=3)
    insert7 = users_events.insert().values(user_id=3, event_id=1)
    insert8 = users_events.insert().values(user_id=3, event_id=2)
    insert9 = users_events.insert().values(user_id=3, event_id=3)

    db.session.execute(insert1)
    db.session.execute(insert2)
    db.session.execute(insert3)
    db.session.execute(insert4)
    db.session.execute(insert5)
    db.session.execute(insert6)
    db.session.execute(insert7)
    db.session.execute(insert8)
    db.session.execute(insert9)

    db.session.commit()

def undo_users_events():
    db.session.execute('TRUNCATE users_attending_event RESTART IDENTITY CASCADE;')
    db.session.commit()
