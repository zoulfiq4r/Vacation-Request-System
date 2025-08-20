// Import navigation and hooks from React Router and React
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Define and export the HRDashboard component
export default function HRDashboard() {
  const navigate = useNavigate(); // Used to redirect the user

  // Function to log out the HR Manager
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear logged-in user from localStorage
    navigate("/"); // Redirect to login page
  };

  // State to hold vacation requests that need HR Manager's attention
  const [requests, setRequests] = useState([]);

  // Fetch vacation requests from the backend and filter only those pending at HR
  const fetchRequests = async () => {
    const res = await fetch("http://localhost:3001/requests"); // Call backend API
    const data = await res.json(); // Convert response to JSON
    setRequests(data.filter((r) => r.status === "Pending at HR Manager")); // Filter relevant requests
  };

  // Handle approve or reject actions by HR Manager
  const handleAction = async (id, action) => {
    const res = await fetch("http://localhost:3001/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role: "HR Manager", action }), // Specify role and action
    });

    const data = await res.json(); // Parse server response
    alert(data.message);           // Show response message to user
    fetchRequests();               // Refresh the request list
  };

  // Run fetchRequests on first render to load initial data
  useEffect(() => {
    fetchRequests();
  }, []);

  // Render the dashboard interface
  return (
    <div>
      <h2>HR Manager Dashboard</h2>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>

      {/* Show message if no requests are pending */}
      {requests.length === 0 ? (
        <p>No requests awaiting HR approval</p>
      ) : (
        // Map and display all relevant requests
        requests.map((req) => (
          <div key={req.id} className="request-card">
            <p><strong>Employee:</strong> {req.name}</p>
            <p><strong>Reason:</strong> {req.reason}</p>
            <p><strong>Days:</strong> {req.days}</p>
            <p><strong>Status:</strong> {req.status}</p>

            {/* Approve and Reject buttons */}
            <button onClick={() => handleAction(req.id, "approve")}>Approve</button>
            <button onClick={() => handleAction(req.id, "reject")}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
}
