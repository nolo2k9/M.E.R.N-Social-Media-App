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

- When transfering the project between myself and Keith i was unable to run React-Scripts and needed to use the command:
    - npm install react-scripts --save


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


*** An Issue Occured on the 06/04/2020 ***

When trying to make a push to github, it was being rejected.
To solve this I (Cuan O'Conchuir) made a --force push.
This appears to have caused our previous commits to be lost.
I emailed Martin Kenirons (our tutor) about this issue on 06/04/2020 and no reply/advice on how to proceed was given, 
so I will continue to operater under the assumption any loss of github commits will not affect our final grade.
(This note serves as a record/timestamp for the issue, and a statement of responsibility for this.)

***Known Issues***
The Education and Experience entries for a users profile seem to be sharing across some of the profiles. The source and fix are both unknown to us at this point in time.

***References for various implementations/components/calls***
private routing - https://www.youtube.com/watch?v=Y0-qdp-XBJg
Link to concurrently information: https://www.npmjs.com/package/concurrently
useEffect hook - https://reactjs.org/docs/hooks-effect.html
Fragments - https://reactjs.org/docs/fragments.html
Destructuring - https://www.youtube.com/watch?v=5_PdMS9CLLI
              - This allows us to unpack values from arrays or properties from objects into distinc objects.
              - improves our codes readability
connect - https://react-redux.js.org/api/connect
        - mapStateToProps - https://react-redux.js.org/using-react-redux/connect-mapstate
PropTypes - https://reactjs.org/docs/typechecking-with-proptypes.html
History - https://scotch.io/courses/using-react-router-4/using-history
withRouter - https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
useState hook - https://reactjs.org/docs/hooks-state.html
moment date formatting - https://momentjs.com
conditional rendering in react - https://reactjs.org/docs/conditional-rendering.html