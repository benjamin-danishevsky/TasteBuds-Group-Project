from app.models import db, Group

def seed_groups():
    group1 = Group(
        name='Pho King',
        description='Pho lovers looking for places to try pho',
        background_img='https://www.simplyrecipes.com/thmb/NOwXpq1nenarGiJnOTV7o5Oe_Aw=/1777x1333/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__04__Beef-Pho-LEAD-2-afc6b6a9144947fb9d72070d7ea8c95c.jpg',
        city='Los Angeles',
        state='CA',
        owner_id=1
    )

    group2 = Group(
        name='Mandarin Mauraders',
        description='Chinese food enjoyers, looking to find new places to eat chinese food',
        background_img='https://avatars.githubusercontent.com/u/94093737?v=4',
        city='Dayton',
        state='OH',
        owner_id=2
    )

    group3 = Group (
        name='Hawaiian Potluck',
        description='Aloha! Join us for delicious Hawaiian meals',
        background_img='https://www.nerdwallet.com/assets/blog/wp-content/uploads/2020/01/featured-earn-hawaiian-1440x864.jpg',
        city='Honolulu',
        state='HI',
        owner_id=3
    )

    group4 = Group(
        name='Medium Rare Lovers',
        description='A group for steak lovers of all kinds',
        background_img='https://www.tasteofhome.com/wp-content/uploads/2019/01/medium-rare-steak-shutterstock_706040446.jpg',
        city='New York',
        state='NY',
        owner_id=1
    )

    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)
    db.session.add(group4)

    db.session.commit()

def undo_groups():
    db.session.execute('TRUNCATE groups RESTART IDENTITY CASCADE;')
    db.session.commit()
