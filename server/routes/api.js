// all API endpoints defined here
// import express, router
const express = require('express');
const router = express.Router();

// bring in the user model/schema
const User = require('../models/user');

const mongoose = require ('mongoose');
// declare connection string to the db
const db = "mongodb://userjulie:juliespw77@ds147451.mlab.com:47451/angular_auth_events_db" 

// connect to the db
mongoose.connect(db, err => {
   if (err) {
      console.log(`There was an error connecting to the database: ${err}`);
   } else {
      console.log("Connected to MongoDB");
   }
})

// GET request
// .get() takes in a callback function as a parameter.
router.get('/', (req, res) => {
   res.send ("From API route")
})

// POST request with user information from registering as a new user
router.post('/register', (req, res) => {
   // extract the user information from the req
   let userData = req.body;
   // create a model that mongoose understands using the userData extracted from the req
   let user = new User(userData);
   // save the user to the db by calling the save method on the user object/model.
   // this method returns an error or the regustered user.
   user.save((error, registeredUser) => {
      if (error) {
         console.log(error);
      } else {
         // send a 200 status and the registeredUser
         res.status(200).send(registeredUser);
         console.log(`This is the new user: ${registeredUser}`);
      }
   })
})

// POST request to login endpoint
router.post('/login', (req, res) => {
   // extrat the usesr information from the request body.
   // This stores the email and password in the userData variable.
   let userData = req.body; 
   // check to see if the user email already exists in the user db by using findOne() method.
   // 'User' is the user model
   User.findOne({email: userData.email}, (error,user) => {
      if (error) {
         console.log(error);
      } else {
         if (!user) {
            res.status(401).send ("Invalid email");
         } else 
         if (user.password !== userData.password) {
               res.status(401).send("invalid password");
         } else {
            res.status(200).send(user);
         }
      }
   })
})

// export the router
// need to tell the server to use this route
module.exports = router;