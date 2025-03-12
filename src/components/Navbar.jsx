import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import { BusinessCenter } from "@mui/icons-material"; // ✅ Import an icon for Purchase Management

const Navbar = () => {
  const userRole = localStorage.getItem("role") || "public";

  const handleLogout = () => {
    localStorage.removeItem("role");
    alert("✅ Logged out successfully!");
    window.location.reload();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `100%`,
        zIndex: 1201,
        bgcolor: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)", // ✅ Gradient Background
        color: "White",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", // ✅ Soft Shadow Effect
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* ✅ Left-Side: Purchase Management with Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BusinessCenter sx={{ fontSize: 30, color: "#FDE74C" }} /> {/* ✅ Icon with funky color */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Purchase Management
          </Typography>
        </Box>

        {/* ✅ Right-Side: Welcome Message & Logout/Login Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {userRole === "admin" ? "👑 Welcome, Admin!" : "🚀 Welcome!"}
            </Typography>
          </motion.div>

          {userRole === "admin" ? (
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button color="error" onClick={handleLogout} sx={{ fontWeight: "bold" }}>
                Logout
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button color="inherit" component={Link} to="/admin-login" sx={{ fontWeight: "bold" }}>
                Admin Login
              </Button>
            </motion.div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
