import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, createOrder, getSuppliers, getProducts, checkPendingPayments, downloadPurchaseOrderPDF, downloadPurchaseOrdersExcel } from "../api/apiService";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Container, Typography, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl,Checkbox , FormControlLabel } from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false); 
  const [products, setProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({ productId: "",supplier: "",customSupplier:"", quantity: 1, expectedDelivery: "" });
  const [suppliers, setSuppliers] = useState([]);
  const [useCustomSupplier, setUseCustomSupplier] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchSuppliers();
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

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      alert("Failed to fetch products.");
    }
  };

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (error) {
      alert("Failed to fetch suppliers.");
    }
  };

  const handleCreateOrder = async () => {
    if (
      (!newOrder.productId) ||
      (!useCustomSupplier && !newOrder.supplier) ||
      !newOrder.quantity ||
      !newOrder.expectedDelivery
    ) {
      alert("❌ Please fill in all required fields!");
      return;
    }

     // ✅ Skip checking for pending payments if using a new product or supplier
  if (!useCustomSupplier) {
    const pendingPayments = await checkPendingPayments();
    if (pendingPayments.unpaidOrders && pendingPayments.unpaidOrders.length > 0) {
      alert("⚠ You have unpaid invoices. Please clear them before placing a new order.");
      return;
    }
  }
  
    try {
      const response = await createOrder({
        productId:  newOrder.productId,
        supplier: useCustomSupplier ? null : newOrder.supplier,
        customSupplier: useCustomSupplier ? newOrder.customSupplier : null,
        quantity: newOrder.quantity,
        expectedDelivery: newOrder.expectedDelivery,
      });

      alert(Response.message);
      if (response.message.includes("✅ Order placed successfully!")) {
        setOpenModal(false);
        setNewOrder({ productId: "", supplier: "",customSupplier:"", quantity: 1, expectedDelivery: "" });
        fetchOrders();
      }
    } catch (error) {
      alert(error.response?.data?.message||"❌ Failed to create order . Out of stock right now ");
    }
  };
  
  const handleUpdateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (error) {
      alert(`❌ Failed to update order status to ${status}.`);
    }
  };

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Orders</Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2, mr: 2 }} onClick={() => setOpenModal(true)}>
        + Add New Order
      </Button>

      <Button variant="contained" color="secondary" sx={{ mb: 2 }} onClick={downloadPurchaseOrdersExcel}>
        Download Orders (Excel)
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
        }}>
          <Typography variant="h6" gutterBottom>Add New Order</Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Product</InputLabel>
            <Select value={newOrder.productId} onChange={(e) => setNewOrder({ ...newOrder, productId: e.target.value })}>
              {products.map((product) => (
                <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
         
          <FormControlLabel
            control={<Checkbox checked={useCustomSupplier} onChange={() => setUseCustomSupplier(!useCustomSupplier)} />}
            label="Enter Custom Supplier"
          />
          {useCustomSupplier ? (
            <TextField fullWidth label="Custom Supplier Name" margin="normal" value={newOrder.customSupplier} onChange={(e) => setNewOrder({ ...newOrder, customSupplier: e.target.value })} />
          ) : (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Supplier</InputLabel>
              <Select value={newOrder.supplier} onChange={(e) => setNewOrder({ ...newOrder, supplier: e.target.value })} disabled={!newOrder.productId}>
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier._id} value={supplier._id}>{supplier.name}</MenuItem>
                ))}
              </Select>
            </FormControl> )
            }
          <TextField fullWidth type="number" label="Quantity" margin="normal" value={newOrder.quantity} onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })} />
          <TextField fullWidth type="date" label="Expected Delivery" InputLabelProps={{ shrink: true }} margin="normal" value={newOrder.expectedDelivery} onChange={(e) => setNewOrder({ ...newOrder, expectedDelivery: e.target.value })} />
          <Button variant="contained" color="primary" onClick={handleCreateOrder} sx={{ mt: 2 }}>
            Place Order
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setOpenModal(false)} sx={{ mt: 2, ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Product</TableCell>
              <TableCell sx={{ color: "white" }}>Supplier</TableCell>
              <TableCell sx={{ color: "white" }}>Quantity</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Payment Status</TableCell>
              <TableCell sx={{ color: "white" }}>Payment Due Date</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order?._id}>
                <TableCell>{order?.product?.name || "Deleted Product"}</TableCell>
                <TableCell>{order?.supplier?.name || "Unknown Supplier"}</TableCell>
                <TableCell>{order?.orderedQuantity ?? "N/A"}</TableCell>
                <TableCell>{order?.status || "Unknown Status"}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.paymentDueDate ? new Date(order.paymentDueDate).toLocaleDateString() : "N/A"}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" sx={{ mr: 1 }} onClick={() => downloadPurchaseOrderPDF(order._id)}>
                    Download PDF
                  </Button>
                  {order.status !== "Received" && (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
                      onClick={() => handleUpdateStatus(order._id, "Received")}
                    >
                      Approve
                    </Button>
                  )}
                  {order.status !== "Cancelled" && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleUpdateStatus(order._id, "Cancelled")}
                    >
                      Cancel
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

export default Orders;
