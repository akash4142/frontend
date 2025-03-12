
import { useEffect, useState } from "react";
import { getProductionOrders, updateProductionStatus, updateProductionComments } from "../api/apiService";
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Container, Typography,
  Tooltip, TextField, Chip, IconButton, Modal, Box
} from "@mui/material";
import { Edit, CheckCircle, LocalShipping, Settings, ProductionQuantityLimits, Inventory } from "@mui/icons-material";
import { motion } from "framer-motion"; // ✅ Smooth animations


const Production = () => {
  const [productionOrders, setProductionOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const userRole = localStorage.getItem("role") || "public"; // ✅ Get user role
  const [selectedProcess, setSelectedProcess] = useState(null);

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

  // ✅ Handle Comment Updates (Only Admins)
  const handleUpdateComment = async (id) => {
    if (userRole !== "admin") return;
    try {
      await updateProductionComments(id, comments[id] || ""); 
      fetchProductionOrders();
    } catch (error) {
      alert(`❌ Failed to update comment.`);
    }
  };

  // ✅ Handle Live Comment Changes (Only Admins)
  const handleCommentChange = (id, value) => {
    if (userRole !== "admin") return;
    setComments({ ...comments, [id]: value });
  };

  // ✅ Handle Status Updates (Only Admins)
  const handleUpdateStatus = async (id, status) => {
    if (userRole !== "admin") return;
    try {
      await updateProductionStatus(id, status);
      fetchProductionOrders();
    } catch (error) {
      alert(`❌ Failed to update production status.`);
    }
  };

  // ✅ Assign Colors Based on Status
  const getStatusColor = (status) => {
    switch (status) {
      case "In Production":
        return "blue";
      case "Packaging":
        return "orange";
      case "Completed":
        return "green";
      default:
        return "gray";
    }
  };

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#1976D2" }}>
        🏭 Production & Packaging Overview
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
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
              <motion.tr key={order._id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
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

                {/* <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>{p.product?.productionProcess || "N/A"}</div>
                  ))}
                </TableCell> */}

{/* ✅ Packaging Process: Truncated Text + Tooltip + Modal */}
<TableCell>
                  {order.products.map((p, idx) => (
                    <Tooltip key={idx} title="Click to view full process details">
                      <Typography
                        variant="body2"
                        sx={{
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "150px", // ✅ Show only 1 line
                        }}
                        onClick={() => setSelectedProcess(p.product?.productionProcess || "No details available")}
                      >
                        {p.product?.productionProcess || "No Details"}
                      </Typography>
                    </Tooltip>
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

                <TableCell>
                  <Chip label={order.status} sx={{ bgcolor: getStatusColor(order.status), color: "white" }} />
                </TableCell>

                <TableCell>
                  {userRole === "admin" ? (
                    <>
                      {order.status === "In Production" && (
                        <Tooltip title="Move to Packaging">
                          <Button variant="contained" color="warning" onClick={() => handleUpdateStatus(order._id, "Packaging")}>
                            <LocalShipping /> Move
                          </Button>
                        </Tooltip>
                      )}

                      {order.status === "Packaging" && (
                        <Tooltip title="Mark as Completed">
                          <Button variant="contained" color="success" onClick={() => handleUpdateStatus(order._id, "Completed")}>
                            <CheckCircle /> Complete
                          </Button>
                        </Tooltip>
                      )}
                    </>
                  ) : (
                    <Typography variant="body2" color="gray">🔒 Admin Only</Typography>
                  )}
                </TableCell>

                <TableCell>
                  {userRole === "admin" ? (
                    <TextField
                      fullWidth
                      multiline
                      minRows={1}
                      maxRows={6}
                      placeholder="Add notes..."
                      value={comments[order._id] || ""}
                      onChange={(e) => handleCommentChange(order._id, e.target.value)}
                      onBlur={() => handleUpdateComment(order._id)}
                      sx={{
                        fontSize: "12px",
                        "& .MuiInputBase-input": { fontSize: "12px" },
                      }}
                    />
                  ) : (
                    <Typography variant="body2" sx={{ fontSize: "12px", color: "gray" }}>
                      {comments[order._id] || "No Comments"}
                    </Typography>
                  )}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

       {/* ✅ Modal for Full Production Process Details */}
       <Modal open={Boolean(selectedProcess)} onClose={() => setSelectedProcess(null)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          bgcolor: "background.paper", p: 4, borderRadius: 2, width: 400
        }}>
          <Typography variant="h6" gutterBottom>Production Process Details</Typography>
          <Typography variant="body1">{selectedProcess}</Typography>
          <Button onClick={() => setSelectedProcess(null)} variant="contained" sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Production;

