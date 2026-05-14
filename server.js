require("dotenv").config();
const express = require("express");

const connectdb = require("./config/db.js");
const router = require("./routes/authRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const comment = require("./routes/commentsroutes.js");



connectdb();


const app = express();
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/posts", postRoutes);
app.use("/api/comment", comment);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("server is working");
});
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});