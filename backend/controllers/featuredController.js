const Featured = require("../models/Featured");

const addFeatured = async (req, res) => {
  try {
    // Cloudinary full URL
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

      return res.json({
        message:
          "Featured updated successfully",
        data: existingFeatured
      });
    }

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

const getFeatured = async (req, res) => {
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
