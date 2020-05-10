// adapter to connect to mongodb
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/rest_api", {useNewUrlParser: true}, (error)=>{
    if (!error){
        console.log("connected successfully!!");
    }
    else{
        console.log("mongodb connecction failed");
    }
});

const Course = require("./course_model");