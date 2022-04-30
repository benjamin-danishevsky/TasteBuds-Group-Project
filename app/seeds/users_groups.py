from app.models import db, users_groups, User

def seed_users_in_groups():
    User.demo.following.append(group1)
    User.demo.following.append(group2)
    User.demo.following.append(group3)

    db.session.add(user_group1)
    db.session.add(user_group2)
    db.session.add(user_group3)
    db.session.add(user_group4)
    db.session.add(user_group5)
    db.session.add(user_group6)
    db.session.add(user_group7)
    db.session.add(user_group8)
    db.session.add(user_group9)

    db.session.commit()

def undo_users_groups():
    db.session.execute('TRUNCATE users_in_groups RESTART IDENTITY CASCADE;')
    db.session.commit()
