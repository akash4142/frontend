// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // ✅ React Router's navigation function

//   const handleLogin = () => {
//     if (password === "MySecretAdminPassword") { // ✅ Change this to a secure password
//       localStorage.setItem("role", "admin");
//       alert("✅ Admin Access Granted!");
//       navigate("/"); // ✅ Redirect to dashboard without reloading
//     } else {
//       alert("❌ Incorrect Password!");
//       setPassword(""); // Clear input field on wrong password
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>🔒 Admin Login</h2>
//       <input
//         type="password"
//         placeholder="Enter Admin Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ padding: "10px", marginBottom: "10px" }}
//       />
//       <button onClick={handleLogin} style={{ padding: "10px", background: "blue", color: "white" }}>
//         Login as Admin
//       </button>
//     </div>
//   );
// };

// export default AdminLogin;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const AdminLogin = ({ setIsAdmin }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "yourAdminPassword") { // ✅ Replace with actual admin password
      localStorage.setItem("role", "admin");
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      navigate("/"); // ✅ Redirect to Dashboard after login
    } else {
      alert("❌ Incorrect password. Access denied!");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ p: 4, width: 300, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>Admin Login</Typography>
        <TextField
          label="Enter Admin Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
