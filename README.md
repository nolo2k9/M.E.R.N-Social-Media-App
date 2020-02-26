**Technologies**

- NODE.js
- MongoDB (cloud storage)
- Mongoose (methods for actioning on server)
- Postman (for testing http requests)
- gitbash (optional)
- VS Code

**Dependencies**

- npm init (includes some basic info on the project. NOT NECESSARY)
- npm install express express-validator bcryptjs config gravatar jsonwebtoken mongoose request
    - npm install
    - express express-validator (validation on missing fields in info -> API)
    - bcryptjs (password validation)
    - config (package for global variables)
    - gravatar (for profile avatars)
    - jsonwebtoken (passing tokens for validation)
    - mongoose (methods for action on database)
    - request (for http requests to other APIs)

- npm install -D nodemon concurrently (server display is live and both backend and frontend server run concurrently)


*** Github ***
Take github user name
Make request to backend 
Then make a request to the guthub api to get user repositorys 
https://github.com/settings/applications/1221253

*** npm create-react-app client ***
Running this command will set up react into a folder called client 

*** Command to run server and client at the same time ***
In the package.json file I set up this:

"client": "npm start --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\""

this will enable us to run the client and server concurrently (at the same time).

Instead of running npm start server/ npm start

Run: npm run dev

Link to concurrently information: https://www.npmjs.com/package/concurrently

*** Client side dependencies ***
************ cd into client ********************
axios- to make http requests accross domains 
react-router-dom-
redux-state management
react-redux
redux-devtools-extension
redux-thunk- alows us to make asyncronous requests
moment-  date and time library, for for formatting date and time 
react moment- to use moment within react

To install these dependencies run:
npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment

(generate random number)
npm i uuid 

*** Proxy ***
Set up a proxy in client side package.json.
So when using things like axios you dont always have to enter in the address

"proxy": "http://localhost:5000"
