// Import hooks and navigation from React and React Router
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Import the VacationForm component
import VacationForm from "../components/VacationForm";

// Define and export the EmployeeDashboard component
export default function EmployeeDashboard() {
  const navigate = useNavigate(); // Used for navigating to other routes
  const [requests, setRequests] = useState([]); // State to hold vacation requests

  // Retrieve the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "Employee"; // Default to "Employee" if not found

  // Function to log out the user
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user from storage
    navigate("/"); // Redirect to login page
  };

  // Function to fetch vacation requests from the backend
  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:3001/requests"); // Call backend API
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`); // Handle bad response
      }
      const data = await res.json(); // Parse JSON response
      setRequests(data); // Update state with request data
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  // useEffect to fetch requests initially and set up auto-refresh every 5 seconds
  useEffect(() => {
    fetchRequests(); // Fetch once on mount

    const intervalId = setInterval(() => {
      fetchRequests(); // Repeat every 5 seconds
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Check if this employee has an "Accepted" vacation request
  const accepted = requests.some(
    (r) => r.employeeId === username && r.status === "Accepted"
  );

  // Check if the employee already submitted a request that is still pending
  const alreadyRequested = requests.some(
    (r) =>
      r.employeeId === username &&
      r.status !== "Accepted" &&
      !r.status.startsWith("Rejected")
  );

  // Render the UI
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <p>Welcome, {username}! Submit your vacation request below.</p>

      {/* Conditional display based on request status */}
      {accepted ? (
        <div style={{ color: "green", fontWeight: "bold", marginTop: "1em" }}>
          ✅ Your vacation request was approved by all managers!
        </div>
      ) : alreadyRequested ? (
        <div style={{ color: "orange", fontWeight: "bold", marginTop: "1em" }}>
          ⏳ Your vacation request is being processed. Please wait for approval.
        </div>
      ) : (
        // Show the request form only if the employee hasn’t already submitted one
        <VacationForm />
      )}

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
