const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false,
        default: 'Anonymous',
        trim: true
    }}, 
    { 
        timestamps: true,
        collection: 'posts'
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;