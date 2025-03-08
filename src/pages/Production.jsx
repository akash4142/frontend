import { useEffect, useState } from "react";
import { getProductionOrders, updateProductionStatus } from "../api/apiService";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Container, Typography } from "@mui/material";

const Production = () => {
  const [productionOrders, setProductionOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductionOrders();
  }, []);

  const fetchProductionOrders = async () => {
    try {
      const data = await getProductionOrders();
      setProductionOrders(data);
    } catch (error) {
      alert("Failed to fetch production orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateProductionStatus(id, status);
      fetchProductionOrders(); // Refresh list after update
    } catch (error) {
      alert(`❌ Failed to update production status.`);
    }
  };

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Production & Packaging</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Order ID</TableCell>
              <TableCell sx={{ color: "white" }}>Products</TableCell>
              <TableCell sx={{ color: "white" }}>Quantity</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productionOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderId?._id || "Unknown Order"}</TableCell>
                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>
                      {p.product?.name || p.customProduct} - {p.quantity} pcs
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>{p.quantity} pcs</div>
                  ))}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.status === "In Production" && (
                    <Button variant="contained" color="warning" onClick={() => handleUpdateStatus(order._id, "Packaging")}>
                      Move to Packaging
                    </Button>
                  )}
                  {order.status === "Packaging" && (
                    <Button variant="contained" color="success" onClick={() => handleUpdateStatus(order._id, "Completed")}>
                      Mark as Completed
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Production;
