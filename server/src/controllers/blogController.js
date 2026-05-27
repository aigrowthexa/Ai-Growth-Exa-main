
const Blog = require("../models/Blog");

// CREATE BLOG
exports.createBlog = async (req, res) => {
    try {
        const imagePath = req.file
            ? `/uploads/blogs/${req.file.filename}`
            : "";

        const blog = await Blog.create({
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            author: req.body.author,
            tags: req.body.tags,
            image: imagePath,
            published: req.body.published
        });

        res.status(201).json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
};

// GET BLOG BY ID
exports.getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (req.file) {
            updateData.image = `/uploads/blogs/${req.file.filename}`;
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Blog deleted successfully" });
};

