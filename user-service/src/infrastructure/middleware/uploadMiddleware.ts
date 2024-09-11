import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/photos");
  },
  filename: function (req, file, cb) {
    // Define the filename for your uploaded files
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});



// Middleware to handle file upload
export const uploadMiddleware = (req: any, res: any, next: any) => {
  console.log("Incoming request to upload middleware");
  console.log("Headers:", req.headers);

  // Log raw body chunks (for debugging purposes)
  req.on("data", (chunk: any) => {
    console.log("Raw body chunk:", chunk.toString());
  });

  // Log the end of the request data
  req.on("end", () => {
    console.log("Request ended");
  });

  // Handle file upload with Multer
  upload.single("resume")(req, res, (err) => {
    if (err) {
      console.error("Multer middleware error:", err);
      return res
        .status(500)
        .json({ success: false, message: "File upload error" });
    }

    // Log request body and uploaded file information
    console.log("File successfully processed by multer");
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    // Proceed to the next middleware or route handler
    next();
  });
};
