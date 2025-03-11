import { useEffect, useState } from "react";
import { getProductionOrders, updateProductionStatus ,updateProductionComments} from "../api/apiService";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Container, Typography, Tooltip ,TextField} from "@mui/material";

const Production = () => {
  const [productionOrders, setProductionOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  
  useEffect(() => {
    fetchProductionOrders();
  }, []);

  const fetchProductionOrders = async () => {
    try {
      const data = await getProductionOrders();
      setProductionOrders(data);

      // ✅ Load comments from API response
      const commentsMap = {};
      data.forEach((order) => {
        commentsMap[order._id] = order.comments || "";
      });
      setComments(commentsMap);
    } catch (error) {
      alert("Failed to fetch production orders.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Comment Updates
  const handleUpdateComment = async (id) => {
    try {
      console.log(`📝 Sending update for Order ID: ${id} - New Comment:`, comments[id]); // ✅ Debugging log
      await updateProductionComments(id, comments[id] || ""); 
      fetchProductionOrders(); // ✅ Ensure we fetch the latest data
    } catch (error) {
      alert(`❌ Failed to update comment.`);
    }
  };
  
  

  // ✅ Handle Live Comment Changes
  const handleCommentChange = (id, value) => {
    setComments({ ...comments, [id]: value });
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateProductionStatus(id, status);
      fetchProductionOrders();
    } catch (error) {
      alert(`❌ Failed to update production status.`);
    }
  };

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
        Production & Packaging Overview
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Order ID</TableCell>
              <TableCell sx={{ color: "white" }}>Product Details</TableCell>
              <TableCell sx={{ color: "white" }}>Quantity</TableCell>
              <TableCell sx={{ color: "white" }}>Packaging Process</TableCell>
              <TableCell sx={{ color: "white" }}>Packaging Details</TableCell>
              <TableCell sx={{ color: "white" }}>Master Box Units</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
              <TableCell sx={{ color: "white" }}>Comments</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productionOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderId?.orderNumber || "N/A"}</TableCell>
                
                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>
                      <strong>{p.product?.name || "Deleted Product"}</strong>
                    </div>
                  ))}
                </TableCell>

                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>{p.quantity} pcs</div>
                  ))}
                </TableCell>

                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>{p.product?.productionProcess || "N/A"}</div>
                  ))}
                </TableCell>

                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>{p.product?.packagingType || "N/A"}</div>
                  ))}
                </TableCell>

                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>{p.product?.quantityPerMasterBox || "N/A"} units</div>
                  ))}
                </TableCell>                

                <TableCell>{order.status}</TableCell>

                <TableCell>
                  {order.status === "In Production" && (
                    <Tooltip title="Move to Packaging">
                      <Button variant="contained" color="warning" onClick={() => handleUpdateStatus(order._id, "Packaging")}>
                        Move to Packaging
                      </Button>
                    </Tooltip>
                  )}

                  {order.status === "Packaging" && (
                    <Tooltip title="Mark as Completed">
                      <Button variant="contained" color="success" onClick={() => handleUpdateStatus(order._id, "Completed")}>
                        Mark as Completed
                      </Button>
                    </Tooltip>
                  )}
                </TableCell>

                <TableCell>
  <TextField
    fullWidth
    multiline // ✅ Allows multiple lines
    minRows={2} // ✅ Initial height of 2 rows
    maxRows={6} // ✅ Expands up to 6 rows when needed
    placeholder="Add or update notes..."
    value={comments[order._id] || ""}
    onChange={(e) => handleCommentChange(order._id, e.target.value)}
    onBlur={() => handleUpdateComment(order._id)} // ✅ Auto-save on blur
    sx={{
      fontSize: "12px", // ✅ Smaller font size
      "& .MuiInputBase-input": { fontSize: "12px" }, // ✅ Ensures input text is smaller
    }}
  />
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
