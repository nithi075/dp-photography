const Featured = require("../models/Featured");

const addFeatured = async (req, res) => {
  try {

    // Cloudinary URLs
    const imageUrls =
      req.files && req.files.length > 0
        ? req.files.map((file) => file.path)
        : [];

    let existingFeatured = await Featured.findOne();

    if (existingFeatured) {

      existingFeatured.title =
        req.body.title || existingFeatured.title;

      existingFeatured.videoUrl =
        req.body.videoUrl || existingFeatured.videoUrl;

      // update images only if uploaded
      if (imageUrls.length > 0) {
        existingFeatured.images = imageUrls;
      }

      await existingFeatured.save();

      return res.status(200).json({
        success: true,
        message: "Featured updated successfully",
        data: existingFeatured
      });
    }

    // create new
    const newFeatured = new Featured({
      title: req.body.title || "",
      videoUrl: req.body.videoUrl || "",
      images: imageUrls
    });

    await newFeatured.save();

    res.status(201).json({
      success: true,
      message: "Featured added successfully",
      data: newFeatured
    });

  } catch (error) {

    console.log("Featured Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getFeatured = async (req, res) => {
  try {

    const data = await Featured.findOne();

    if (!data) {
      return res.status(200).json({
        success: true,
        images: []
      });
    }

    res.status(200).json(data);

  } catch (error) {

    console.log("Get Featured Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  addFeatured,
  getFeatured
};
