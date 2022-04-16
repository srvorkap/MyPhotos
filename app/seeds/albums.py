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


    fourth_album = Album(
        title='My first album', description=None, user_id=2)
    fifth_album = Album(
        title='My first album', description=None, user_id=3)
    sixth_album = Album(
        title='My first album', description=None, user_id=4)

    # first_album.append(first_photo)
    # first_album.append(second_photo)

    db.session.add(first_album)
    db.session.add(second_album)
    db.session.add(third_album)
    db.session.add(fourth_album)
    db.session.add(fifth_album)
    db.session.add(sixth_album)

    db.session.add(first_photo)
    db.session.add(second_photo)
    db.session.add(third_photo)
    db.session.add(fourth_photo)
    db.session.add(fifth_photo)
    db.session.add(tenth_photo)
    db.session.add(eleventh_photo)
    first_photo.albums.append(first_album)

    db.session.commit()

def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
