const mongoose = require("mongoose");
const commentschema = new mongoose.Schema({
    commentator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    comment: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }


})
module.exports = mongoose.model("comment", commentschema);