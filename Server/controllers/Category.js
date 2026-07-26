
const Category = require("../models/Category");


//create tag ka handler
exports.createCategories = async (req , res)=>{

    try{
            
        //data fecch name and des
        const{name,description} = req.body;

        //vaildation
        if(!name || !description){
            return res.status(400).json({
            success:false,
            message:'All fields are required ',
            });
        }


        // tag ki entry in DB
           const TagDetails = await Category.create({
            name:name,
            description:description,
           });
           console.log(TagDetails);

           //response return
           return res.status(200).json({
            success:true,
            message:'Tag created Succesfully',
            });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'error.message',
            });
    }
};


//get AllTags
exports.showAllCategories = async (req , res)=>{
    try{
        const allTags = await Category.find({},{name:true,description:true});
          

         return res.status(200).json({
            success:true,
            message:'All Tags return succesfully',
            allTags,
            });

    }catch(error){
         return res.status(500).json({
            success:false,
            message:'error.message',
           
            });
    }
}


//category page Details
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // selected category courses
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();

    if (!selectedCategory) {
      return res.status(400).json({
        success: false,
        message: "Data not found",
      });
    }

    // different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    // 🔥 top selling courses
    const topSellingCourses = await Course.aggregate([
      {
        $addFields: {
          totalStudentsEnrolled: { $size: "$studentsEnrolled" },
        },
      },
      {
        $sort: { totalStudentsEnrolled: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        topSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};