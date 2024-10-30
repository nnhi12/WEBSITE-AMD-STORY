const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    account: String,
    fullname: String,
    image: { type: Buffer, default: Buffer.from('') },
    age: { type: Number, default: 0 }, // Đặt về 0 nếu không có độ tuổi
    email: String,
    comments: { type: [String], default: [] },
    story_reading: { type: [String], default: [] },
    story_following: { type: [String], default: [] }
}, { versionKey: false }
);

const userModel = mongoose.model("User", userSchema)
module.exports = userModel