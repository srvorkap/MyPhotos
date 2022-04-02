from app.models import db, Album


def seed_albums():
    first_album = Album(
        title='My first album', description=None, user_id=1)
    second_album = Album(
        title='Travel', description='Images from my trip to Europe', user_id=1)
    # third_album = Album(
    #     title='Cars', description=None, user_id=1)
    fourth_album = Album(
        title='My first album', description=None, user_id=2)
    fifth_album = Album(
        title='Nature', description='Images of nature', user_id=2)
    sixth_album = Album(
        title='My first album', description=None, user_id=3)
    seventh_album = Album(
        title='My first album', description=None, user_id=4)

    # first_album.append(first_photo)
    # first_album.append(second_photo)

    db.session.add(first_album)
    db.session.add(second_album)
    # db.session.add(third_album)
    db.session.add(fourth_album)
    db.session.add(fifth_album)
    db.session.add(sixth_album)
    db.session.add(seventh_album)

    db.session.commit()

def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
