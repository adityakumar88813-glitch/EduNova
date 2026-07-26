const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


// ================= CREATE SUBSECTION =================
exports.createSubSection = async (req, res) => {
  try {
    const { title, sectionId, timeDuration, description } = req.body;
    const videoFile = req.files?.videoFile;

    // validation
    if (!title || !sectionId || !timeDuration || !description || !videoFile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      videoFile,
      process.env.FOLDER_NAME
    );

    // create subsection
    const subSectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    // update section (add subsection)
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: subSectionDetails._id },
      },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating subsection",
      error: error.message,
    });
  }
};


// ================= UPDATE SUBSECTION =================
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, timeDuration, description } = req.body;

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // update fields (partial update)
    if (title) subSection.title = title;
    if (timeDuration) subSection.timeDuration = timeDuration;
    if (description) subSection.description = description;

    // update video (optional)
    if (req.files && req.files.videoFile) {
      const uploadDetails = await uploadImageToCloudinary(
        req.files.videoFile,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
    }

    await subSection.save();

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: subSection,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating subsection",
      error: error.message,
    });
  }
};


// ================= DELETE SUBSECTION =================
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    // delete subsection
    await SubSection.findByIdAndDelete(subSectionId);

    // remove from section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSection: subSectionId },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting subsection",
      error: error.message,
    });
  }
};