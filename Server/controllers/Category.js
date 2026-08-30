const Category = require("../models/Category");


// =====================================================
// CREATE CATEGORY
// =====================================================

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const categoryDetails = await Category.create({
      Name: name,
      description: description || "",
      course: [],
    });

    console.log("CATEGORY CREATED:", categoryDetails);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: categoryDetails,
    });

  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// SHOW ALL CATEGORIES
// =====================================================

exports.showAllCategories = async (req, res) => {
  try {

    console.log("INSIDE SHOW ALL CATEGORIES");

    const allCategories = await Category.find({});

    return res.status(200).json({
      success: true,
      data: allCategories,
    });

  } catch (error) {

    console.error("SHOW ALL CATEGORIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// CATEGORY PAGE DETAILS
// =====================================================

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


exports.categoryPageDetails = async (req, res) => {

  try {

    const { categoryId } = req.body;

    console.log("====================================");
    console.log("CATEGORY PAGE DETAILS");
    console.log("CATEGORY ID:", categoryId);
    console.log("====================================");


    // -------------------------------------------------
    // 1. Check categoryId
    // -------------------------------------------------

    if (!categoryId) {

      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });

    }


    // -------------------------------------------------
    // 2. Get selected category
    // -------------------------------------------------

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: {
          status: "Published",
        },
        populate: {
          path: "ratingAndReviews",
        },
      })
      .exec();


    console.log("SELECTED CATEGORY:", selectedCategory);


    // -------------------------------------------------
    // 3. Category not found
    // -------------------------------------------------

    if (!selectedCategory) {

      return res.status(404).json({
        success: false,
        message: "Category not found",
      });

    }


    // -------------------------------------------------
    // 4. Get other categories
    // -------------------------------------------------

    const categoriesExceptSelected = await Category.find({
      _id: {
        $ne: categoryId,
      },
    });


    let differentCategory = null;


    if (categoriesExceptSelected.length > 0) {

      const randomIndex = getRandomInt(
        categoriesExceptSelected.length
      );


      const randomCategory =
        categoriesExceptSelected[randomIndex];


      differentCategory = await Category.findById(
        randomCategory._id
      )
        .populate({
          path: "course",
          match: {
            status: "Published",
          },
        })
        .exec();

    }


    // -------------------------------------------------
    // 5. Get courses from all categories
    // -------------------------------------------------

    const allCategories = await Category.find({})
      .populate({
        path: "course",
        match: {
          status: "Published",
        },
        populate: {
          path: "instructor",
        },
      })
      .exec();


    // -------------------------------------------------
    // 6. Combine all courses
    // -------------------------------------------------

    const allCourses = allCategories.flatMap(
      (category) => category.course || []
    );


    // -------------------------------------------------
    // 7. Sort by sold
    // -------------------------------------------------

    const mostSellingCourses = allCourses
      .sort(
        (a, b) =>
          (b.sold || 0) - (a.sold || 0)
      )
      .slice(0, 10);


    // -------------------------------------------------
    // 8. Send response
    // -------------------------------------------------

    return res.status(200).json({

      success: true,

      data: {

        selectedCategory,

        differentCategory,

        mostSellingCourses,

      },

    });

  } catch (error) {

    console.error(
      "CATEGORY PAGE DETAILS ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Internal server error",

      error: error.message,

    });

  }

};