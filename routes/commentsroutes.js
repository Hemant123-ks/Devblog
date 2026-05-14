const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const Comment = require("../models/comments.js");
const router = express.Router();

router.post("/:postId", protect, async(req, res) => {
    try {
        const { comment } = req.body;
        const author = req.user2.userId;
        const pos = req.params.postId;
        const pos2 = await Comment.create({ commentator: author, comment, post: pos });
        res.status(201).json({ message: "comment created", pos2 });

    } catch (err) {
        res.status(500).json({ message: "server error", error: err.message });

    }
})
module.exports = router;