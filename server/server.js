const dotenv = require('dotenv').config()
console.log('dot env', dotenv)
const express = require("express");
const mongoose = require("mongoose");
const admin = require('firebase-admin');
const path = require('path');
const todos = require("./routes/todo");
const cors = require("cors");
const app = express()

app.use(express.json())
app.use(cors())

// Initialize Firebase Admin SDK (you need to download the service account key from Firebase Console)
const serviceAccount = require(path.join(__dirname, 'firebase-serviceaccount.json'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized');
  }

  const idToken = authorizationHeader.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.uid = decodedToken.uid;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };

app.use('/',verifyFirebaseToken, todos)
console.log('env', process.env.MONGO_DB)
mongoose.connect(process.env.MONGO_DB,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.listen(process.env.PORT || 8080,()=>{
    console.log('connection establish')
})