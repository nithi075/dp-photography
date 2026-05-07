const Instagram = require("../models/Instagram");

const addInstagram = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    const data = new Instagram({
      title: req.body.title || "",
      postLink: req.body.postLink || "",
      imageUrl: req.file.path // Cloudinary URL
    });

    await data.save();

    res.status(201).json({
      success: true,
      message: "Instagram post added successfully",
      data
    });

  } catch (error) {

    console.log("Instagram Upload Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getInstagram = async (req, res) => {
  try {

    const data = await Instagram.find();

    res.status(200).json(data);

  } catch (error) {

    console.log("Get Instagram Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteInstagram = async (req, res) => {
  try {

    await Instagram.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (error) {

    console.log("Delete Instagram Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  addInstagram,
  getInstagram,
  deleteInstagram
};
