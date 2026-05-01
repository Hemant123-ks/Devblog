const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken")

const router = express.Router();
router.post("/register", async(req, res) => {



    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        user.password = undefined;
        res.status(201).json({ message: "user registered successfully", user });
    } catch (err) {
        console.error("error found", err);
        res.status(500).json({ message: "server error", error: err.message });

    }


})
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: " wrong email" });

        }
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            return res.status(400).json({ message: "wrong password" });
        }
        const token = jwt.sign({ userId: user._id, email: user.email },
            process.env.JWT_SECRET, { expiresIn: "7d" }


        )
        res.status(200).json({
            message: "token created",
            token: token,
            user: {
                email: user.email
            }
        })


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: " database error", error: err.message });
    }

})




module.exports = router;