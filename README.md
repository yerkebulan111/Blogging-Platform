# Simple Blogging Platform

A full-stack blogging application built with Node.js, Express, MongoDB, and JavaScript. Create, read, update, and delete blog posts with a clean and intuitive interface.

## Features

- **Create Blog Posts** - Write blog posts with title, author, and body content
- **View All Posts** - Browse all blog posts in a clean, card-based layout
- **Edit Posts** - Update existing blog posts with ease
- **Delete Posts** - Remove blog posts with confirmation
- **Real-time Feedback** - Toast notifications for all actions
- **Responsive Design** - Works seamlessly across devices
- **Timestamps** - Automatic tracking of creation and update times

## Tech Stack

**Frontend:**
- HTML5
- CSS3
- JavaScript

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose ODM

## Project Structure

```
blogging-platform/
├── models/
│   └── Blog.js           # Mongoose schema for blog posts
├── public/
│   ├── index.html        # Main HTML file
│   ├── style.css         # Stylesheet
│   └── script.js         # Frontend JavaScript
├── .env                  # Environment variables (MongoDB URI)
├── index.js              # Express server and API routes
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB installation)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd simple-blogging-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster_address.mongodb.net/db_name?retryWrites=true&w=majority
   ```
   
   Replace the placeholders:
   - `username` - Your MongoDB username
   - `password` - Your MongoDB password
   - `cluster_address` - Your cluster address
   - `db_name` - Your database name

4. **Start the server**
   
   For development (with auto-restart):
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to: `http://localhost:3000`

## API Endpoints

### Blog Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Get all blog posts |
| GET | `/blogs/:id` | Get a single blog post |
| POST | `/blogs` | Create a new blog post |
| PUT | `/blogs/:id` | Update a blog post |
| DELETE | `/blogs/:id` | Delete a blog post |

### Request/Response Examples

**Create a Blog Post**
```javascript
POST /blogs
Content-Type: application/json

{
  "title": "My First Blog Post",
  "author": "John Doe",
  "body": "This is the content of my blog post."
}

Response:
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "_id": "...",
    "title": "My First Blog Post",
    "author": "John Doe",
    "body": "This is the content of my blog post.",
    "createdAt": "2025-01-22T10:30:00.000Z",
    "updatedAt": "2025-01-22T10:30:00.000Z"
  }
}
```

## Database Schema

**Blog Model** (`posts` collection)

```javascript
{
  title: String (required),
  body: String (required),
  author: String (default: "Anonymous"),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Usage

1. **Creating a Post**
   - Fill in the title (required)
   - Optionally add an author name (defaults to "Anonymous")
   - Write your blog content in the body field (required)
   - Click "Create Blog Post"

2. **Editing a Post**
   - Click the "Edit" button on any blog card
   - Modify the content in the form
   - Click "Update Blog Post"
   - Click "Cancel Edit" to discard changes

3. **Deleting a Post**
   - Click the "Delete" button on any blog card
   - Confirm the deletion in the popup dialog

4. **Refreshing Posts**
   - Click the "Refresh" button to reload all blog posts

## Features in Detail

### Form Validation
- Title and body fields are required
- Client-side and server-side validation
- User-friendly error messages

### Toast Notifications
- Success notifications (green)
- Error notifications (red)
- Auto-dismiss after 3 seconds

### Security
- HTML escaping to prevent XSS attacks
- MongoDB ObjectId validation
- Error handling for all operations

### User Experience
- Smooth scrolling to form when editing
- Loading states during operations
- Empty state message when no posts exist
- Hover effects and animations
- Responsive button states

## Development

**Dependencies:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable management

**Dev Dependencies:**
- `nodemon` - Auto-restart server on file changes

## Troubleshooting

**MongoDB Connection Error:**
- Verify your MongoDB URI in `.env` file
- Check network access in MongoDB Atlas
- Ensure your IP address is whitelisted

**Port Already in Use:**
- Change the PORT variable in `index.js` if port 3000 is occupied

**Posts Not Loading:**
- Check browser console for errors
- Verify the API server is running
- Check MongoDB connection status
