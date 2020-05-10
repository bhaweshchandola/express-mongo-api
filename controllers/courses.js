const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const CourseModel = mongoose.model("Course");
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());


router.get("/list", (req, res)=>{

    // // insert into db
    // var course = new CourseModel();
    // course.courseName = "node project";
    // course.courseId = "2";
    // course.save();


    // list data from db
    CourseModel.find({}).lean()
    .exec(function(err, docs){
        if(!err){
            console.log(docs);
            res.send({data : docs});
            // res.render("list", { data : docs })
        }
    });

})

router.post("/create", (req, res)=>{
    console.log(req.body);
    var course = new CourseModel();
    course.courseName = req.body.name;
    course.courseId = req.body.id;
    course.save();
    res.send({"status": "success"});
})

router.post("/update/:courseId", (req, res)=>{
    // CourseModel.findByIdAndUpdate()
    console.log(req.params.courseId);
    console.log(req.body);
    CourseModel.findByIdAndUpdate({_id: req.params.courseId}, {"courseName": req.body.name}, {upsert:true}, function(err, doc){
        if (err) {
            console.log(err);
        }
        else{
            console.log(doc);
        }
    })
    res.send({"status": "success"});
})

router.post("/delete/:courseId", (req, res)=>{
    // CourseModel.findByIdAndUpdate()
    console.log(req.params.courseId);
    console.log(req.body);
    CourseModel.findByIdAndRemove({_id: req.params.courseId}, function(err, doc){
        if (err) {
            console.log(err);
        }
        else{
            console.log(doc);
        }
    })
    res.send({"status": "success"});
})

module.exports = router;