const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config()

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const Blog = require('./models/Blog');


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });



app.post('/blogs', async (req, res) => {
  try {
    const { title, body, author } = req.body;

    
    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Title is required field'
      });
    }

    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Body is required field'
      });
    }

    const blog = new Blog({
      title,
      body,
      author: author || 'Anonymous'
    });

    const savedBlog = await blog.save();
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: savedBlog
    });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: err.message
    });
  }
});


app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Blogs retrieved successfully',
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});


app.get('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID',
        message: 'The provided blog ID is not valid'
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog retrieved successfully',
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});


app.put('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, author } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID',
        message: 'The provided blog ID is not valid'
      });
    }

    
    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Title is required field'
      });
    }

    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Body is required field'
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, body, author },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedBlog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});


app.delete('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID',
        message: 'The provided blog ID is not valid'
      });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
      data: deletedBlog
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});