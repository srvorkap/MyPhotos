from app.models import db, Album
from app.models import db, Photo


def seed_albums():
    first_album = Album(
        title='My first album', description=None, user_id=1)
    second_album = Album(
        title='Travel', description='Images from my trip to Europe', user_id=1)
    third_album = Album(
        title='Formula One', description=None, user_id=1)


    first_photo = Photo(
        image_url='http://3.bp.blogspot.com/-gR-kO2fy1sU/U7_tUMvTKyI/AAAAAAAAAos/C88KGJmzM8U/s1600/2508695615_7361d11105_o.jpg', title='Banksy Cleans Up', description='The latest work by mysterious street artist Banksy revealed at Leake Street, London this weekend. See the Banksy tag bottom right of the cave.', user_id=1)
    second_photo = Photo(
        image_url='https://i.postimg.cc/Hn0hs4Y8/bike.jpg', title='Desert quad bike ride', description=None, user_id=1)
    third_photo = Photo(
        image_url='https://i.postimg.cc/Hs4FwXVq/street-3293556-1920.jpg', title='Belgrade', description=None, user_id=1)
    fourth_photo = Photo(
        image_url='https://i.postimg.cc/D0vtGX4J/berlin.jpg', title='Berlin', description=None, user_id=1)
    fifth_photo = Photo(
        image_url='https://i.postimg.cc/N0MF6pZY/madrid.jpg', title='Madrid', description='Retiro Park or simply El Retiro is one of the largest parks of the city of Madrid, Spain. The park belonged to the Spanish Monarchy until the late 19th century, when it became a public park.', user_id=1)
    # tenth_photo = Photo(
    #     image_url='https://i.postimg.cc/ZR7wYrMV/Maldives.jpg', title='Maldives', description=None, user_id=1)
    # eleventh_photo = Photo(
    #     image_url='https://i.postimg.cc/HxMX7XZp/tree.jpg', title='Tree', description='This is the first photo I am uploading to MyPhotos - I have been taking photos actively for the last 15 years', user_id=1)
    # twelfth_photo = Photo(
    #     image_url='https://i.postimg.cc/9Q2XYTLx/The-Island.jpg', title='The Island', description=None, user_id=1)
    tenth_photo = Photo(
        image_url='https://i.postimg.cc/pX3d630V/tim-carey-Qh-K-ag-WFAs-E-unsplash.jpg', title='Kimi Räikkönen', description='Driving the 2017 Scuderia Ferrari around the Silverstone racetrack in the UK during the 2017 British Grand Prix.', user_id=1)
    eleventh_photo = Photo(
        image_url='https://i.postimg.cc/5yFhYK8p/tim-carey-o9-FAllru-DN0-unsplash.jpg', title='Fernando Alonso', description='In the McLaren, 2017 British Grand Prix', user_id=1)
    twelfth_photo = Photo(
        image_url='https://i.postimg.cc/jqnq7tQx/nick-hillier-x-BXF9pr6-LQo-unsplash.jpg', title='Coffee shop', description='Chatting in a coffee shop', user_id=1)







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


    fourth_album = Album(
        title='My first album', description=None, user_id=2)
    fifth_album = Album(
        title='My first album', description=None, user_id=3)
    sixth_album = Album(
        title='My first album', description=None, user_id=4)


    #Albums
    db.session.add(first_album)
    db.session.add(second_album)
    db.session.add(third_album)
    db.session.add(fourth_album)
    db.session.add(fifth_album)
    db.session.add(sixth_album)

    #Photos
    db.session.add(second_photo)
    db.session.add(third_photo)
    db.session.add(fifth_photo)
    db.session.add(twentyeth_photo)
    db.session.add(eleventh_photo)

    db.session.add(twentyethsecond_photo)

    db.session.add(sixth_photo)
    db.session.add(eighth_photo)


    db.session.add(thirteenth_photo)
    db.session.add(twelfth_photo)
    db.session.add(fourteenth_photo)
    db.session.add(nineteenth_photo)

    db.session.add(sixteenth_photo)
    db.session.add(seventeenth_photo)
    db.session.add(eighteenth_photo)
    db.session.add(fifthteenth_photo)
    db.session.add(tenth_photo)

    db.session.add(twentyethfirst_photo)
    db.session.add(ninth_photo)
    db.session.add(twentyeththird_photo)
    db.session.add(fourth_photo)
    db.session.add(twentyethfourth_photo)
    db.session.add(first_photo)

    first_photo.albums.append(first_album)
    second_photo.albums.append(first_album)
    third_photo.albums.append(second_album)
    third_photo.albums.append(first_album)
    fourth_photo.albums.append(second_album)
    fourth_photo.albums.append(first_album)
    fifth_photo.albums.append(second_album)
    fifth_photo.albums.append(first_album)
    tenth_photo.albums.append(third_album)
    tenth_photo.albums.append(first_album)
    eleventh_photo.albums.append(third_album)
    eleventh_photo.albums.append(first_album)


    db.session.commit()

def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
