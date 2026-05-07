const Featured = require("../models/Featured");

/* ================= ADD / UPDATE FEATURED ================= */

const addFeatured = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // Check images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required"
      });
    }

    // Cloudinary image URLs
    const imageUrls = req.files.map(
      (file) => file.path
    );

    // Check existing featured data
    let existingFeatured =
      await Featured.findOne();

    // ================= UPDATE =================

    if (existingFeatured) {

      existingFeatured.title =
        req.body.title ||
        existingFeatured.title;

      existingFeatured.videoUrl =
        req.body.videoUrl ||
        existingFeatured.videoUrl;

      existingFeatured.images =
        imageUrls;

      await existingFeatured.save();

      return res.status(200).json({
        success: true,
        message:
          "Featured updated successfully",
        data: existingFeatured
      });
    }

    // ================= CREATE =================

    const newFeatured =
      new Featured({

        title:
          req.body.title || "",

        videoUrl:
          req.body.videoUrl || "",

        images: imageUrls

      });

    await newFeatured.save();

    res.status(201).json({
      success: true,
      message:
        "Featured uploaded successfully",
      data: newFeatured
    });

  } catch (error) {

    console.log(
      "FEATURED ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/* ================= GET FEATURED ================= */

const getFeatured = async (req, res) => {
  try {

    const data =
      await Featured.findOne();

    if (!data) {
      return res.status(200).json({
        success: true,
        message:
          "No featured data found",
        images: []
      });
    }

    res.status(200).json(data);

  } catch (error) {

    console.log(
      "GET FEATURED ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/* ================= EXPORT ================= */

module.exports = {
  addFeatured,
  getFeatured
};
