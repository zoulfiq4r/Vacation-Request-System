// Import useState hook to manage form input state
import { useState } from "react";

// Import useNavigate hook from React Router for navigation after login
import { useNavigate } from "react-router-dom";

// Import predefined users (username-password-role-email mapping)
import { USERS } from "../users";

// Define and export the LoginPage component
export default function LoginPage() {
  // State for tracking input values (username and password)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // React Router navigation hook
  const navigate = useNavigate();

  // Function to handle login form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form default behavior (page reload)

    // Try to find the user in the USERS object using lowercase username
    const user = USERS[username.toLowerCase()];

    // If user exists and the password matches
    if (user && user.password === password) {
      // Store user data in localStorage (for later use)
      localStorage.setItem("user", JSON.stringify({
        username: username.toLowerCase(),
        role: user.role,
        email: user.email
      }));

      // Redirect user based on their role
      if (user.role === "Employee") navigate("/employee");
      else if (user.role === "Manager") navigate("/manager");
      else if (user.role === "Chief Manager") navigate("/chief");
      else if (user.role === "HR Manager") navigate("/hr");
    } else {
      // Invalid credentials, show an alert
      alert("Invalid username or password");
    }
  };

  // JSX returned by the LoginPage component (renders login form)
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Username input */}
        <input
          placeholder="Username (e.g. employee)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password input */}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
