const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./path/to/your-firebase-adminsdk.json");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Example route to send a notification
// app.post("/send-notification", async (req, res) => {
//   const { token, title, body } = req.body;

//   try {
//     const message = {
//       notification: {
//         title,
//         body,
//       },
//       token: token,
//     };

//     const response = await admin.messaging().send(message);
//     console.log("Successfully sent message:", response);
//     res
//       .status(200)
//       .json({ success: true, message: "Notification sent successfully" });
//   } catch (error) {
//     console.log("Error sending message:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to send notification" });
//   }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
