# WEB322-app

This project is a web-based blog application allowing users to view, add, and manage blog posts. It includes user authentication, post management, and category features.

# Files and Modules

# 1. `auth.services.js`

Handles user authentication using MongoDB. It includes functions to initialize the connection, register a new user, and check user credentials for login.

- `initialize()`: Initializes the MongoDB connection.
- `registerUser(userData)`: Registers a new user, encrypting the password.
- `checkUser(userData)`: Checks user credentials during login.

# 2. `blog-service.js`

Manages blog-related functionalities using Sequelize for PostgreSQL. It includes functions for post and category management.

- `initialize()`: Initializes the PostgreSQL connection.
- `getAllPosts()`, `getPublishedPosts()`: Retrieves all or published posts.
- `getCategories()`: Retrieves all categories.
- `addPost(postData)`: Adds a new blog post.
- `getPostById(id)`: Retrieves a blog post by ID.
- `getPostsByCategory(category)`: Retrieves posts by category.
- `getPostsByMinDate(minDate)`: Retrieves posts by minimum date.
- `addCategory(categoryData)`: Adds a new category.
- `deleteCategoryById(id)`: Deletes a category by ID.
- `deletePostById(id)`: Deletes a post by ID.

# 3. `server.js`

Includes routes for handling user requests, rendering views, and interacting with the blog and authentication services.

- Defines routes for handling blog-related operations such as viewing, adding, and deleting posts and categories.
- Implements user authentication and session management.
- Renders views using Handlebars templates.
- Uses Cloudinary for image upload.
- Includes middleware for ensuring user login.

# 4. `views` folder

Contains Handlebars templates for rendering HTML views.

# 5. `node_modules` folder

Contains Node.js modules and dependencies required for the project.

# 6. `package.json` and `package-lock.json`

