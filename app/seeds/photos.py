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
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='13 Photo', description='This is the 13th photo', user_id=2, album_id=4)
    fourteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='14 Photo', description='This is the 14th photo', user_id=2, album_id=4)
    fifthteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='15 Photo', description='This is the 15th photo', user_id=2, album_id=4)
    sixteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='16 Photo', description='This is the 16th photo', user_id=2, album_id=4)
    seventeenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='17 Photo', description='This is the 17th photo', user_id=2, album_id=5)
    eighteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='18 Photo', description='This is the 18th photo', user_id=2, album_id=5)
    nineteenth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='19 Photo', description='This is the 19th photo', user_id=2, album_id=None)
    twentyeth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='20 Photo', description='This is the 20th photo', user_id=2, album_id=None)
    twentyethfirst_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='21 Photo', description='This is the 21th photo', user_id=2, album_id=None)
    twentyethsecond_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='22 Photo', description='This is the 22th photo', user_id=2, album_id=None)
    twentyeththird_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='23 Photo', description='This is the 23th photo', user_id=2, album_id=None)
    twentyethfourth_photo = Photo(
        image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='24 Photo', description='This is the 24th photo', user_id=2, album_id=None)

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
    db.session.add(thirteenth_photo)
    db.session.add(fourteenth_photo)
    db.session.add(fifthteenth_photo)
    db.session.add(sixteenth_photo)
    db.session.add(seventeenth_photo)
    db.session.add(eighteenth_photo)
    db.session.add(nineteenth_photo)
    db.session.add(twentyeth_photo)
    db.session.add(twentyethfirst_photo)
    db.session.add(twentyethsecond_photo)
    db.session.add(twentyeththird_photo)
    db.session.add(twentyethfourth_photo)

    db.session.commit()

def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
