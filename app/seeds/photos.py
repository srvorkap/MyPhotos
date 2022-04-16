from app.models import db, Photo


def seed_photos():
    sixth_photo = Photo(
        image_url='https://i.postimg.cc/wB6DRCXB/lesi.jpg', title='Rough Collie', description="Rough collie Honey Pina's Becky The Dragoness 'Likka'", user_id=1)
    seventh_photo = Photo(
        image_url='https://i.postimg.cc/7P0H2fmK/coffee.jpg', title='Cup of coffee', description='', user_id=1)
    eighth_photo = Photo(
        image_url='https://i.postimg.cc/RhpL94q8/cats.jpg', title='Kittens', description='First outdoor day.', user_id=2)
    ninth_photo = Photo(
        image_url='https://i.postimg.cc/3JygmMk8/empire.jpg', title='Empire State Building', description='Empire State Building during a warm summer morning in New York City', user_id=2)

    thirteenth_photo = Photo(
        image_url='https://i.postimg.cc/JnNPJf0Y/Los-Angeles-sunset-field.jpg', title='Los Angeles sunset field', description=None, user_id=2)
    fourteenth_photo = Photo(
        image_url='https://i.postimg.cc/ZYMzq3k9/Waterfall-in-Telluride.jpg', title='Waterfall in Telluride', description=None, user_id=2)
    fifthteenth_photo = Photo(
        image_url='https://i.postimg.cc/gjCYLL7P/Sandstone-cliff-with-a-waterfall.jpg', title='Sandstone cliff', description='Sandstone cliff with a waterfall', user_id=2)
    sixteenth_photo = Photo(
        image_url='https://i.postimg.cc/9Fy4tcYB/Lake-Louise-landscape.jpg', title='Lake Louise landscape', description=None, user_id=2)
    seventeenth_photo = Photo(
        image_url='https://i.postimg.cc/h45834xW/Old-Trafford.jpg', title='Old Trafford', description=None, user_id=3)
    eighteenth_photo = Photo(
        image_url='https://i.postimg.cc/cJP8Zh7s/Wolf.jpg', title='Wolf', description='Amazing encounter with grey wolves in the midst of winter in Canada - Montreal. Shot on', user_id=3)
    nineteenth_photo = Photo(
        image_url='https://i.postimg.cc/W4Dcg6Bq/Drift-taxi-show.jpg', title='Drift taxi show', description=None, user_id=3)
    twentyeth_photo = Photo(
        image_url='https://i.postimg.cc/kMsYMRH0/racing.jpg', title='Racing', description='ERA Championship testdays at Circuit Zolder in Belgium.', user_id=3)
    twentyethfirst_photo = Photo(
        image_url='https://i.postimg.cc/HLWCn12z/huskyone.jpg', title='Husky sitting', description='Traveling husky sitting on a porch with bent paws and looking back with beautiful blue eyes.', user_id=4)
    twentyethsecond_photo = Photo(
        image_url='https://i.postimg.cc/K8v9gG61/laying.jpg', title='Husky laying', description='Husky pup in the mountains of Tennessee laying on a porch with an old milk jug next to him.', user_id=4)
    twentyeththird_photo = Photo(
        image_url='https://i.postimg.cc/G2k9RChQ/sleeping-cat.jpg', title='Sleeping cat', description='Cat sleeping on a chair with a cushion in a cabin in the woods snoozing away.', user_id=4)
    twentyethfourth_photo = Photo(
        image_url='https://i.postimg.cc/C5ztDFBC/camera.jpg', title='Camera', description='Man reviewing footage on the black magic pocket cinema camera 6K of a woman reviewing an image taken on her camera.', user_id=4)


    # twentyethfifth_photo = Photo(
    #     image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='24 Photo', description='This is the 24th photo', user_id=2, album_id=None)




    db.session.add(twentyethsecond_photo)
    # first_photo.albums.append(first_album)
    # db.session.add(first_photo)
    # db.session.add(second_photo)

    # db.session.add(third_photo)
    # db.session.add(fourth_photo)
    # db.session.add(fifth_photo)
    db.session.add(sixth_photo)
    # db.session.add(seventh_photo)
    db.session.add(eighth_photo)

    # db.session.add(tenth_photo)
    # db.session.add(eleventh_photo)
    # db.session.add(twelfth_photo)
    db.session.add(thirteenth_photo)
    db.session.add(fourteenth_photo)
    db.session.add(nineteenth_photo)

    db.session.add(sixteenth_photo)
    db.session.add(seventeenth_photo)
    db.session.add(eighteenth_photo)
    db.session.add(fifthteenth_photo)
    db.session.add(twentyeth_photo)
    db.session.add(twentyethfirst_photo)
    db.session.add(ninth_photo)
    db.session.add(twentyeththird_photo)
    db.session.add(twentyethfourth_photo)
    # db.session.add(twentyethfifth_photo)

    db.session.commit()

def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
