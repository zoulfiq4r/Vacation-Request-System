// Import necessary hooks from React and React Router
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the Manager Dashboard component
export default function ManagerDashboard() {
  const navigate = useNavigate(); // Used for navigation
  const [requests, setRequests] = useState([]); // Store the vacation requests

  // Function to log the manager out and redirect to the login page
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove the logged-in user's data
    navigate("/"); // Redirect to the login page
  };

  // Fetch vacation requests from the backend and filter only the ones assigned to the Manager
  const fetchRequests = async () => {
    const res = await fetch("http://localhost:3001/requests"); // Send GET request to fetch requests
    const data = await res.json(); // Convert response to JSON
    // Only keep the ones with status "Pending at Manager"
    setRequests(data.filter((r) => r.status === "Pending at Manager"));
  };

  // Handle manager's decision (approve/reject) on a vacation request
  const handleAction = async (id, action) => {
    const res = await fetch("http://localhost:3001/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },  // Send JSON body
      body: JSON.stringify({ id, role: "Manager", action }), // Include request ID, role, and action
    });
    const data = await res.json(); // Convert response to JSON
    alert(data.message);           // Show confirmation message
    fetchRequests();               // Refresh the list after decision
  };

  // Load requests when component first mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  // Render the UI
  return (
    <div>
      <h2>Manager Dashboard</h2>
      <p>Welcome, Manager! Review the pending vacation requests below.</p>

      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>

      {/* Show message if no pending requests */}
      {requests.length === 0 ? (
        <p>No pending vacation requests</p>
      ) : (
        // Map and display each request as a card
        requests.map((req) => (
          <div
            key={req.id}
            className="request-card"
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <p><strong>Employee:</strong> {req.name}</p>
            <p><strong>Reason:</strong> {req.reason}</p>
            <p><strong>Days:</strong> {req.days}</p>
            <p><strong>Status:</strong> {req.status}</p>

            {/* Approve/Reject buttons with inline spacing */}
            <button
              onClick={() => handleAction(req.id, "approve")}
              style={{ marginRight: "5px" }}
            >
              Approve
            </button>
            <button onClick={() => handleAction(req.id, "reject")}>
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}
