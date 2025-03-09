import { useEffect, useState } from "react";
import { getStock } from "../api/apiService";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, Typography } from "@mui/material";

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
      <Typography variant="h4" gutterBottom>Stock Levels</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Product</TableCell>
              <TableCell sx={{ color: "white" }}>Available Stock</TableCell>
              <TableCell sx={{ color: "white" }}>Reserved Stock</TableCell>
              <TableCell sx={{ color: "white" }}>Reserved For</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stock.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.product?.name || item?.customProduct || "Deleted Product"}</TableCell>
                <TableCell>{item?.currentStock ?? "N/A"}</TableCell>
                <TableCell>{item?.reservedStock || "N/A"} pcs</TableCell>
                <TableCell>
                  {item.reservedFor?.length > 0 ? (
                    item.reservedFor.map((order, index) => (
                      <div key={index}>
                        Order ID: {order.orderNumber || order.orderId} | Supplier: {order.supplier} | Reserved: {order.quantityReserved} pcs
                      </div>
                    ))
                  ) : (
                    "No Reservations"
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      item?.currentStock <= 0 ? "red" :
                      item?.currentStock < 5 ? "orange" : "green"
                  }}
                >
                  {item?.currentStock <= 0 ? "Out of Stock" : item?.currentStock < 5 ? "Low Stock" : "In Stock"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Stock;
