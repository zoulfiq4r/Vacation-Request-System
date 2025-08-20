// Import React hooks and React Router navigation
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Define and export the ChiefManagerDashboard component
export default function ChiefManagerDashboard() {
  const navigate = useNavigate(); // Used to redirect the user (e.g., logout)

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from storage
    navigate("/"); // Redirect to login page
  };

  // Local state to hold vacation requests assigned to Chief Manager
  const [requests, setRequests] = useState([]);

  // Function to fetch all vacation requests and filter those assigned to Chief Manager
  const fetchRequests = async () => {
    const res = await fetch("http://localhost:3001/requests"); // Call backend API
    const data = await res.json(); // Parse JSON response

    // Keep only requests that are "Pending at Chief Manager"
    setRequests(data.filter((r) => r.status === "Pending at Chief Manager"));
  };

  // Function to handle approve or reject actions on requests
  const handleAction = async (id, action) => {
    const res = await fetch("http://localhost:3001/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        role: "Chief Manager", // Indicate the role of the approver
        action,                // Action = "approve" or "reject"
      }),
    });

    const data = await res.json();  // Parse response
    alert(data.message);            // Show confirmation message
    fetchRequests();                // Refresh list after action
  };

  // Run fetchRequests when the component first mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  // Render the UI
  return (
    <div>
      <h2>Chief Manager Dashboard</h2>

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>

      {/* If there are no requests */}
      {requests.length === 0 ? (
        <p>No requests waiting</p>
      ) : (
        // Loop through each request and display it
        requests.map((req) => (
          <div key={req.id} className="request-card">
            <p><strong>Employee:</strong> {req.name}</p>
            <p><strong>Reason:</strong> {req.reason}</p>
            <p><strong>Days:</strong> {req.days}</p>
            <p><strong>Status:</strong> {req.status}</p>

            {/* Approve and Reject buttons for each request */}
            <button onClick={() => handleAction(req.id, "approve")}>Approve</button>
            <button onClick={() => handleAction(req.id, "reject")}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
}
