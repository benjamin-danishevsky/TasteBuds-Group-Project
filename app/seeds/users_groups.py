from app.models import db, UsersGroups

def seed_users_in_groups():
    user_group1 = UsersGroups(
        user_id=1,
        group_id=1
    )
    user_group2 = UsersGroups(
        user_id=1,
        group_id=2
    )
    user_group3 = UsersGroups(
        user_id=1,
        group_id=3
    )
    user_group4 = UsersGroups(
        user_id=2,
        group_id=1
    )
    user_group5 = UsersGroups(
        user_id=2,
        group_id=2
    )
    user_group6 = UsersGroups(
        user_id=2,
        group_id=3
    )
    user_group7 = UsersGroups(
        user_id=3,
        group_id=1
    )
    user_group8 = UsersGroups(
        user_id=3,
        group_id=2
    )
    user_group9 = UsersGroups(
        user_id=3,
        group_id=3
    )

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
