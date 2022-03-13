const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversation");
const messagesRoute = require("./routes/messages");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")))

//middleware
// app.use(cors);
app.use(express.json()); //parses the incoming JSON requests and puts the parsed data in req.body
app.use(helmet()); //securing HTTP headers that are returned by your Express apps
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "public/images")
  },
  filename : (req, file, cb)=>{
    cb(null, req.body.name)
  }
})

const upload = multer({storage : storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
  try{
    return res.status(200).json("file uploaded successfully")
  }catch(error){
    console.log(error);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messagesRoute);

app.listen(8800, () => {
  console.log("Backend server is running");
});
