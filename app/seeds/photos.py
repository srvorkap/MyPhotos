from app.models import db, Photo


def seed_photos():
    first_photo = Photo(
        #user 1
        image_url='http://3.bp.blogspot.com/-gR-kO2fy1sU/U7_tUMvTKyI/AAAAAAAAAos/C88KGJmzM8U/s1600/2508695615_7361d11105_o.jpg', title='Banksy Cleans Up', description='The latest work by mysterious street artist Banksy revealed at Leake Street, London this weekend. See the Banksy tag bottom right of the cave. The CCTV cameras above this were wrapped in grey poly bags to protect them from overspray! Created May 2008 but painted over by August 2008. If you want to blog, post or use this photograph in any way please ask me, link to this page,credit and mark © Michael Greenwood All my shots from the amazing Cans Festival are here… ', user_id=1, album_id=1)
    second_photo = Photo(
        image_url='https://i.postimg.cc/Hn0hs4Y8/bike.jpg', title='Desert quad bike ride', description=None, user_id=1, album_id=1)
    third_photo = Photo(
        image_url='https://shapeenergy.eu/wp-content/uploads/2017/11/belgrade-thumb.jpg', title='Belgrade', description='asdfsdf asdfsadf asdf asdf asdf asdf asdf sad fasdf asd fasdf asdfasdf asd fasd asd fsadf sad fasd fsad fasd fasdf dsf asdf as dfasdfasdf asd fasdf asdf asdf asdfasdf ', user_id=1, album_id=2)
    fourth_photo = Photo(
        image_url='https://i.postimg.cc/D0vtGX4J/berlin.jpg', title='Berlin', description=None, user_id=1, album_id=2)
    fifth_photo = Photo(
        image_url='https://i.postimg.cc/N0MF6pZY/madrid.jpg', title='Madrid', description='Retiro Park or simply El Retiro is one of the largest parks of the city of Madrid, Spain. The park belonged to the Spanish Monarchy until the late 19th century, when it became a public park.', user_id=1, album_id=2)
    sixth_photo = Photo(
        image_url='https://i.postimg.cc/wB6DRCXB/lesi.jpg', title='Rough Collie', description="Rough collie Honey Pina's Becky The Dragoness 'Likka'", user_id=1, album_id=None)
    seventh_photo = Photo(
        image_url='https://i.postimg.cc/7P0H2fmK/coffee.jpg', title='Cup of coffee', description='', user_id=1, album_id=None)

        #user 2
    eighth_photo = Photo(
        image_url='https://i.postimg.cc/RhpL94q8/cats.jpg', title='Kittens', description='First outdoor day.', user_id=2, album_id=4)
    ninth_photo = Photo(
        image_url='https://i.postimg.cc/3JygmMk8/empire.jpg', title='Empire State Building', description='Empire State Building during a warm summer morning in New York City', user_id=2, album_id=4)
    tenth_photo = Photo(
        image_url='https://i.postimg.cc/ZR7wYrMV/Maldives.jpg', title='Maldives', description=None, user_id=2, album_id=5)
    eleventh_photo = Photo(
        image_url='https://i.postimg.cc/HxMX7XZp/tree.jpg', title='Tree', description='This is the first photo I am uploading to MyPhotos - I have been taking photos actively for the last 15 years, and despite having a vast collection of thousands of images from all parts of the world, I have never really sold any. I love the idea of sharing free images for those who cannot afford to pay for them. I also believe that those who can afford to pay for a photo, and appreciate the efforts of a photographer will be happy to compensate the photographer when they use one for commercial purposes. Here is a free image of a tree - if you use it :)', user_id=2, album_id=5)
    twelfth_photo = Photo(
        image_url='https://i.postimg.cc/9Q2XYTLx/The-Island.jpg', title='The Island', description=None, user_id=2, album_id=5)
    thirteenth_photo = Photo(
        image_url='https://i.postimg.cc/JnNPJf0Y/Los-Angeles-sunset-field.jpg', title='Los Angeles sunset field', description=None, user_id=2, album_id=5)
    fourteenth_photo = Photo(
        image_url='https://i.postimg.cc/ZYMzq3k9/Waterfall-in-Telluride.jpg', title='Waterfall in Telluride', description=None, user_id=2, album_id=5)
    fifthteenth_photo = Photo(
        image_url='https://i.postimg.cc/gjCYLL7P/Sandstone-cliff-with-a-waterfall.jpg', title='Sandstone cliff', description='Sandstone cliff with a waterfall', user_id=2, album_id=5)
    sixteenth_photo = Photo(
        image_url='https://i.postimg.cc/9Fy4tcYB/Lake-Louise-landscape.jpg', title='Lake Louise landscape', description=None, user_id=2, album_id=5)
    seventeenth_photo = Photo(
        image_url='https://i.postimg.cc/h45834xW/Old-Trafford.jpg', title='Old Trafford', description=None, user_id=3, album_id=6)
    eighteenth_photo = Photo(
        image_url='https://i.postimg.cc/cJP8Zh7s/Wolf.jpg', title='Wolf', description='Amazing encounter with grey wolves in the midst of winter in Canada - Montreal. Shot on', user_id=3, album_id=6)
    nineteenth_photo = Photo(
        image_url='https://i.postimg.cc/W4Dcg6Bq/Drift-taxi-show.jpg', title='Drift taxi show', description=None, user_id=3, album_id=None)
    twentyeth_photo = Photo(
        image_url='https://i.postimg.cc/kMsYMRH0/racing.jpg', title='Racing', description='ERA Championship testdays at Circuit Zolder in Belgium.', user_id=3, album_id=None)
    twentyethfirst_photo = Photo(
        image_url='https://i.postimg.cc/HLWCn12z/huskyone.jpg', title='Husky sitting', description='Traveling husky sitting on a porch with bent paws and looking back with beautiful blue eyes.', user_id=4, album_id=7)
    twentyethsecond_photo = Photo(
        image_url='https://i.postimg.cc/K8v9gG61/laying.jpg', title='Husky laying', description='Husky pup in the mountains of Tennessee laying on a porch with an old milk jug next to him.', user_id=4, album_id=7)
    twentyeththird_photo = Photo(
        image_url='https://i.postimg.cc/G2k9RChQ/sleeping-cat.jpg', title='Sleeping cat', description='Cat sleeping on a chair with a cushion in a cabin in the woods snoozing away.', user_id=4, album_id=None)
    twentyethfourth_photo = Photo(
        image_url='https://i.postimg.cc/C5ztDFBC/camera.jpg', title='Camera', description='Man reviewing footage on the black magic pocket cinema camera 6K of a woman reviewing an image taken on her camera.', user_id=4, album_id=None)
    # twentyethfifth_photo = Photo(
    #     image_url='https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg', title='24 Photo', description='This is the 24th photo', user_id=2, album_id=None)

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
    # db.session.add(twentyethfifth_photo)

    db.session.commit()

def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
