# cutest-cat-app
Users can post pictures of their cats and vote for cutest cat
## Link to Live App
[cute cats app](https://cutecats.herokuapp.com/)
## technologies used
Node.JS, Git, Heroku, Mongo, Mongoose, express, bcrypt, dotenv, method-override, ejs, JavaScript, HTML, CSS
## Approach taken
I first built my server.js page: set up express, mongoose, and ejs dependencies, mongo connection, listener and an index route.  I then created my views folder with index.ejs and show.ejs pages. I rendered these pages to my controllers.

Once these worked, I created a models folder and added my cats.js model. I then required this in my sessions.js page's dependencies. Somewhere around here I added my public folder and added my css file along with static middleware.

I then created new and create routes and new.ejs page in my views folder.  This contained a form that input new data based on the cats model and redirected to the index page.  

After this, I installed method-override and made a delete route and edit route on my show page.  The edit route rendered the edit.ejs page where the user can make changes to their cat.

After building all of my routes in the server.js file and making sur ethat they worked, I created a controllers folder and put them all in a cats.js file there, along with a seed route that has some pre made cats in it. I required this in server.js dependencies and put a user controller for it toward the bottom of the page.

Once this all functioned correctly, I had to add the register and login functionality. I created sessions and user folders in views: each with a new.ejs file, a users.js file in models, and sessions.js and users.js files in controllers.  first I made my model and required it in my conrollers.  Then I wrote my controller files and required them in server.js dependencies and added controllers down below.  Then I made the forms in my sessions and users view files and rendered these in the controllers.  
Once these were all connected, it was simply a matter of hashiing the password using bcrypt and storing my secret in dotenv.  I did have to rely heavily on the GA password markdown to get through this part.

After everything was connected, it was just a matter of getting options to appear and disappear based on the user login state and id.

Then, of course I styled it. Not a huge amount of surprises in that process.

## Solved problems
I broke my app by putting my sessions and users controllers above my dynamic cats controller.

## Unsolved problems
I could not figure out how to get the like and dislike buttons to only work one time.

Will change each one to a toggle for each user and show total of toggles for each cat.

Styling was fine for the most part, but I had a hard time getting styling onto my submit buttons for some reason.

Restyling to look like facebook page (catbook, facecat) and fix buttons.

Will fix crash when user tries to log in with wrong user name
## Notes
Many of the cats in this app are from friends and family.  The seed data is made up.

Definitely get the like buttons to only fire once per session in the future.
