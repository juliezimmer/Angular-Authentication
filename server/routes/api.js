// all API endpoints defined here
// import express, router
const express = require('express');
const router = express.Router();

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

// export the router
// need to tell the server to use this route
module.exports = router;