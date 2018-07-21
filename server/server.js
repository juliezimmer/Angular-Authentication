const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

// create an instance of express
const app = express();

// specify that the body parser will handle JSON data
app.use(bodyParser.json());

// test a 'get' request. Remember: app is the instance of the express framework, so this is like saying express.get()
// This is a 'get' request. .get() takes in two parameters:
//    1.  '/' (the path)
//    2.   a callback function, which has req and res as ITS parameters.
app.get('/', function(req, res){
   res.send("Hello from the server!")
})

app.listen(PORT, function() {
   console.log(`The server is running on localhost: ${PORT}`)
})