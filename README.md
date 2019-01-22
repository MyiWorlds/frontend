# Currently in heavy development with breaking changes all the time

# If you want to contribute or ask questions, I created a Discord channel

https://discord.gg/28Gjv7S

A frontend boilerplate is made with:

- Typescript
- Apollo Client
- Material-UI
- JSS (Javascript Styling)
- Firebase
  - Firebase Authentication
  - Firebase Hosting

The frontend will be running on Firebase hosting, and the backend will be on Google Cloud Platform App Engine (Standard Node8 environment).

The backend to this application should be setup before using this frontend. You can find it and it's setup instructions here: https://github.com/MyiWorlds/backend

If your app is already setup your normal development workflow will be just running

```
npm start
```

Else follow the setup instructions

# Setup Instructions

1. Clone project

```
git clone https://github.com/MyiWorlds/frontend.git
```

2. cd into folder

```
cd frontend
```

3. Create a .env file in the root directory of this project leaving it blank for now
4. Create you Firebase account. https://firebase.google.com/
5. Download your service key https://youtu.be/8D9XnnjFGMs?t=4m4s
6. Open it in your text editor and copy paste the contents out into the .env file you created in step 1.
7. Put "" around all the key properties in the service key (value on the left side of semi colon).
8. Delete all the empty space at the end of the lines to put everything onto 1 line.
9. Wrap the whole object in single quotes like so '{...your key}'
10. Put REACT_APP_FIREBASE_CONFIG= infront of your new key (there is variables in the app which look for this exact match).
11. To your .env file above your service key add the following:

- REACT_APP_DEV_BACKEND=http://localhost:4000
- REACT_APP_PROD_BACKEND=https://some-app-name.appspot // Note replace some-app-name with your projects app name located in your service key
- REACT_APP_QA_BACKEND=https://some-app-name.appspot.com // This will eventually be used for your testing server

Below is an example of what your .env file should look like

```
REACT_APP_DEV_BACKEND=http://localhost:4000
REACT_APP_PROD_BACKEND=https://some-app-name.appspot
REACT_APP_QA_BACKEND=https://some-app-name.appspot.com
REACT_APP_FIREBASE_CONFIG='{"apiKey": "AIzaSyB1HSatqQF8lEK5UIUaZVHMTyl-GONFXU","authDomain": "some-app-name.firebaseapp.com","databaseURL": "https://some-app-name.firebaseio.com","projectId": "some-app-name","storageBucket": "some-app-name.appspot.com","messagingSenderId": "64115126843"}'
```

**When wanting to have your app run in the cloud, make sure you are pointing to your backend api when you build so when you push your application to the cloud it is sending its requests to your server where Apollo handles it.**

12. cd into the projects directory and run:

`npm install`

'npm build'

`npm install -g firebase-tools`

`firebase login`

`firebase init`

Are you ready to proceed?

`y`

Select your project

What do you want to use as your public directory? (public)

`build`

Then hit enter

Configure as a single-page app (rewrite all urls to /index.html)?

`y`

File build/index.html already exists. Overwrite?

`n`

You are now ready to deploy with:

`firebase deploy`

You can now go to your firebase console and you should see the frontend in the Develop > Hosting section.

You can then click on the web url to view the website.

To view more documentation of create-react-app which was used as a base for this project go here:
https://github.com/facebook/create-react-app
