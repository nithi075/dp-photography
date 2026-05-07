const Testimonial = require("../models/Testimonial");

// Add testimonial
exports.addTestimonial = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    const data = new Testimonial({
      clientName: req.body.clientName || "",
      review: req.body.review || "",
      imageUrl: req.file.path // Cloudinary URL
    });

    await data.save();

    res.status(201).json({
      success: true,
      message: "Testimonial uploaded successfully",
      data
    });

  } catch (error) {

    console.log("Testimonial Upload Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get all testimonials
exports.getTestimonial = async (req, res) => {
  try {

    const data = await Testimonial.find();

    res.status(200).json(data);

  } catch (error) {

    console.log("Get Testimonial Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Delete testimonial
exports.deleteTestimonial = async (req, res) => {
  try {

    await Testimonial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (error) {

    console.log("Delete Testimonial Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
