# Todo Application README

This Todo Application is a simple yet effective task management tool built using modern web technologies. It allows users to create, update, and delete tasks conveniently. Below you'll find essential information regarding the technologies used, folder structure, and how to set up the application.

## Prerequisites

- **Node.js 18.20.3**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/en/download/).
- **npm 10.7.0**: npm is distributed with Node.js, so if you have Node.js installed, you should have npm as well.


## Technologies Used

### Frontend
- **React**: A popular JavaScript library for building user interfaces.
- **JavaScript**: The primary programming language used for client-side scripting.
- **Material UI**: A React UI framework that implements Google's Material Design for React components.
- **Jest (testing)**: Jest is testing library to be used to write and run unit test cases.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimalist web application framework for Node.js, facilitating the development of web applications and APIs.
- **MongoDB**: A NoSQL database used for storing application data.

### Authentication
- **Firebase Authentication**: Provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app.

## Folder Structure

    .
    ├── client // frontend
        ├── public
        ├── package.json
        └── src
            ├── pages  # pages 
            ├── redux  # redux store, reducer and thunk
            ├── router # routes ( public and auth)
            ├── utils  # utilities ( constaints, validators)
            ├── components # reusable components
            └── ...
    ├── server // backend
        ├── controllers # handle request and return response  
        ├── models # mongodb schema models 
        ├── routes # define all endpoints and request method
        ├── firebase-serviceaccount.json # firebase access file
        ├── server.js # server configuration
        └── ...


- **client**: Contains all the frontend code of the application, including React components, styles, and assets.
- **server**: the backend logic, including APIs, database configurations, and authentication setup.

## Setting Up

1. **setup environment**: create .env file in both server and client directory and add environment variables as defined below.
- client environment variables:
    ```bash
    REACT_APP_FIREBASE_API_KEY=AIzaSyB2xQyW4tKNLwuj-DcAlKV0DjFwTcVXquw
    REACT_APP_FIREBASE__AUTH_DOMAIN=todo-board-a8642.firebaseapp.com
    REACT_APP_FIREBASE_PROJECTID=todo-board-a8642
    REACT_APP_STORAGE_BUCKET=todo-board-a8642.appspot.com
    REACT_APP_MESSAGING_SENDERID=892645279224
    REACT_APP_APPID=1:892645279224:web:b6eb76611ef81f50e2c20d
    REACT_APP_API=http://localhost:8080
- server environment variables:
    ```bash
    MONGO_DB=mongodb+srv://mahechahome:BW9vZQkE5ZQDwopS@todocluster.gqdi4pa.mongodb.net/todos?retryWrites=true&w=majority&appName=todoCluster
1. **Install Dependencies**:

    - Navigate to the client directory and install frontend dependencies:
        ```bash
        cd ../server
        npm install

    - Move to the server directory and install backend dependencies:
        ```bash
        cd ../server
        npm install
 2. Run the Application:
    - Start the frontend development server
        ```bash
        npm start
    - Start the backend development server 
        ```bash
        npm run dev
  3. Run Tests:
  
    - frontend
     ```bash
     npm run test // to run tests
     npm run test:coverage // to check code coverage   


**Access the Application**

Once both frontend and backend servers are running, you can access the application by navigating to http://localhost:3000 in your web browser.and backend will be on http://localhost:8080


  
