const cloudinary = require("cloudinary");

// config
cloudinary.config({
  cloud_name: "dxzuxhfwx",
  api_key: "316526268173872",
  api_secret: "0dkhdRbi5n6avVe4SIGUfhBT2PQ",
});

// req.files.file.path

exports.upload = async (req, res) => {
  try {
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto", // jpeg, png
    });
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.log("Cloudinary upload error", error);
    res.json({
      success: false,
      message: "Cannot upload image",
    });
  }
};

exports.remove = async (req, res) => {
  try {
    let image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (err, result) => {
      if (err) return res.json({ success: false, err });
      res.send({ success: true });
    });
  } catch (error) {
    console.log("Cloudinary remove error", error);
    res.json({
      success: false,
      message: "Cannot remove image",
    });
  }
};
