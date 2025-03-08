import { useEffect, useState } from "react";
import { getPurchaseHistory, createOrder } from "../api/apiService";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, Typography, Button } from "@mui/material";

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
      <Typography variant="h4" gutterBottom>Purchase History</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Products</TableCell>
              <TableCell sx={{ color: "white" }}>Supplier</TableCell>
              <TableCell sx={{ color: "white" }}>Order Date</TableCell>
              <TableCell sx={{ color: "white" }}>Total Quantity</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>
                      {p.product?.name || p.customProduct} - {p.quantity} pcs
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.supplier?.name || order.customSupplier || "Unknown Supplier"}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {order.products.reduce((total, p) => total + p.quantity, 0)} pcs
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleReorder(order)}>
                    Reorder
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PurchaseHistory;
