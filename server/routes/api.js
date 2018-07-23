// all API endpoints defined here
// import express, router
const express = require('express');
const jwt = require('jsonwebtoken');
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
      } else { // create the payload for JWT generation
         let payload = { subject: registeredUser._id }
         // the token needs to be signed and generated
         let token = jwt.sign(payload, 'secretKey');
         // send the token as a token with the response
         res.status(200).send({token});
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
            let payload = { subject: user._id }
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token});
         }
      }
   })
})

// GET request for events
router.get('/events', (req, res) => {
   let events = [
      {
         "_id": "1",
         "name": "Auto Show",
         "description": "Twin Cities annual auto show",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "2",
         "name": "Amatuer Photography Expo",
         "description": "Showcase for amatuer photography",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "3",
         "name": "HackerNoon Hackathon",
         "description": "Hack Today, Code Tomorrow",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "4",
         "name": "Scrapbook Convention",
         "description": "Sponsored by Creative Memories",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "5",
         "name": "JavaScript Nation",
         "description": "JavaScript Nation traveling Symposium",
         "date": "2012-04-23T18:25:43.511Z"
       },
       {
         "_id": "6",
         "name": "Bizarre Foods",
         "description": "Andrew Zimmern and bizarre foods",
         "date": "2012-04-23T18:25:43.511Z"
       }
     ]
     res.json(events);
   })
   
   // for special events
   router.get('/special', (req, res) => {
      let events = [
         {
            "_id": "1",
            "name": "Classic and Specialty Cars",
            "description": "Come one, come all car enthusiasts",
            "date": "2012-04-23T18:25:43.511Z"
         },
         {
            "_id": "2",
            "name": "Meet and Greet U2",
            "description": "Only open to Eventhub members",
            "date": "2012-04-23T18:25:43.511Z"
         },
         {
            "_id": "3",
            "name": "Pottery Expo",
            "description": "Pottery on display",
            "date": "2012-04-23T18:25:43.511Z"
         },
         {
            "_id": "4",
            "name": "Pottery Expo Special",
            "description": "Go behind the scenes",
            "date": "2012-04-23T18:25:43.511Z"
         },
         {
            "_id": "5",
            "name": "Poetry In Motion",
            "description": "Up and coming poets read their own work",
            "date": "2012-04-23T18:25:43.511Z"
          },
         {
            "_id": "6",
            "name": "Rare Book Gathering",
            "description": "Rare books, new and used",
            "date": "2012-04-23T18:25:43.511Z"
         }
      ]
      res.json(events);
   })
   
   
   



// export the router
// need to tell the server to use this route
module.exports = router;