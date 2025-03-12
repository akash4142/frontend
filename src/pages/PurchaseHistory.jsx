// import { useEffect, useState } from "react";
// import { getPurchaseHistory, createOrder } from "../api/apiService";
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, Typography, Button } from "@mui/material";
// const userRole = localStorage.getItem("role") || "public"; 

// const PurchaseHistory = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const data = await getPurchaseHistory();
//       setHistory(data);
//     } catch (error) {
//       alert("Failed to fetch purchase history.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReorder = async (order) => {
//     try {
//       const estimatedArrivalDate = new Date();
//       estimatedArrivalDate.setDate(estimatedArrivalDate.getDate() + 7); // ✅ Set estimated delivery to 7 days from today
  
//       await createOrder({
//         products: order.products.map(p => ({
//           product: p.product?._id || null,
//           quantity: p.quantity,
//         })),
//         supplier: order.supplier?._id || null,
//         customSupplier: order.customSupplier || null,
//         expectedDelivery: new Date().toISOString().split("T")[0], // ✅ Order date is today
//         estimatedArrival: estimatedArrivalDate.toISOString().split("T")[0], // ✅ Estimated arrival in 7 days
//       });
  
//       alert("✅ Order placed successfully!");
//     } catch (error) {
//       alert("❌ Failed to reorder. Try again.");
//     }
//   };

//   if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Purchase History</Typography>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
//             <TableRow>
//             <TableCell sx={{ color: "white" }}>Order Number</TableCell>
//               <TableCell sx={{ color: "white" }}>Products</TableCell>
//               <TableCell sx={{ color: "white" }}>Supplier</TableCell>
//               <TableCell sx={{ color: "white" }}>Order Date</TableCell>
//               <TableCell sx={{ color: "white" }}>Total Quantity</TableCell>
//               <TableCell sx={{ color: "white" }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {history.map((order) => (
//               <TableRow key={order._id}>
//                 <TableCell>{order.orderNumber || order._id}</TableCell>
//                 <TableCell>
//                   {order.products.map((p, idx) => (
//                     <div key={idx}>
//                       {p.product?.name || p.customProduct} - {p.quantity} pcs
//                     </div>
//                   ))}
//                 </TableCell>
//                 <TableCell>{order.supplier?.name || order.customSupplier || "Unknown Supplier"}</TableCell>
//                 <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
//                 <TableCell>
//                   {order.products.reduce((total, p) => total + p.quantity, 0)} pcs
//                 </TableCell>
//                 <TableCell>
//   {userRole === "admin" ? (
//     <Button variant="contained" color="primary" onClick={() => handleReorder(order)}>
//       Reorder
//     </Button>
//   ) : (
//     <Typography variant="body2" color="gray">🔒 Admin Only</Typography>
//   )}
// </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default PurchaseHistory;
import { useEffect, useState } from "react";
import { getPurchaseHistory, createOrder } from "../api/apiService";
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, Typography,
  Button, Tooltip, Chip
} from "@mui/material";
import { Replay, ShoppingCart, Store, CalendarToday, Inventory } from "@mui/icons-material";
import { motion } from "framer-motion"; // ✅ Smooth animations

const userRole = localStorage.getItem("role") || "public"; 

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getPurchaseHistory();
      setHistory(data);
    } catch (error) {
      alert("Failed to fetch purchase history.");
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (order) => {
    try {
      const estimatedArrivalDate = new Date();
      estimatedArrivalDate.setDate(estimatedArrivalDate.getDate() + 7); // ✅ Set estimated delivery to 7 days from today
  
      await createOrder({
        products: order.products.map(p => ({
          product: p.product?._id || null,
          quantity: p.quantity,
        })),
        supplier: order.supplier?._id || null,
        customSupplier: order.customSupplier || null,
        expectedDelivery: new Date().toISOString().split("T")[0], // ✅ Order date is today
        estimatedArrival: estimatedArrivalDate.toISOString().split("T")[0], // ✅ Estimated arrival in 7 days
      });
  
      alert("✅ Order placed successfully!");
    } catch (error) {
      alert("❌ Failed to reorder. Try again.");
    }
  };

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#1976D2" }}>
        📜 Purchase History
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}><ShoppingCart /> Order Number</TableCell>
              <TableCell sx={{ color: "white" }}><Inventory /> Products</TableCell>
              <TableCell sx={{ color: "white" }}><Store /> Supplier</TableCell>
              <TableCell sx={{ color: "white" }}><CalendarToday /> Order Date</TableCell>
              <TableCell sx={{ color: "white" }}><Inventory /> Total Quantity</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((order) => (
              <motion.tr key={order._id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <TableCell>
                  <Chip label={order.orderNumber || order._id} color="primary" />
                </TableCell>

                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>
                      <strong>{p.product?.name || p.customProduct}</strong> - {p.quantity} pcs
                    </div>
                  ))}
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.supplier?.name || order.customSupplier || "Unknown Supplier"}
                    sx={{ bgcolor: "#4caf50", color: "white", fontWeight: "bold" }}
                  />
                </TableCell>

                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <Chip label={`${order.products.reduce((total, p) => total + p.quantity, 0)} pcs`} color="secondary" />
                </TableCell>

                <TableCell>
                   
                    <Tooltip title="Reorder This Purchase">
                      <Button variant="contained" color="primary" onClick={() => handleReorder(order)}>
                        <Replay /> Reorder
                      </Button>
                    </Tooltip>
                  
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PurchaseHistory;
