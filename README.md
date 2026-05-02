# DevBlog - Backend REST API
## Links

**Live URL:** https://devblog-dc16.onrender.com

**GitHub:** https://github.com/Hemant123-ks/Devblog

A full-featured blog backend built with Node.js, Express.js, and MongoDB.

## Features
- User registration with bcrypt password hashing
- JWT authentication and login
- Protected routes with auth middleware
- Full CRUD on blog posts
- Ownership checks (users can only edit/delete their own posts)
- Mongoose populate for relational data fetching

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt

## API Endpoints

### Auth
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and get token

### Posts
- GET /api/posts - Get all posts
- GET /api/posts/:id - Get single post
- POST /api/posts - Create post (protected)
- PUT /api/posts/:id - Update post (protected)
- DELETE /api/posts/:id - Delete post (protected)

## Setup
1. Clone the repo
2. Run npm install
3. Add .env file with MONGO_URI and JWT_SECRET
4. Run npm start