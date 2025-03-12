// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
// import Orders from "./pages/Orders";
// import Stock from "./pages/Stock";
// import PurchaseHistory from "./pages/PurchaseHistory";
// import Production from "./pages/Production";
// import Suppliers from "./pages/Supplier";
// import AdminLogin from "./pages/AdminLogin";
// import { Box, CssBaseline } from "@mui/material";
// import ProductDetails from "./pages/ProductDetails.jsx";

// function App() {
//   return (
//     <Router>
//       <CssBaseline />
//       <Box sx={{ display: "flex" }}>
//         <Navbar /> {/* ✅ Navbar stays at the top */}
//         <Sidebar /> {/* ✅ Sidebar stays on the left */}
//         <Box sx={{ flexGrow: 1, p: 1, mt: 8, ml: "80px" }}> {/* ✅ Ensures content is spaced correctly */}
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/stock" element={<Stock />} />
//             <Route path="/purchase-history" element={<PurchaseHistory />} />
//             <Route path="/production" element={<Production />} />
//             <Route path="/suppliers" element={<Suppliers />} />
//             <Route path="/admin-login" element={<AdminLogin />} />
//             <Route path="/products/:id" element={<ProductDetails />} />
//           </Routes>
//         </Box>
//       </Box>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Stock from "./pages/Stock";
import PurchaseHistory from "./pages/PurchaseHistory";
import Production from "./pages/Production";
import Suppliers from "./pages/Supplier";
import AdminLogin from "./pages/AdminLogin";
import ProductDetails from "./pages/ProductDetails.jsx";
import { Box, CssBaseline } from "@mui/material";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ Log out user on app load and redirect to login
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdmin") === "true";
    if (!loggedIn) {
      setIsAdmin(false);
      localStorage.removeItem("isAdmin");
    } else {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Router>
      <CssBaseline />
      <Routes>
        {/* ✅ Redirect if not logged in */}
        {!isAdmin ? (
          <Route path="*" element={<Navigate to="/admin-login" replace />} />
        ) : (
          <>
            {/* ✅ Protected Routes inside a Fragment */}
            <Route
              path="/*"
              element={
                <Box sx={{ display: "flex" }}>
                  <Navbar />
                  <Sidebar />
                  <Box sx={{ flexGrow: 1, p: 1, mt: 8, ml: "80px" }}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/stock" element={<Stock />} />
                      <Route path="/purchase-history" element={<PurchaseHistory />} />
                      <Route path="/production" element={<Production />} />
                      <Route path="/suppliers" element={<Suppliers />} />
                      <Route path="/products/:id" element={<ProductDetails />} />
                    </Routes>
                  </Box>
                </Box>
              }
            />
          </>
        )}

        {/* ✅ Admin Login Page */}
        <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
      </Routes>
    </Router>
  );
}

export default App;
