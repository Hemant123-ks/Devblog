const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const Post = require("../models/Post.js");

const router = express.Router();

router.post("/", protect, async(req, res) => {
    try {

        const { title, content } = req.body;
        const author = req.user2.userId;
        const post = await Post.create({ title, content, author });
        res.status(201).json({ message: "post created", post });

    } catch (err) {
        res.status(500).json({ message: "server error", error: err.message });
    }
})
router.get("/", async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || "";

        const poat = await Post.find({
            title: { $regex: search, $options: "i" }
        }).sort({ createdAt: -1 }).skip(skip).limit(limit);

        const total = await Post.countDocuments({ title: { $regex: search, $options: "i" } });
        res.status(200).json({
            posts: poat,
            currentpage: page,
            totalpages: Math.ceil(total / limit),
            totalPosts: total
        })
    } catch (err) {
        res.status(500).json({ message: "error found", error: err.message });
    }
})
router.get("/:_id", async(req, res) => {
    try {
        const poat = await Post.findById(req.params._id).populate("author", "-password");
        if (!poat) {
            return res.status(404).json({ message: "not found" });
        }
        res.status(200).json(poat);



    } catch (err) {
        res.status(500).json({ message: "error found", error: err.message });
    }
})
router.put("/:_id", protect, async(req, res) => {
    try {
        const post = await Post.findById(req.params._id);
        if (!post) {
            return res.status(404).json({ message: " not found" });
        }
        if (post.author.toString() != req.user2.userId) {
            return res.status(403).json({ message: "not allowed" });
        }
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.status(200).json({ message: "post updated" });



    } catch (err) {
        res.status(500).json({ message: "error found", error: err.message });
    }
})
router.delete("/:_id", protect, async(req, res) => {
    try {
        const del = await Post.findById(req.params._id);


        if (!del) {
            return res.status(404).json({ message: "wrong request" });
        }
        if (del.author.toString() != req.user2.userId) {
            return res.status(403).json({ message: "wrong " });
        }
        await del.deleteOne();
        res.status(200).json({ message: "post deleted" });

    } catch (err) {
        res.status(500).json({ message: "error found", error: err.message });
    }
})

module.exports = router;