

# Gapshap

GapShap is a real-time messaging application built with the MERN stack (MongoDB, Express, React, Node.js). The app utilizes JWT for user authentication, Cloudinary for image storage, and Socket.io for real-time chat functionality.

## Features
- User authentication using JWT
- Real-time messaging with Socket.io
- Image upload and storage via Cloudinary
- MongoDB database for storing user data and messages
- Responsive and intuitive UI

## Technologies Used
- **Frontend:** React.js, Axios, Socket.io-client
- **Backend:** Node.js, Express, Socket.io, JWT
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Image Storage:** Cloudinary

## Setup & Installation

### 1. Clone the repository

git clone https://github.com/WannabeDeva/GapShaprepo.git
cd gapshap

# Step 2: Install dependencies

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Step 3: Configure Environment Variables

# Backend (create .env file in backend directory)
contents in env:
- PORT=5001
- MONGO_URI=your_mongodb_uri
- JWT_SECRET=your_key
- NODE_ENV=development
- CLOUDINARY_CLOUD_NAME=your_cloudinary_name
- CLOUDINARY_API_KEY=your_cloudinary_api_key
- CLOUDINARY_API_SECRET=your_cloudinary_api_scret

# Step 4: Running the Application

# To run the Backend
cd backend
npm run dev

# To run the Frontend
cd ../frontend
npm run dev
