const Featured = require("../models/Featured");

const addFeatured = async (
  req,
  res
) => {
  try {
    // New uploaded images
    const imageUrls =
      req.files.map(
        (file) => file.path
      );

    let existingFeatured =
      await Featured.findOne();

    // UPDATE
    if (existingFeatured) {
      existingFeatured.title =
        req.body.title;

      existingFeatured.videoUrl =
        req.body.videoUrl;

      // Old + New images
      let updatedImages = [
        ...existingFeatured.images,
        ...imageUrls
      ];

      // Keep latest 8 only
      if (
        updatedImages.length > 8
      ) {
        updatedImages =
          updatedImages.slice(
            updatedImages.length - 8
          );
      }

      existingFeatured.images =
        updatedImages;

      await existingFeatured.save();

      return res.json({
        message:
          "Featured updated successfully",
        data: existingFeatured
      });
    }

    // CREATE
    const data = new Featured({
      title: req.body.title,
      videoUrl: req.body.videoUrl,
      images: imageUrls
    });

    await data.save();

    res.json({
      message:
        "Featured added successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getFeatured = async (
  req,
  res
) => {
  try {
    const data =
      await Featured.findOne();

    if (!data) {
      return res.json({
        message:
          "No featured data found",
        images: []
      });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  addFeatured,
  getFeatured
};
