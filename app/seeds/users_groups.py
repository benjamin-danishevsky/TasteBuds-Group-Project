from app.models import db, users_groups

def seed_users_in_groups():
    # pass
    insert1 = users_groups.insert().values(user_id=1, group_id=1)
    insert2 = users_groups.insert().values(user_id=1, group_id=2)
    insert3 = users_groups.insert().values(user_id=1, group_id=3)
    insert4 = users_groups.insert().values(user_id=2, group_id=1)
    insert5 = users_groups.insert().values(user_id=2, group_id=2)
    insert6 = users_groups.insert().values(user_id=2, group_id=3)
    insert7 = users_groups.insert().values(user_id=3, group_id=1)
    insert8 = users_groups.insert().values(user_id=3, group_id=2)
    insert9 = users_groups.insert().values(user_id=3, group_id=3)

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

def undo_users_groups():
    db.session.execute('TRUNCATE users_in_groups RESTART IDENTITY CASCADE;')
    db.session.commit()
