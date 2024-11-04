const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
    name: String,
    content: String,
    view: Number,
    status: Boolean,
    created_at: { type : Date, default: Date.now },
    updated_at: { type : Date, default: Date.now },
    comments: [String]
}, { versionKey: false }
);

const chapterModel = mongoose.model("Chapter", chapterSchema)
module.exports = chapterModel