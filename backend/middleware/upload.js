const multer = require("multer");

const {
  CloudinaryStorage
} = require(
  "multer-storage-cloudinary"
);

const cloudinary = require(
  "../config/cloudinary"
);

/* ================= CLOUDINARY STORAGE ================= */

const storage =
  new CloudinaryStorage({

    cloudinary: cloudinary,

    params: async (
      req,
      file
    ) => {

      // File extension
      const ext =
        file.originalname
          .split(".")
          .pop()
          .toLowerCase();

      // PDF upload
      if (ext === "pdf") {

        return {

          folder:
            "uploads/pdf",

          resource_type:
            "raw",

          public_id:
            Date.now() +
            "-" +
            file.originalname
              .replace(
                /\s+/g,
                "-"
              )
              .replace(
                /\.[^/.]+$/,
                ""
              ),
        };
      }

      // Image upload
      return {

        folder:
          "uploads/images",

        allowed_formats: [
          "jpg",
          "jpeg",
          "png",
          "webp",
        ],

        public_id:
          Date.now() +
          "-" +
          file.originalname
            .replace(
              /\s+/g,
              "-"
            )
            .replace(
              /\.[^/.]+$/,
              ""
            ),
      };
    },
  });

/* ================= FILE FILTER ================= */

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes =
    /jpg|jpeg|png|webp|pdf/;

  const ext =
    file.originalname
      .split(".")
      .pop()
      .toLowerCase();

  if (
    allowedTypes.test(ext)
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only images and PDF allowed"
      ),
      false
    );
  }
};

/* ================= EXPORT ================= */

module.exports = multer({

  storage: storage,

  fileFilter: fileFilter,

});