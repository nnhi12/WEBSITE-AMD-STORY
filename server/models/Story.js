const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
    name: String,
    description: String,
    view: Number,
    status: Boolean,
    image: Buffer,
    created_at: Date,
    updated_at: Date,
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
    categories: [String],
    user_reading: [String],
    user_follow: [String]
}, { versionKey: false }
);

const storyModel = mongoose.model("Story", storySchema)
module.exports = storyModel