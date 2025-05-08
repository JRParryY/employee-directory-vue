# Employee Directory Application

A full-stack application built with Vue.js, Node.js, Express, and MongoDB.

## Features

- Multi-page application with Vue Router:
  - Home/Welcome page
  - Employee Directory page
  - About page
- Responsive navigation with hamburger menu on mobile
- Browse employees with pagination
- Search employees by name
- View detailed employee information
- Add new employees
- Delete employees
- Responsive design for all screen sizes
- Consistent footer with contact information

## Project Structure

The project is organized into two main folders:

- `jo_vue/` - Frontend Vue.js application
- `jo_node/` - Backend Node.js/Express API

## Setup Instructions

### Backend Setup (jo_node)

1. Navigate to the backend directory:
   ```
   cd jo_node
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The backend will run on http://localhost:5001.

### Frontend Setup (jo_vue)

1. Navigate to the frontend directory:
   ```
   cd jo_vue
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run serve
   ```

The frontend will run on http://localhost:8081.

## Technologies Used

- **Frontend**: Vue.js, Vue Router, CSS3, HTML5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Tools**: npm, Nodemon


# Misc

The application has been designed to meet the following criteria:

- Vue.js App Design: Clean and intuitive multi-page interface
- Color Combination: Teal (#1cbcb8) and dark teal (#004e54) with very light green background
- MongoDB Data Reflection: Complete employee records with additional fields
- Mobile View: Responsive design with hamburger menu navigation
- Desktop Layout: Clean and efficient use of space with optimized navigation
- Proper spacing and layout across all device sizes 