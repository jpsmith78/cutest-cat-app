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

After building all of my routes in the server.js file and making sure that they worked, I created a controllers folder and put them all in a cats.js file there, along with a seed route that has some pre made cats in it. I required this in server.js dependencies and put a user controller for it toward the bottom of the page.

Once this all functioned correctly, I had to add the register and login functionality. I created sessions and user folders in views: each with a new.ejs file, a users.js file in models, and sessions.js and users.js files in controllers.  first I made my model and required it in my conrollers.  Then I wrote my controller files and required them in server.js dependencies and added controllers down below.  Then I made the forms in my sessions and users view files and rendered these in the controllers.  
Once these were all connected, I hashed the password using bcrypt and stored the secret string in dotenv.  
After everything was connected, it was just a matter of getting options to appear and disappear based on the user login state and id.
Then, of course I styled it. Not a huge amount of surprises in that process.

## Solved problems
I broke my app by putting my sessions and users controllers above my dynamic cats controller.

### Later additions and fixes
I added the viewport meta data to make the app responsive.

I had to re wireframe and restyle the entire page. I made better use of partial views and added several new pages that link through the footer.

Users could register without a password and loggin in with a wrong username or password crashed the app.  I've fixed both of these issues in my user ans session controller files.

## Unsolved problems
Like buttons toggle once per session but users can log back in and like again.
