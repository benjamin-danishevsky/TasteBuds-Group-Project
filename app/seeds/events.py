from app.models import db, Event
import datetime

def seed_events():
    event1 = Event(
        title='Pho Restraunt Grand Opening',
        description='Looking for people to join me with trying out the new Pho Restraunt',
        location='1 Dayton Street',
        date= datetime.datetime(2022, 5, 10, 13),
        background_img = 'https://torontogold.com/wp-content/uploads/2018/04/Pho-King.jpg',
        created_at= datetime.datetime.today(),
        updated_at= datetime.datetime.today(),
        group_id=1
    )

    event2 = Event(
        title='Daytons Gourmet Chinese Cuisine Grand Opening',
        description='Trying out the wontons and bamboo here',
        location='2 Dayton Street',
        date = datetime.datetime(2022, 5, 14, 16),
        background_img='https://woodlandfoods.com/img/WF_Images/m37-bamboo-mushroom-wontons-1.jpg',
        created_at = datetime.datetime.today(),
        updated_at = datetime.datetime.today(),
        group_id=2
    )

    event3 = Event(
        title='Big Island BBQ',
        description='Join us for a big BBQ on the Big Island',
        date = datetime.datetime(2022, 5, 16, 12),
        location= '3 Dayton Street',
        background_img='https://cdn.vox-cdn.com/thumbor/UYfpXxYnpXfuo4z_U6F-sSykt64=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13743816/photo_w7.jpg',
        created_at = datetime.datetime.today(),
        updated_at = datetime.datetime.today(),
        group_id=3
    )

    event4 = Event(
        title='Steak Eating Contest',
        description='This might be a misteak (haha), but you can join us for a steak eating contest, whoever can eat the most steak in 1 hour wins 500 USD',
        date = datetime.datetime(2022, 5, 18, 15),
        location= '3 Dayton Street',
        background_img='https://www.mashed.com/img/gallery/the-real-reason-steakhouses-never-use-frozen-steak/intro-1603649181.jpg',
        created_at=datetime.datetime.today(),
        updated_at=datetime.datetime.today(),
        group_id=4
    )

    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.add(event4)

    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
