const mongoose = require('mongoose')

const categroySchema = new mongoose.Schema({
    name: String,
    description: String,
    stories: [String]
}, { versionKey: false }
);

const categoryModel = mongoose.model("Category", categroySchema)
module.exports = categoryModel