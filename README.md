# MyPhotos
MyPhotos is a full-stack application inspired by Flickr, is an image hosting platform where users can upload their photos. Users can also create albums for better organization of their photos.

[Visit the site live here!](https://my-photos-application.herokuapp.com/)

* [Feature List](https://github.com/srvorkap/MyPhotos/wiki/Feature-List)
* [User Stories](https://github.com/srvorkap/MyPhotos/wiki/User-Stories)
* [Database Schema](https://github.com/srvorkap/MyPhotos/wiki/Database-Schema)

# Technologies Used

<img src="react-app/src/assets/readme/Python.png" width="40" height="40"/><img src="react-app/src/assets/readme/Flask.png" width="40" height="40"/><img src="react-app/src/assets/readme/React.png" width="40" height="40"/><img src="react-app/src/assets/readme/Redux.png" width="40" height="40"/><img src="react-app/src/assets/readme/HTML.png" width="40" height="40"/><img src="react-app/src/assets/readme/CSS.png" width="40" height="40"/><img src="react-app/src/assets/readme/Node.png" width="40" height="40"/><img src="react-app/src/assets/readme/PostgresQL.png" width="40" height="40"/><img src="react-app/src/assets/readme/SQLA.png" width="40" height="40"/><img src="react-app/src/assets/readme/Javascript.png" width="40" height="40"/><img src="react-app/src/assets/readme/Docker.png" width="40" height="40"/>

- Python
- Flask
- React
- Redux
- HTML
- CSS
- Node
- Postgres
- Sequel Alchemy
- JavaScript
- Docker
# Getting Started

1. Clone the repository

       git clone git@github.com:srvorkap/MyPhotos.git

2. CD into the root directory and install dependencies

        pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

3. Create a .env file based on the example with proper settings for your development environment

4. Setup your PostgreSQL user, password and database and make sure it matches your .env file

5. Start your environment shell

         pipenv shell

6. Migrate your database

         flask db upgrade

7. Seed your data

         flask seed all

8. Run the flask app

         flask run

9. Open second terminal, cd into /react-app directory and install dependencies with command

         npm install

10. Run the React app

         npm start

# Features

## Landing Page
New users can click on start button or sign up button which will take them to the sign up page. Existing users can click on login button in navbar that will take them to the login page.

<img src="react-app/src/assets/readme/landingPage.png"/>

## Login Page

On login page there is also a demo button which will allow someone to quickly sign up as a demo user and explore the site.
Error handling login page.

<img src="react-app/src/assets/readme/loginPage.png"/>

## Signup page

Error handling for signup page

<img src="react-app/src/assets/readme/signupPage.png" width="40" height="40"/>


## Navbar

Navbar is visible on every page. There is difference between navbar when user is logged in and when user is logged out. I both cases navbar has logo that cannot be clicked and github and linkedin about links.

# Navbar for logged out users

Navbar has login and signup buttons when user is logged in.

<img src="react-app/src/assets/readme/loggedOutUserNavbar.png" width="40" height="40"/>

# Navbar for logged in users

Navbar doesn't have login and signup buttons when user log in but it has some additional buttons.

1. Photostream button - navigates to photostream page
2. Albums button - navigates to albums page
3. Explore button - navigates to explore page
4. Upload button - opens create photo form
5. Profile button - opens menu that gives us an option to logout

<img src="react-app/src/assets/readme/loggedInUserNavbar.png"></img>







## Dashboard

Once logged in, the dashboard presents the user with a feed of posts shared by those they follow. The user is then able to infinitely scroll down his feed and click on a post they would like to interact with. There is also a nav bar at the top of the dashboard that coveniently allows the user to create a post, go to their profile page, or log out.

- When logging in you will be greeted with dashboard feed that is filled with post from users that you are following.
- This feed will infinitely scroll until you run out of posts.

<img src='react-app/public/read-me-imgs/dashboard.png'></img>

- If you aren't following anyone your dashboard will be empty but you will see a list of suggested people to follow

<img src='react-app/public/read-me-imgs/suggested-follows.png'></img>

- On each dashboard post you can:
  1. Click the ellipsis to open a modal that has an unfollow option. If you unfollow someone their post will stay on your feed until refresh and you will be given the option to follow that person again.
  2. Click on the owner of the post to visit their profile.
  3. Click on the heart to like a post which dynamically changes the color aswell as the like count.
  4. Click the comment bubble to view all comments.
  5. The user can add a comment to the post which updates dynamically. When there are more than 2 comments the rest are hidden.

<img src='react-app/public/read-me-imgs/dashboard-post.png'></img> <img src='react-app/public/read-me-imgs/additional-comments.png'></img>

- When you click on the comment bubble or 'View all comments' it opens the postView modal where you can see all comments
  1. User can click on these ellipsis to unfollow this post's owner
  2. Here you can also leave a comment or like a post and it will update here and the feed dynamically.
  3. If you are the user that created a comment, this ellipsis will be here for you to edit or delete your comment.

<img src='react-app/public/read-me-imgs/dashboard-postview-modal.png'></img>
## Images

Clicking on the upload icon in the nav bar will open up a modal form, where the user is able to create a new post with an image of their favorite pet and caption.

Once a post is created, the user can both edit and delete their post.

- When creating a post, user can click 'Select from computer' button to choose a file from their local machine.

<img src='react-app/public/read-me-imgs/create-post.png'></img>

- User can also just drag and drop an image and it will give you a preview.

<img src='react-app/public/read-me-imgs/create-post-img.png'></img>

- When clicking next, user can then add a caption to their image before posting.

<img src='react-app/public/read-me-imgs/create-post-caption.png'></img>

- After creating a post, it will show up on your feed and you can click the ellipsis to edit or delete that post.
- If you refresh the page the post will disappear because your own posts are not part of your feed.
<img src='react-app/public/read-me-imgs/delete-edit-post.png'></img>
## Comments

Upon clicking on a post, the user is able to read/write comments as well as delete/edit their own individual comment.




## User Profile Page

On the profile page, if it is the user's profile they can change their profile image. On any profile page, they can see the profile users followers and who the profile user is following. Here they can also view details of any post and view all of the post's comments.

<img src='react-app/public/read-me-imgs/profile-page.png'></img>

1. If the user is on his own profile page, he/she has the option to update the profile picture by clicking the profile picture. When the profile picture is clicked, it will generate a modal with options to update the profile image, but there will be more features to come in this menu.
2. The profile page also displays a grid view of all posts from that user, with the most recent posts showing at the top. When hovering over a post, the user will be able to see an overlay which will display the amount of likes and comments that post currently has.
3. In the header for the profile page, users can view how many posts this profile has, and the amount of followers and following the profile has as well. If the user clicks on followers or following, a modal will pop up which displays more detailed information such as the username, full name, and the option to follow/unfollow the other related users.

<img src='react-app/public/read-me-imgs/edit-profile-image.png'></img>
<img src='react-app/public/read-me-imgs/post-meta-data.png'></img>
<img src='react-app/public/read-me-imgs/followers.png'></img>
