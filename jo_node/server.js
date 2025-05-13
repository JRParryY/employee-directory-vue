/**
 * Pure Node.js Server for Employee Directory Application
 * No Express.js dependency
 */

// Load environment variables from .env file
require('dotenv').config();

// Import core Node.js modules
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const { parse } = require('querystring');

// Import Mongoose for MongoDB connection
const mongoose = require('mongoose');
const Employee = require('./models/Employee');

// Define server port
const PORT = process.env.PORT || 5202;

// MongoDB connection URI
const mongoURI = 'mongodb+srv://jparr4:jparr4@cluster1.lqo9sxo.mongodb.net/employee_directory?retryWrites=true&w=majority&appName=Cluster1';

/**
 * Serve a file with the appropriate content type
 */
function serveFile(res, filePath) {
  // Get file extension to determine content type
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  
  // Set the correct content type based on file extension
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
  }
  
  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end('File not found');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
      return;
    }
    
    // Success - serve the file
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  // Parse the URL from the request
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Log request information
  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  // Set CORS headers to allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 204; // No content
    res.end();
    return;
  }

  // Handle API requests
  if (pathname.startsWith('/api')) {
    // API info endpoint
    if (pathname === '/api') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'API is running!' }));
      return;
    }
    
    // API endpoint for employees
    if (pathname === '/api/employees') {
      switch (req.method) {
        case 'GET':
          try {
            // Try to fetch employees from MongoDB
            const employees = await Employee.find();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(employees));
          } catch (err) {
            console.error('Error fetching employees from MongoDB:', err);
            
            // Fallback to static JSON file
            fs.readFile(path.join(__dirname, 'public', 'api', 'employees.json'), (err, data) => {
              if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error reading employees data' }));
                return;
              }
              
              // Parse the JSON file
              const employeesData = JSON.parse(data);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(employeesData));
            });
          }
          break;
          
        case 'POST':
          // Handle POST request to create a new employee
          let body = '';
          
          // Collect data chunks
          req.on('data', chunk => {
            body += chunk.toString();
          });
          
          // Process the complete request body
          req.on('end', async () => {
            try {
              // Parse the request body as JSON
              const employeeData = JSON.parse(body);
              
              // Create a new Employee document
              const employee = new Employee({
                name: employeeData.name,
                jobTitle: employeeData.jobTitle,
                department: employeeData.department,
                email: employeeData.email,
                manager: employeeData.manager,
                team: employeeData.team,
                currentProject: employeeData.currentProject,
                yearsInCompany: employeeData.yearsInCompany
              });
              
              // Save to database
              const newEmployee = await employee.save();
              
              // Send response
              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(newEmployee));
            } catch (err) {
              console.error('Error creating employee:', err);
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: err.message }));
            }
          });
          break;
          
        default:
          // Method not allowed
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Method Not Allowed' }));
      }
      return;
    } 
    
    // Handle DELETE /api/employees/:id
    if (pathname.match(/^\/api\/employees\/[^\/]+$/)) {
      if (req.method === 'DELETE') {
        try {
          // Extract the employee ID from the URL
          const id = pathname.split('/').pop();
          
          // Delete the employee from MongoDB
          const employee = await Employee.findByIdAndDelete(id);
          
          // Check if employee was found
          if (!employee) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Employee not found' }));
            return;
          }
          
          // Send success response
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Deleted successfully' }));
        } catch (err) {
          console.error('Error deleting employee:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: err.message }));
        }
      } else {
        // Method not allowed
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
      }
      return;
    }
  }
  
  // Serve portfolio website at root
  if (pathname === '/' || pathname === '/index.html') {
    serveFile(res, path.join(__dirname, 'public', 'portfolio.html'));
    return;
  }
  
  // Handle Employee Directory app route
  if (pathname === '/employees' || pathname.startsWith('/employees/')) {
    // Serve the Vue app
    serveFile(res, path.join(__dirname, 'public', 'vue_app', 'index.html'));
    return;
  }
  
  // Check if file exists in public directory
  const filePath = path.join(__dirname, 'public', pathname);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Check if file exists in vue_app directory
      const vueFilePath = path.join(__dirname, 'public', 'vue_app', pathname);
      fs.access(vueFilePath, fs.constants.F_OK, (vueErr) => {
        if (vueErr) {
          res.writeHead(404);
          res.end('File not found');
          return;
        }
        serveFile(res, vueFilePath);
      });
      return;
    }
    
    // If the path is a directory, reject it
    fs.stat(filePath, (err, stats) => {
      if (err) {
        res.writeHead(500);
        res.end('Error checking file');
        return;
      }
      
      if (stats.isDirectory()) {
        res.writeHead(404);
        res.end('Not a file');
        return;
      }
      
      serveFile(res, filePath);
    });
  });
});

// Connect to MongoDB
console.log('🔌 Connecting to MongoDB...');

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Start the server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.log('⚠️ Starting server without MongoDB connection. Some features may not work.');
    
    // Start the server anyway so at least the static files work
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without MongoDB)`);
    });
  }); 