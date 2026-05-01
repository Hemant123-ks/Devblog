const mongoose = require("mongoose");
const connectdb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("connection happened", conn.connection.host);

    } catch (err) {
        console.error("error happened", err);
        process.exit(1);
    }

}
module.exports = connectdb;