from app.models import db, Photo


def seed_photos():
    first_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='1 Photo', description='This is the 1st photo', user_id=1, album_id=1)
    second_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='2 Photo', description='This is the 2nd photo', user_id=1, album_id=1)
    third_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='3 Photo', description='This is the 3rd photo', user_id=1, album_id=1)
    fourth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='4 Photo', description='This is the 4th photo', user_id=1, album_id=1)
    fifth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='5 Photo', description='This is the 5th photo', user_id=1, album_id=1)
    sixth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='6 Photo', description='This is the 6th photo', user_id=1, album_id=1)
    seventh_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='7 Photo', description='This is the 7th photo', user_id=1, album_id=1)
    eighth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='8 Photo', description='This is the 8th photo', user_id=1, album_id=1)
    ninth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='9 Photo', description='This is the 9th photo', user_id=1, album_id=1)
    tenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='10 Photo', description='This is the 10th photo', user_id=1, album_id=2)
    eleventh_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='11 Photo', description='This is the 11th photo', user_id=1, album_id=2)
    twelfth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='12 Photo', description='This is the 12th photo', user_id=1, album_id=2)
    thirteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='1 Photo', description='This is the 1st photo', user_id=2, album_id=3)
    fourteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='2 Photo', description='This is the 2nd photo', user_id=2, album_id=3)
    fifthteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='3 Photo', description='This is the 3rd photo', user_id=2, album_id=3)
    sixteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='4 Photo', description='This is the 4th photo', user_id=2, album_id=3)
    seventeenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='5 Photo', description='This is the 5th photo', user_id=2, album_id=3)
    eighteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='6 Photo', description='This is the 6th photo', user_id=2, album_id=3)
    nineteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='11 Photo', description='This is the 11th photo', user_id=2, album_id=3)
    twentyeth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='7 Photo', description='This is the 7th photo', user_id=2, album_id=3)
    twentyethfirst_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='8 Photo', description='This is the 8th photo', user_id=2, album_id=3)
    twentyethsecond_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='9 Photo', description='This is the 9th photo', user_id=2, album_id=3)
    twentyeththird_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='10 Photo', description='This is the 10th photo', user_id=2, album_id=3)
    twentyethfourth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='12 Photo', description='This is the 12th photo', user_id=2, album_id=3)

    db.session.add(first_photo)
    db.session.add(second_photo)
    db.session.add(third_photo)
    db.session.add(fourth_photo)
    db.session.add(fifth_photo)
    db.session.add(sixth_photo)
    db.session.add(seventh_photo)
    db.session.add(eighth_photo)
    db.session.add(ninth_photo)
    db.session.add(tenth_photo)
    db.session.add(eleventh_photo)
    db.session.add(twelfth_photo)

    db.session.commit()

def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
