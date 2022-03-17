from app.models import db, Album


def seed_albums():
    first_album = Album(
        title='First Album', description='This is the first album', user_id=1)
    second_album = Album(
        title='Second Album', description='This is the second album', user_id=1)
    third_album = Album(
        title='Third Album', description='This is the third album', user_id=1)
    fourth_album = Album(
        title='Fourth Album', description='This is the fourth album', user_id=2)
    fifth_album = Album(
        title='Fifth Album', description='This is the fifth album', user_id=2)
    sixth_album = Album(
        title='Sixth Album', description='This is the sixth album', user_id=3)

    # first_album.append(first_photo)
    # first_album.append(second_photo)

    db.session.add(first_album)
    db.session.add(second_album)
    db.session.add(third_album)
    db.session.add(fourth_album)
    db.session.add(fifth_album)
    db.session.add(sixth_album)

    db.session.commit()

def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
