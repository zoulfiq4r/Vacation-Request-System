const express = require('express'); // Express framework for handling HTTP requests
const cors = require('cors');       // Middleware to allow Cross-Origin requests

const app = express();             // Create an Express application
app.use(cors());                   // Enable CORS for all routes
app.use(express.json());           // Automatically parse JSON in request bodies

// Import nodemailer for sending emails
const nodemailer = require('nodemailer');

// Setup email transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'einarwhitehat@gmail.com',       // Sender Gmail address
    pass: 'jmoh oaok zqed oakr ',          // App password (not the real Gmail password)
  },
});

// In-memory storage for vacation requests
let vacationRequests = [];

// Endpoint to submit a new vacation request
app.post('/submit', (req, res) => {
  const request = {
    id: vacationRequests.length + 1,   // Auto-incrementing request ID
    employeeId: req.body.employeeId,   // ID of the employee making the request
    email: req.body.email,            // Email address for notification
    ...req.body,                      // Spread the remaining request fields (like name, reason, days)
    status: 'Pending at Manager',     // Initial status
  };

  vacationRequests.push(request);     // Add the request to the array
  res.status(200).json({ message: 'Request submitted', request }); // Respond with success
});

// Endpoint to fetch all vacation requests
app.get('/requests', (req, res) => {
  res.json(vacationRequests); // Return all requests as JSON
});

// Endpoint to approve or reject a vacation request
app.post('/approve', async (req, res) => {
  const { id, role, action } = req.body; // Extract request ID, user role, and action (approve/reject)
  
  // Find the vacation request by ID
  const request = vacationRequests.find((r) => r.id === id);
  if (!request) return res.status(404).json({ message: 'Request not found' });

  // Logic based on user role and current status
  if (role === 'Manager' && request.status === 'Pending at Manager') {
    request.status = action === 'approve' ? 'Pending at Chief Manager' : 'Rejected by Manager';
  } else if (role === 'Chief Manager' && request.status === 'Pending at Chief Manager') {
    request.status = action === 'approve' ? 'Pending at HR Manager' : 'Rejected by Chief Manager';
  } else if (role === 'HR Manager' && request.status === 'Pending at HR Manager') {
    request.status = action === 'approve' ? 'Accepted' : 'Rejected by HR Manager';

    // If approved by HR Manager, send a confirmation email to the employee
    if (request.status === 'Accepted') {
      try {
        await transporter.sendMail({
          from: 'einarwhitehat@gmail.com',     // Sender email
          to: request.email,                   // Recipient email
          subject: 'Vacation Request Approved',
          text: `Hello ${request.name || request.employeeId},\n\nYour vacation request has been approved by all managers.\n\nDetails:\nReason: ${request.reason}\nDays: ${request.days}\n\nBest regards,\nYour Company`,
        });
        console.log('Approval email sent to:', request.email);
      } catch (error) {
        console.error('Failed to send email:', error); // Log any email errors
      }
    }
  }

  res.json({ message: 'Request updated', request }); // Send the updated request back as response
});

// Start the server on port 3001
app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
