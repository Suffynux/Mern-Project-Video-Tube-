# VideoTube Platform

A robust backend API for a video sharing platform built with Node.js, Express, and MongoDB. VideoTube allows users to upload, view, like, and comment on videos with a comprehensive set of features similar to YouTube.

![VideoTube Banner](https://via.placeholder.com/1200x300?text=VideoTube+Platform)

## 🌟 Features

- **User Authentication**
  - Register, login, and logout functionality
  - JWT-based authentication with access and refresh tokens
  - Password reset and email verification

- **Video Management**
  - Upload videos with thumbnails
  - Update video details
  - Delete videos
  - Toggle video publish status

- **Engagement Features**
  - Like/dislike videos
  - Add comments to videos
  - Reply to comments
  - Subscribe to channels

- **User Profile**
  - Customizable user profiles
  - Profile picture and cover image
  - Channel statistics

- **Content Discovery**
  - Search videos by title, description, or tags
  - View trending and recommended videos
  - Browse videos by category

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Environment Variables**: dotenv
- **API Testing**: Postman

## ⚙️ Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Suffynux/Mern-Project-Video-Tube-.git
   cd Mern-Project-Video-Tube-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users/register` | Register a new user |
| POST | `/api/v1/users/login` | Login user |
| POST | `/api/v1/users/logout` | Logout user |
| POST | `/api/v1/users/refresh-token` | Refresh access token |

### Video Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/videos` | Get all videos |
| GET | `/api/v1/videos/:videoId` | Get video by ID |
| POST | `/api/v1/videos` | Upload a new video |
| PATCH | `/api/v1/videos/:videoId` | Update video details |
| DELETE | `/api/v1/videos/:videoId` | Delete a video |

### Comment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/videos/:videoId/comments` | Get all comments for a video |
| POST | `/api/v1/videos/:videoId/comments` | Add a comment to a video |
| PATCH | `/api/v1/comments/:commentId` | Update a comment |
| DELETE | `/api/v1/comments/:commentId` | Delete a comment |

### User and Subscription Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users/channel/:username` | Get channel details |
| GET | `/api/v1/users/history` | Get watch history |
| POST | `/api/v1/subscriptions/toggle/:channelId` | Toggle subscription |
| GET | `/api/v1/subscriptions/subscribers` | Get subscribers |

## 🏗️ Project Structure

```
/
├── src/
│   ├── controllers/    # Route controllers
│   ├── db/             # Database connection and configuration
│   ├── middlewares/    # Custom middlewares
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions and classes
│   ├── app.js          # Express app setup
│   └── index.js        # Entry point
├── .env                # Environment variables (not in repo)
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## 📝 Roadmap

- [ ] Add real-time notifications using Socket.io
- [ ] Implement video recommendations algorithm
- [ ] Add playlist functionality
- [ ] Integrate payment gateway for premium content
- [ ] Develop admin dashboard
- [ ] Add analytics for content creators

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

Suffynux - [GitHub Profile](https://github.com/Suffynux)

Project Link: [https://github.com/Suffynux/Mern-Project-Video-Tube-](https://github.com/Suffynux/Mern-Project-Video-Tube-)