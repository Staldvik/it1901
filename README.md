# IT 1901 Project - Group 17
 
We built a webapp to manage multiple festivals. <br>
It's hosted at Firebase, [here!](https://festival-180609.firebaseapp.com/)
 
## How To Run Locally
You'll need to have npm installed. One of the easiest ways is to
install [Node.js](https://nodejs.org/en/)
 
```sh
cd app
npm install
npm start
```
 
Then, if it doesn't open automatically, open [http://localhost:3000/](http://localhost:3000/) to see the app.<br>
 
## How It's Built

### create-react-app

To start off we used a tool (built by developers at Facebook) called create-react-app [github](https://github.com/facebookincubator/create-react-app).
This skips a lot of configuration which would have slowed down our development. It essentially gives you a huge head start when building
React apps. It's simply run one command and you're ready to start your React project. One downside to this might be that we're not very
familiar with all the tools used, and while this never really became a problem in our project, it might've caused problems in another.

### Firebase
Firebase became our entire back-end, providing us with database, hosting and "back-end logic".

#### Database
One of the biggest reasons for us using Firebase for database is that it's real time. This makes it a perfect match with React which keeps the view up to date with the "state" within the React App. So when the database updates, React is immediately notified and updates the view.

#### Hosting
Our reasoning for using Firebase to host our project (when not using our local webpack dev server) was that it was easy - when already using their database you only have to run a single line to deploy.

#### Back-end logic
We needed to contact the Spotify API for some of implementations to work. This was not possible to do from the client side because of security concerns. Our solution became Firebase Cloud functions. Here you can configure different functions to fire on different events - like a database change or a GET-request to a specific URL.

### File Tree

#### Code
These are the essential files, the rest are generated
 
```
app
│   .firebaserc
│   .gitignore
│   database.rules.json
│   esdoc.json
│   firebase.json
│   package.json
│   README.md
│   testbranch.txt
│
├───functions
│       index.js
│       package.json
│
├───public
│       favicon.ico
│       favicon2.ico
│       index.html
│       manifest.json
│
└───src
    │   App.css
    │   App.js
    │   App.test.js
    │   database.js
    │   index.css
    │   index.js
    │   registerServiceWorker.js
    │
    ├───components
    │   ├───allfestivals
    │   │       allfestivals.css
    │   │       AllFestivals.js
    │   │
    │   ├───artist
    │   │       artist.css
    │   │       Artist.js
    │   │
    │   ├───artistlist
    │   │       artistlist.css
    │   │       ArtistList.js
    │   │
    │   ├───artist_pr
    │   │       artist.css
    │   │       ArtistPR.js
    │   │
    │   ├───concertprogram
    │   │       concertprogram.css
    │   │       ConcertProgram.js
    │   │
    │   ├───createday
    │   │       createday.css
    │   │       CreateDay.js
    │   │
    │   ├───createddays
    │   │       createddays.css
    │   │       CreatedDays.js
    │   │
    │   ├───createfestival
    │   │       createfestival.css
    │   │       CreateFestival.js
    │   │
    │   ├───createscene
    │   │       createscene.css
    │   │       CreateScene.js
    │   │
    │   ├───festival
    │   │       festival.css
    │   │       Festival.js
    │   │
    │   ├───managerequest
    │   │       managerequest.css
    │   │       ManageRequest.js
    │   │
    │   ├───navbar
    │   │       navbar.css
    │   │       navbar.js
    │   │
    │   ├───programdays
    │   │       programdays.css
    │   │       ProgramDays.js
    │   │
    │   ├───programslots
    │   │       programslots.css
    │   │       ProgramSlots.js
    │   │
    │   ├───scenelist
    │   │       scenelist.css
    │   │       SceneList.js
    │   │
    │   ├───slots
    │   │       slots.css
    │   │       Slots.js
    │   │
    │   └───technicianslist
    │           technicianslist.css
    │           TechniciansList.js
    │
    ├───pages
    │   ├───adminpage
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───artists
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───bandbooking
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───bandbookingresponsible
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───banddatabase
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───concertpage
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───frontpage
    │   │       frontpage.css
    │   │       index.js
    │   │
    │   ├───homepage
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───login
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───manager_site
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───pricecalculator
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───pr_site
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───search
    │   │       index.js
    │   │       style.css
    │   │
    │   ├───setup
    │   │       index.js
    │   │       setup.css
    │   │
    │   └───technicians
    │           index.js
    │           style.css
    │
    └───static
        └───img
                defaultArtistPic.jpg
                festival.png
                logo.svg
                spotify.png
                uka.png
```

#### Database
And this is a snippet to give an idea of how our database is structured.
But this is also all generated by the code, so the project does not need a pre-made database. In fact, a pre-made database would most certainly be more work than to just let the code create what's needed.

<img src="https://i.imgur.com/iaBXOro.png" width='600' alt='database structure'>

