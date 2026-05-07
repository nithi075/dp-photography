const Gallery = require("../models/Gallery");

const addGallery = async (req, res) => {
  try {

    console.log(req.body);
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    const data = new Gallery({
      title: req.body.title || "",
      category: req.body.category || "",
      imageUrl: req.file.path // Cloudinary URL
    });

    await data.save();

    res.status(201).json({
      success: true,
      message: "Gallery uploaded successfully",
      data
    });

  } catch (error) {

    console.log("Gallery Upload Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getGallery = async (req, res) => {
  try {

    const data = await Gallery.find();

    res.status(200).json(data);

  } catch (error) {

    console.log("Get Gallery Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const deleteGallery = async (req, res) => {
  try {

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {

    console.log("Delete Gallery Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  addGallery,
  getGallery,
  deleteGallery
};
