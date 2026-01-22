const API_URL = 'http://localhost:3000/blogs';

const blogForm = document.getElementById('blog-form');
const blogIdInput = document.getElementById('blog-id');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const bodyInput = document.getElementById('body');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const blogsContainer = document.getElementById('blogs-container');
const refreshBtn = document.getElementById('refresh-btn');
const toast = document.getElementById('toast');


document.addEventListener('DOMContentLoaded', () => {
    loadBlogs();
});


function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}


async function loadBlogs() {
    try {
        blogsContainer.innerHTML = '<p class="loading">Loading blogs...</p>';
        
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            displayBlogs(result.data);
        } else {
            blogsContainer.innerHTML = `
                <div class="empty-state">
                    <p> No blog posts yet</p>
                    <p>Create your first blog post!</p>
                </div>
            `;
        }
    } catch (err) {
        console.error('Error loading blogs:', err);
        blogsContainer.innerHTML = '<p class="loading">Error loading blogs</p>';
        showToast('Error loading blogs', 'error');
    }
}


function displayBlogs(blogs) {
    blogsContainer.innerHTML = '';
    
    blogs.forEach(blog => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        
        const createdDate = new Date(blog.createdAt).toLocaleString();
        const updatedDate = new Date(blog.updatedAt).toLocaleString();
        
        blogCard.innerHTML = `
            <h3>${escapeHtml(blog.title)}</h3>
            <p class="author">By ${escapeHtml(blog.author)}</p>
            <p class="body">${escapeHtml(blog.body)}</p>
            <p class="meta">
                Created: ${createdDate} ${blog.createdAt !== blog.updatedAt ? `| Updated: ${updatedDate}` : ''}
            </p>
            <div class="actions">
                <button class="btn btn-edit" onclick="editBlog('${blog._id}')">Edit</button>
                <button class="btn btn-delete" onclick="deleteBlog('${blog._id}')">Delete</button>
            </div>
        `;
        
        blogsContainer.appendChild(blogCard);
    });
}


function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


blogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const blogId = blogIdInput.value;
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const body = bodyInput.value.trim();
    
    if (!title) {
        showToast('Title is required!', 'error');
        return;
    }

    if (!body) {
        showToast('Body is required!', 'error');
        return;
    }
    
    const blogData = {
        title,
        body,
        author: author || 'Anonymous'
    };
    
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = blogId ? 'Updating...' : 'Creating...';
        
        let response;
        if (blogId) {
            response = await fetch(`${API_URL}/${blogId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blogData)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blogData)
            });
        }
        
        const result = await response.json();
        
        if (result.success) {
            showToast(result.message, 'success');
            resetForm();
            loadBlogs();
        } else {
            showToast(result.message || 'Operation failed', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error saving blog post', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = blogId ? 'Update Blog Post' : 'Create Blog Post';
    }
});


async function editBlog(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();
        
        if (result.success) {
            const blog = result.data;
            
            blogIdInput.value = blog._id;
            titleInput.value = blog.title;
            authorInput.value = blog.author;
            bodyInput.value = blog.body;
            
            formTitle.textContent = 'Edit Blog Post';
            submitBtn.textContent = 'Update Blog Post';
            cancelBtn.style.display = 'block';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            showToast('Error loading blog for editing', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error loading blog for editing', 'error');
    }
}


async function deleteBlog(id) {
    if (!confirm('Are you sure you want to delete this blog post?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showToast(result.message, 'success');
            loadBlogs();
        } else {
            showToast(result.message || 'Delete failed', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error deleting blog post', 'error');
    }
}

function resetForm() {
    blogForm.reset();
    blogIdInput.value = '';
    formTitle.textContent = 'Create New Blog Post';
    submitBtn.textContent = 'Create Blog Post';
    cancelBtn.style.display = 'none';
}

cancelBtn.addEventListener('click', resetForm);

refreshBtn.addEventListener('click', loadBlogs);