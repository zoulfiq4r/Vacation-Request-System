// Import useState hook from React to manage component state
import { useState } from "react";

// Define the VacationForm component
export default function VacationForm() {
  // Get the logged-in user data from browser's localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Extract the employee username (used as employeeId)
  const employeeLoginUsername = storedUser ? storedUser.username : ""; 

  // Define local state to hold form input values
  const [form, setForm] = useState({
    name: "",    // Full name input
    reason: "",  // Reason for vacation
    days: "",    // Number of vacation days
  });

  // Function to handle input changes
  const handleChange = (e) => {
    // Update the corresponding field in the form state
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // If no user is logged in, show an alert and stop submission
    if (!employeeLoginUsername) {
      alert("You must be logged in to submit a request.");
      return;
    }

    // Construct the full request object including email and employee ID
    const fullForm = {
      ...form,
      employeeId: employeeLoginUsername,
      email: storedUser.email, // Include user email for notifications
    };

    try {
      // Send the vacation request to the backend using fetch
      const res = await fetch("http://localhost:3001/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Tell server it's JSON
        body: JSON.stringify(fullForm), // Convert form data to JSON string
      });

      // If the request failed (non-200 response), handle the error
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }

      // Parse the successful response data
      const data = await res.json();

      // Show success message and reset the form
      alert(data.message);
      setForm({ name: "", reason: "", days: "" });
    } catch (error) {
      // Handle any errors during submission
      console.error("Error submitting vacation request:", error);
      alert(`Failed to submit request: ${error.message}`);
    }
  };

  // JSX returned from the component — this is what renders in the browser
  return (
    <div>
      <h3>Vacation Request Form</h3>

      {/* Input for full name */}
      <input
        type="text"
        name="name"
        placeholder="Your Full Name"
        value={form.name}
        onChange={handleChange}
      /><br />

      {/* Input for vacation reason */}
      <input
        type="text"
        name="reason"
        placeholder="Reason for Vacation"
        value={form.reason}
        onChange={handleChange}
      /><br />

      {/* Input for number of days */}
      <input
        type="number"
        name="days"
        placeholder="Number of Days"
        value={form.days}
        onChange={handleChange}
      /><br />

      {/* Button to trigger submission */}
      <button onClick={handleSubmit}>Submit Request</button>
    </div>
  );
}
