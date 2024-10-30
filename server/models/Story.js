const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
    name: String,
    description: String,
    view: Number,
    authors: [String],
    status: Boolean,
    image: Buffer,
    created_at: { type : Date, default: Date.now },
    updated_at: { type : Date, default: Date.now },
    chapters: [String],
    categories: [String],
    user_reading: [String],
    user_follow: [String]
}, { versionKey: false }
);

const storyModel = mongoose.model("Story", storySchema)
module.exports = storyModel