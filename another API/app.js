const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// using as middleware so that it runs on all requests
app.use(bodyParser.json());
app.use(cors());

// import routes
const post_route = require('./routes/posts');

app.use('/posts', post_route)


// // middleware, executes on certain routes
// app.use('/posts', ()=>{
//     console.log("middleware running");
// })

// db connection
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, (error)=>{
    if (error){
        console.log("connection failed");
    }else{
        console.log("connected to DB");
    }
    
})

app.listen(3000);