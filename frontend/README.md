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

git clone https://github.com/your-username/chatapp.git
cd chatapp

# Step 2: Install dependencies

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Step 3: Configure Environment Variables

# Backend (.env file in backend directory)
echo "JWT_SECRET=your_jwt_secret" >> backend/.env
echo "MONGO_URI=your_mongodb_uri" >> backend/.env
echo "CLOUDINARY_URL=your_cloudinary_url" >> backend/.env

# Frontend (.env file in frontend directory)
echo "REACT_APP_API_URL=http://localhost:5000/api" >> frontend/.env

# Step 4: Running the Application

# To run the Backend
cd backend
npm start &

# To run the Frontend
cd ../frontend
npm start
