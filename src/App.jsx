import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { Box, CssBaseline } from "@mui/material";
import ProductDetails from "./pages/ProductDetails.jsx";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Navbar /> {/* ✅ Navbar stays at the top */}
        <Sidebar /> {/* ✅ Sidebar stays on the left */}
        <Box sx={{ flexGrow: 1, p: 1, mt: 8, ml: "80px" }}> {/* ✅ Ensures content is spaced correctly */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
            <Route path="/production" element={<Production />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
