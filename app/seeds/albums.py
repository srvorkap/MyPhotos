from app.models import db, Album


def seed_albums():
    first_album = Album(
        title='First Album', description='This is the first album', user_id=1)
    second_album = Album(
        title='Second Album', description='This is the second album', user_id=1)
    third_album = Album(
        title='Third Album', description='This is the third album', user_id=1)

    # first_album.append(first_photo)
    # first_album.append(second_photo)

    db.session.add(first_album)
    db.session.add(second_album)
    db.session.add(third_album)

    db.session.commit()

def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
