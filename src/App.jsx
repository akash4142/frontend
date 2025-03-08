import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Orders from "./pages/Orders.jsx";
import Stock from "./pages/Stock.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import PurchaseHistory from "./pages/PurchaseHistory.jsx";
import Production from "./pages/Production.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} /> 
          <Route path="/orders" element={<Orders />} />
          <Route path="/stock" element={<Stock />} />  
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/purchase-history" element={<PurchaseHistory />}/>
          <Route path="/production" element={<Production />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
