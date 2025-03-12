import { useState } from "react";

const AdminLogin = () => {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "MySecretAdminPassword") { // ✅ Change this to a secure password
      localStorage.setItem("role", "admin");
      alert("✅ Admin Access Granted!");
      window.location.reload(); // Refresh to update UI
    } else {
      alert("❌ Incorrect Password!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🔒 Admin Login</h2>
      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleLogin} style={{ padding: "10px", background: "blue", color: "white" }}>
        Login as Admin
      </button>
    </div>
  );
};

export default AdminLogin;
