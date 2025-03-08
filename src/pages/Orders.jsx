// import { useEffect, useState } from "react";
// import { getOrders, updateOrderStatus, createOrder, getSuppliers, getProducts, checkPendingPayments, downloadPurchaseOrderPDF, downloadPurchaseOrdersExcel, sendOrderToProduction } from "../api/apiService";
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Container, Typography, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel } from "@mui/material";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [useCustomSupplier, setUseCustomSupplier] = useState(false);
//   const [filters, setFilters] = useState({ productId: "", month: "", year: "" });

//   const [newOrder, setNewOrder] = useState({
//     products: [{ product: "", quantity: 1 }],
//     supplier: "",
//     customSupplier: "",
//     expectedDelivery: "",
//   });

//   useEffect(() => {
//     fetchOrders();
//     fetchProducts();
//     fetchSuppliers();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const data = await getOrders(filters);
//       setOrders(data);
//     } catch (error) {
//       alert("Failed to fetch orders.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const data = await getProducts();
//       setProducts(data);
//     } catch (error) {
//       alert("Failed to fetch products.");
//     }
//   };

//   const fetchSuppliers = async () => {
//     try {
//       const data = await getSuppliers();
//       setSuppliers(data);
//     } catch (error) {
//       alert("Failed to fetch suppliers.");
//     }
//   };

//   const handleAddProduct = () => {
//     setNewOrder({
//       ...newOrder,
//       products: [...newOrder.products, { product: "", quantity: 1 }],
//     });
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedProducts = newOrder.products.filter((_, i) => i !== index);
//     setNewOrder({ ...newOrder, products: updatedProducts });
//   };

//   const handleCreateOrder = async () => {
//     if (newOrder.products.length === 0 || (!newOrder.supplier && !newOrder.customSupplier) || !newOrder.expectedDelivery) {
//       alert("❌ Please fill in all required fields!");
//       return;
//     }

//     try {
//       await createOrder({
//         products: newOrder.products,
//         supplier: useCustomSupplier ? null : newOrder.supplier,
//         customSupplier: useCustomSupplier ? newOrder.customSupplier : null,
//         expectedDelivery: newOrder.expectedDelivery,
//       });

//       alert("✅ Order placed successfully!");
//       setOpenModal(false);
//       setNewOrder({ products: [{ product: "", quantity: 1 }], supplier: "", customSupplier: "", expectedDelivery: "" });
//       fetchOrders();
//     } catch (error) {
//       alert(error.response?.data?.message || "❌ Failed to create order.");
//     }
//   };

//   const handleSendToProduction = async (orderId) => {
//     try {
//       await sendOrderToProduction(orderId);
//       alert("✅ Order successfully sent to production!");
//       fetchOrders();
//     } catch (error) {
//       alert("❌ Failed to send order to production.");
//     }
//   };

//   const handleUpdateStatus = async (id, status) => {
//     try {
//       await updateOrderStatus(id, status);
//       fetchOrders();
//     } catch (error) {
//       alert(`❌ Failed to update order status to ${status}.`);
//     }
//   };

//   if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Orders</Typography>

//       <Button variant="contained" color="primary" sx={{ mb: 2, mr: 2 }} onClick={() => setOpenModal(true)}>
//         + Add New Order
//       </Button>

//       <Button variant="contained" color="secondary" sx={{ mb: 2 }} onClick={downloadPurchaseOrdersExcel}>
//         Download Orders (Excel)
//       </Button>

//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
//           <Typography variant="h6" gutterBottom>Add New Order</Typography>

//           {newOrder.products.map((product, index) => (
//             <Box key={index} sx={{ mb: 2 }}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Product</InputLabel>
//                 <Select value={product.product} onChange={(e) => {
//                   const updatedProducts = [...newOrder.products];
//                   updatedProducts[index].product = e.target.value;
//                   setNewOrder({ ...newOrder, products: updatedProducts });
//                 }}>
//                   {products.map((prod) => (
//                     <MenuItem key={prod._id} value={prod._id}>{prod.name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <TextField fullWidth type="number" label="Quantity" value={product.quantity} onChange={(e) => {
//                 const updatedProducts = [...newOrder.products];
//                 updatedProducts[index].quantity = e.target.value;
//                 setNewOrder({ ...newOrder, products: updatedProducts });
//               }} />
//               {newOrder.products.length > 1 && (
//                 <Button color="error" onClick={() => handleRemoveProduct(index)} sx={{ mt: 1 }}>
//                   Remove Product
//                 </Button>
//               )}
//             </Box>
//           ))}

//           <Button onClick={handleAddProduct}>+ Add Another Product</Button>

//           <Button variant="contained" color="primary" onClick={handleCreateOrder} sx={{ mt: 2 }}>Place Order</Button>
//         </Box>
//       </Modal>

//       {/* Orders Table */}
//       <TableContainer component={Paper} sx={{ mt: 4 }}>
//         <Table>
//           <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
//             <TableRow>
//               <TableCell sx={{ color: "white" }}>Order ID</TableCell>
//               <TableCell sx={{ color: "white" }}>Products</TableCell>
//               <TableCell sx={{ color: "white" }}>Supplier</TableCell>
//               <TableCell sx={{ color: "white" }}>Expected Delivery</TableCell>
//               <TableCell sx={{ color: "white" }}>Total Invoice</TableCell>
//               <TableCell sx={{ color: "white" }}>Status</TableCell>
//               <TableCell sx={{ color: "white" }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order._id}>
//                 <TableCell>{order._id}</TableCell>
//                 <TableCell>
//                   {order.products.map((p, idx) => (
//                     <div key={idx}>
//                       {p.product?.name || p.customProduct} - {p.quantity} pcs
//                     </div>
//                   ))}
//                 </TableCell>
//                 <TableCell>{order.supplier?.name || order.customSupplier}</TableCell>
//                 <TableCell>{new Date(order.expectedDelivery).toLocaleDateString()}</TableCell>
//                 <TableCell>${order.invoiceAmount.toFixed(2)}</TableCell>
//                 <TableCell>{order.status}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="secondary" onClick={() => downloadPurchaseOrderPDF(order._id)}>Download PDF</Button>
//                   <Button variant="contained" color="success" onClick={() => handleUpdateStatus(order._id, "Received")}>Approve</Button>
//                   <Button variant="contained" color="error" onClick={() => handleUpdateStatus(order._id, "Cancelled")}>Cancel</Button>
//                   <Button variant="contained" color="primary" onClick={() => handleSendToProduction(order._id)}>Send to Production</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default Orders;
import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, sendOrderToProduction, downloadPurchaseOrderPDF } from "../api/apiService";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Container, Typography, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null, orderId: null });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      alert("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    const { action, orderId } = confirmDialog;
    setConfirmDialog({ open: false });

    if (action === "Approve") {
      try {
        await updateOrderStatus(orderId, "Received");
        alert("✅ Order marked as Received! Stock updated.");
        fetchOrders();
      } catch (error) {
        alert("❌ Failed to approve order.");
      }
    }

    if (action === "Cancel") {
      try {
        await updateOrderStatus(orderId, "Cancelled");
        alert("❌ Order cancelled. Stock restored.");
        fetchOrders();
      } catch (error) {
        alert("❌ Failed to cancel order.");
      }
    }
  };

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Orders</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Order ID</TableCell>
              <TableCell sx={{ color: "white" }}>Products</TableCell>
              <TableCell sx={{ color: "white" }}>Supplier</TableCell>
              <TableCell sx={{ color: "white" }}>Expected Delivery</TableCell>
              <TableCell sx={{ color: "white" }}>Total Invoice</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>
                      {p.product?.name || p.customProduct} - {p.quantity} pcs
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.supplier?.name || order.customSupplier}</TableCell>
                <TableCell>{new Date(order.expectedDelivery).toLocaleDateString()}</TableCell>
                <TableCell>${order.invoiceAmount.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {/* ✅ Download PDF Button */}
                  <Tooltip title="Download Purchase Order">
                    <Button variant="contained" color="secondary" sx={{ mr: 1 }} onClick={() => downloadPurchaseOrderPDF(order._id)}>
                      Download PDF
                    </Button>
                  </Tooltip>

                  {/* ✅ Approve Button (Now Updates Stock) */}
                  {order.status === "Pending" && (
                    <Tooltip title="Mark Order as Received (Updates Stock)">
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mr: 1 }}
                        onClick={() => setConfirmDialog({ open: true, action: "Approve", orderId: order._id })}
                      >
                        Approve
                      </Button>
                    </Tooltip>
                  )}

                  {/* ✅ Cancel Button (Restores Stock) */}
                  {order.status === "Pending" && (
                    <Tooltip title="Cancel Order & Restore Stock">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setConfirmDialog({ open: true, action: "Cancel", orderId: order._id })}
                      >
                        Cancel
                      </Button>
                    </Tooltip>
                  )}

                  {/* ✅ Send to Production Button */}
                  {order.status === "Received" && (
                    <Tooltip title="Move Order to Production">
                      <Button variant="contained" color="primary" onClick={() => sendOrderToProduction(order._id)}>
                        Send to Production
                      </Button>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false })}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to <strong>{confirmDialog.action}</strong> this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false })} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Orders;
