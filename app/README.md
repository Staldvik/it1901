# IT 1901 Project - Group 17
 
We built a webapp to manage multiple festivals. <br>
It's hosted at Firebase, [here!](https://festival-180609.firebaseapp.com/)
 
* [Run Locally](#run-locally) – How to run locally. 
* [Deployment](#deployment) – How to deploy the app to a server.
* [How it's built](#) – What tools were used.
 
## Run Locally
You'll need to have npm installed. One of the easiest ways is to
install [Node.js](https://nodejs.org/en/)
 
```sh
cd app
npm install
npm start
```
 
Then, if it doesn't open automatically, open [http://localhost:3000/](http://localhost:3000/) to see the app.<br>
 
## Deployment

We're going to cover deployment to Firebase Hosting (And maybe Hiroko?). For this you're going to need npm installed. Testing writing for longer than github can display
 
### Installation
 
Install all dependencies:
 
```sh
cd app
npm install
cd functions
npm install
cd ..
```
 
### Firebase

For this you'll need to set up a Firebase project, you can do that [here](console.firebase.google.com). <br>
Then go to Develop -> Hosting. Press Get started there and follow instructions until you get to <br>
firebase deploy. Now you'll want to run this in the app folder:

 
```sh
npm run build
firebase deploy
```

If you then go back to Firebase, you'll see an entry in the hosting dashboard. 
 
## How It's Built

Lorem Ipsum

### File Tree

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
