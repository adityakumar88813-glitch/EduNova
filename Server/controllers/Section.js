
const Section = require("../models/Section");
const Course = require("../models/Course");


//create section
exports.createSection = async(req , res)=>{
    try{
          //data fetch
        const {sectionName,courseId} = req.body;

        //data vaildation
        if(!sectionName || !courseId){
            return res.status(400).json({
            success:false,
            message:' Required all fields',
            });
        }

        //create course
        const newSection = await Section.create({sectionName});

        //update course with sectionId
        const updateCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
        );


        //return response
         return res.status(200).json({
            success:true,
            message:' Section created successfully',
            updateCourseDetails,
            });


    }catch(error){
         return res.status(500).json({
            success:false,
            message:'Unable to create section',
            error:error.message,
            });

    }
}






//update section
exports.updateSection = async(req , res)=>{
    try{
        //data fetch
        const{sectionName , sectionId} = req.body;

        //data vaildation
           if(!sectionName || !sectionId){
            return res.status(400).json({
            success:false,
            message:' Required all fields',
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        //response
        return res.status(200).json({
            success:true,
            message:' Section updated successfully',
           updateSection,
            });


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to update section',
            error:error.message,
            });
    }
}



///delete section

exports.deleteSection = async(req , res)=>{
    try{
  //get data id
  const {sectionId} = req.body;

  //delete
    await Section.findByIdAndDelete(sectionId);

    //response
     return res.status(200).json({
            success:true,
            message:'Section delete succesfully',
          
            });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to delete section',
            error:error.message,
            });
    }
}
