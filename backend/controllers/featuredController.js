const Featured = require("../models/Featured");

const addFeatured = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images are required"
      });
    }

    const imageUrls = req.files.map(
      (file) => file.path
    );

    let existingFeatured =
      await Featured.findOne();

    if (existingFeatured) {

      existingFeatured.title =
        req.body.title;

      existingFeatured.videoUrl =
        req.body.videoUrl;

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

    const newFeatured =
      new Featured({
        title: req.body.title,
        videoUrl:
          req.body.videoUrl,
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

module.exports = {
  addFeatured
};
