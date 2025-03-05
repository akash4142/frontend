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
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stock.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.product?.name || "Deleted Product"}</TableCell>
                <TableCell>{item?.currentStock ?? "N/A"}</TableCell>
                <TableCell
                  sx={{
                    color:
                      item?.currentStock < 5 ? "red" :
                      item?.currentStock < 10 ? "orange" : "green"
                  }}
                >
                  {item?.currentStock < 5 ? "Out of Stock" : item?.currentStock < 10 ? "Low Stock" : "In Stock"}
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
