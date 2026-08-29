
const mongoose = require("mongoose");
const Category = require("./Category");


const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim :true
    },
    courseDescription:{
         type:String,
        trim :true,
        required:true
    },
instructor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true

},
status:{
    type:String,
    enum:["Draft","Published"],
},

whatYouWillLeran:{
     type:String,

},

courseContent: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
  },
],

ratingAndReviews:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Rating",
},
price:{
    type:Number,
},
thumbnail:{
    type:String,
},
videoUrl: {
    type: String,
},

videoDuration: {
    type: Number,
},
tag:{
    type:[String],
     required:true,
},
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
},
createdAt: {
    type:Date,
    default:Date.now
},

studentsEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,

}]

});

module.exports = mongoose.model("Course",  courseSchema );