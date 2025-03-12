// import { useEffect, useState } from "react";
// import { getStock } from "../api/apiService";
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, Typography } from "@mui/material";

// const Stock = () => {
//   const [stock, setStock] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStock = async () => {
//       try {
//         const data = await getStock();
//         setStock(data);
//       } catch (error) {
//         alert("Failed to fetch stock.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStock();
//   }, []);

//   if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Stock Levels</Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
//             <TableRow>
//               <TableCell sx={{ color: "white" }}>Product</TableCell>
//               <TableCell sx={{ color: "white" }}>Available Stock</TableCell>
//               <TableCell sx={{ color: "white" }}>Reserved Stock</TableCell>
//               <TableCell sx={{ color: "white" }}>Reserved For</TableCell>
//               <TableCell sx={{ color: "white" }}>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stock.map((item) => (
//               <TableRow key={item?._id}>
//                 <TableCell>{item?.product?.name || item?.customProduct || "Deleted Product"}</TableCell>
//                 <TableCell>{item?.currentStock ?? "N/A"}</TableCell>
//                 <TableCell>{item?.reservedStock || "N/A"} pcs</TableCell>
//                 <TableCell>
//                   {item.reservedFor?.length > 0 ? (
//                     item.reservedFor.map((order, index) => (
//                       <div key={index}>
//                         Order ID: {order.orderNumber || order.orderId} | Supplier: {order.supplier} | Reserved: {order.quantityReserved} pcs
//                       </div>
//                     ))
//                   ) : (
//                     "No Reservations"
//                   )}
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color:
//                       item?.currentStock <= 0 ? "red" :
//                       item?.currentStock < 5 ? "orange" : "green"
//                   }}
//                 >
//                   {item?.currentStock <= 0 ? "Out of Stock" : item?.currentStock < 5 ? "Low Stock" : "In Stock"}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default Stock;
import { useEffect, useState } from "react";
import { getStock } from "../api/apiService";
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container,
  Typography, Chip, Box, Tooltip
} from "@mui/material";
import { Inventory, CheckCircle, Warning, ErrorOutline, AssignmentTurnedIn } from "@mui/icons-material";
import { motion } from "framer-motion"; // ✅ Smooth animations

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const data = await getStock();
        setStock(data);
      } catch (error) {
        alert("Failed to fetch stock.");
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#1976D2" }}>
        📦 Stock Levels Overview
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}><Inventory /> Product</TableCell>
              <TableCell sx={{ color: "white" }}><AssignmentTurnedIn /> Available Stock</TableCell>
              <TableCell sx={{ color: "white" }}>Reserved Stock</TableCell>
              <TableCell sx={{ color: "white" }}>Reserved For</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stock.map((item) => (
              <motion.tr key={item?._id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <TableCell>
                  <strong>{item?.product?.name || item?.customProduct || "Deleted Product"}</strong>
                </TableCell>

                <TableCell>
                  <Chip label={`${item?.currentStock ?? "N/A"} pcs`} color="primary" />
                </TableCell>

                <TableCell>
                  <Chip label={`${item?.reservedStock || "N/A"} pcs`} color="secondary" />
                </TableCell>

                <TableCell>
                  {item.reservedFor?.length > 0 ? (
                    item.reservedFor.map((order, index) => (
                      <Tooltip key={index} title={`Supplier: ${order.supplier}, Reserved: ${order.quantityReserved} pcs`}>
                        <Chip
                          label={`Order ${order.orderNumber || order.orderId}`}
                          sx={{ bgcolor: "#ff9800", color: "white", m: 0.5 }}
                        />
                      </Tooltip>
                    ))
                  ) : (
                    <Typography variant="body2" color="gray">No Reservations</Typography>
                  )}
                </TableCell>

                <TableCell>
                  <Chip
                    label={
                      item?.currentStock <= 0 ? "Out of Stock" :
                        item?.currentStock < 5 ? "Low Stock" :
                          "In Stock"
                    }
                    sx={{
                      bgcolor:
                        item?.currentStock <= 0 ? "#d32f2f" :
                          item?.currentStock < 5 ? "#f57c00" :
                            "#388e3c",
                      color: "white",
                      fontWeight: "bold"
                    }}
                    icon={
                      item?.currentStock <= 0 ? <ErrorOutline /> :
                        item?.currentStock < 5 ? <Warning /> :
                          <CheckCircle />
                    }
                  />
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Stock;
