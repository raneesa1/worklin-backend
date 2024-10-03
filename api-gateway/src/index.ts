import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import proxy from "express-http-proxy";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:4200", // Your frontend URL
  credentials: true, // Allows credentials (cookies, authorization headers, etc.) to be included in the requests
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", proxy("http://localhost:3001"));
app.use("/user", proxy("http://localhost:3002"));
app.use("/job", proxy("http://localhost:3003"));
app.use("/chat", proxy("http://localhost:3004"));
app.use("/payment", proxy("http://localhost:3005"));
app.use("/notification", proxy("http://localhost:3006"));
 
app.listen(PORT, () => {
  console.log(`Gateway is listening on port: ${PORT}`);
});
