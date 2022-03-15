from app.models import db, Photo


def seed_photos():
    first_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='First Photo', description='This is the first photo', user_id=1, album_id=1)
    second_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='Second Photo', description='This is the second photo', user_id=1, album_id=1)
    third_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='Third Photo', description='This is the third photo', user_id=1, album_id=1)
    fourth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='Fourth Photo', description='This is the fourth photo', user_id=1, album_id=2)
    fifth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='Fifth Photo', description='This is the fifth photo', user_id=1, album_id=2)
    sixth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='Sixth Photo', description='This is the sixth photo', user_id=1, album_id=2)

    db.session.add(first_photo)
    db.session.add(second_photo)
    db.session.add(third_photo)
    db.session.add(fourth_photo)
    db.session.add(fifth_photo)
    db.session.add(sixth_photo)

    db.session.commit()

def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
