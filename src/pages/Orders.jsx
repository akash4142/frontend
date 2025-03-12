import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus,createOrder, getSuppliers, getProducts,  downloadPurchaseOrderPDF, downloadPurchaseOrdersExcel, sendOrderToProduction ,markOrderAsPaid } from "../api/apiService";
import { 
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, 
  Paper, Button, Container, Typography, Modal, Box, TextField, Select, 
  MenuItem, InputLabel, FormControl, Tooltip, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, LinearProgress 
} from "@mui/material";
import { FilterList, CalendarToday, Event } from "@mui/icons-material";

//✅ Function to Get Progress Percentage Based on Order Status
const getOrderProgress = (status) => {
  const statusLevels = {
    Pending: 0,
    Received: 25,
    "In Production": 50,
    Packaging: 75,
    Completed: 100,
  };
  return statusLevels[status] || 0;
};
const getOrderProgressColor = (status) => {
  const statusColors = {
    Pending: "#d32f2f",        // Red
    Received: "#f57c00",      // Orange
    "In Production": "#1976d2",  // Blue
    Packaging: "#673ab7",     // Purple
    Completed: "#388e3c",     // Green
  };
  return statusColors[status] || "#757575"; // Default Grey if status is unknown
};




const Orders = () => {
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null, orderId: null });
const [openModal, setOpenModal] = useState(false);
const [products, setProducts] = useState([]);
const [suppliers, setSuppliers] = useState([]);
const [useCustomSupplier, setUseCustomSupplier] = useState(false);
const [filters, setFilters] = useState({ productId: "", month: "", year: "" });
const userRole =localStorage.getItem("role")

const [newOrder, setNewOrder] = useState({
  products: [{ product: "", quantity: 1 }],
  supplier: "",
  customSupplier: "",
  expectedArrival: "",
});

   useEffect(() => {
     fetchOrders();
fetchProducts();
fetchSuppliers();
   }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders(filters);
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

const handleAddProduct = () => {
  setNewOrder({
    ...newOrder,
    products: [...newOrder.products, { product: "", quantity: 1 }],
  });
};

const handleRemoveProduct = (index) => {
  const updatedProducts = newOrder.products.filter((_, i) => i !== index);
  setNewOrder({ ...newOrder, products: updatedProducts });
};

const handleMarkAsPaid = async (id) => {
  if (!window.confirm("Are you sure you want to mark this order as Paid?")) return;
  try {
    await markOrderAsPaid(id);
    alert("✅ Order marked as Paid successfully!");
    fetchOrders(); // ✅ Refresh the orders list
  } catch (error) {
    alert("❌ Failed to mark order as Paid.");
  }
};


const handleCreateOrder = async () => {
  if (newOrder.products.length === 0 || (!newOrder.supplier && !newOrder.customSupplier) || !newOrder.expectedArrival) {
    alert("❌ Please fill in all required fields!");
    return;
  }

  try {
    await createOrder({
      products: newOrder.products,
      supplier: useCustomSupplier ? null : newOrder.supplier,
      customSupplier: useCustomSupplier ? newOrder.customSupplier : null,
      expectedDelivery: newOrder.expectedArrival,
    });

    alert("✅ Order placed successfully!");
    setOpenModal(false);
    setNewOrder({ products: [{ product: "", quantity: 1 }], supplier: "", customSupplier: "", expectedArrival: "" });
    fetchOrders();
  } catch (error) {
    alert(error.response?.data?.message || "❌ Failed to create order.");
  }
};

const handleSendToProduction = async (orderId) => {
  try {
    await sendOrderToProduction(orderId);
    alert("✅ Order successfully sent to production!");
    fetchOrders();
  } catch (error) {
    alert("❌ Failed to send order to production.");
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


{/* ✅ Add New Order Button (Only Admins) */}
{userRole === "admin" ? (
  <Button variant="contained" color="primary" sx={{ mb: 2, mr: 2 }} onClick={() => setOpenModal(true)}>
    + Add New Order
  </Button>
) : (
  <Typography variant="body2" color="gray">🔒 Admin Only</Typography>
)}

    {/* ✅ Download Orders (Excel) Button (Only Admins) */}
{userRole === "admin" ? (
  <Button variant="contained" color="secondary" sx={{ mb: 2 }} onClick={downloadPurchaseOrdersExcel}>
    Download Orders (Excel)
  </Button>
) : null}

      {/* ✅ Filter Options
      <FormControl sx={{ mr: 2, minWidth: 200 }}>
        <InputLabel>Filter by Product</InputLabel>
        <Select
          value={filters.productId}
          onChange={(e) => setFilters({ ...filters, productId: e.target.value })}
        >
          <MenuItem value="">All Products</MenuItem>
          {products.map((product) => (
            <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ mr: 2, minWidth: 120 }}>
        <InputLabel>Filter by Month</InputLabel>
        <Select
          value={filters.month}
          onChange={(e) => setFilters({ ...filters, month: e.target.value })}
        >
          <MenuItem value="">All Months</MenuItem>
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>{`Month ${i + 1}`}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ mr: 2, minWidth: 120 }}>
        <InputLabel>Filter by Year</InputLabel>
        <Select
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        >
          <MenuItem value="">All Years</MenuItem>
          {Array.from({ length: 5 }, (_, i) => (
            <MenuItem key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={fetchOrders}>
        Apply Filters
      </Button> */}

<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3, alignItems: "center" }}>
      {/* ✅ Product Filter */}
      <FormControl sx={{ minWidth: 200, flex: 1 }}>
        <InputLabel><FilterList sx={{ mr: 1 }} /> Filter by Product</InputLabel>
        <Select
          value={filters.productId}
          onChange={(e) => setFilters({ ...filters, productId: e.target.value })}
        >
          <MenuItem value="">All Products</MenuItem>
          {products.map((product) => (
            <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* ✅ Month Filter */}
      <FormControl sx={{ minWidth: 150, flex: 1 }}>
        <InputLabel><CalendarToday sx={{ mr: 1 }} /> Filter by Month</InputLabel>
        <Select
          value={filters.month}
          onChange={(e) => setFilters({ ...filters, month: e.target.value })}
        >
          <MenuItem value="">All Months</MenuItem>
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>{`Month ${i + 1}`}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* ✅ Year Filter */}
      <FormControl sx={{ minWidth: 150, flex: 1 }}>
        <InputLabel><Event sx={{ mr: 1 }} /> Filter by Year</InputLabel>
        <Select
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        >
          <MenuItem value="">All Years</MenuItem>
          {Array.from({ length: 5 }, (_, i) => (
            <MenuItem key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* ✅ Apply Filters Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={fetchOrders}
        sx={{
          bgcolor: "#1976D2",
          "&:hover": { bgcolor: "#115293" },
          px: 3,
          height: "100%",
        }}
      >
        Apply Filters
      </Button>
    </Box>
<Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Add New Order</Typography>

          {newOrder.products.map((product, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Select Product</InputLabel>
                <Select value={product.product} onChange={(e) => {
                  const updatedProducts = [...newOrder.products];
                  updatedProducts[index].product = e.target.value;
                  setNewOrder({ ...newOrder, products: updatedProducts });
                }}>
                  {products.map((prod) => (
                    <MenuItem key={prod._id} value={prod._id}>{prod.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField fullWidth type="number" label="Quantity" value={product.quantity} onChange={(e) => {
                const updatedProducts = [...newOrder.products];
                updatedProducts[index].quantity = e.target.value;
                setNewOrder({ ...newOrder, products: updatedProducts });
              }} />
              {newOrder.products.length > 1 && (
                <Button color="error" onClick={() => handleRemoveProduct(index)} sx={{ mt: 1 }}>
                  Remove Product
                </Button>
              )}
            </Box>
          ))}

          <Button onClick={handleAddProduct}>+ Add Another Product</Button>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Supplier</InputLabel>
            <Select value={newOrder.supplier} onChange={(e) => setNewOrder({ ...newOrder, supplier: e.target.value })}>
              <MenuItem value="">Select Supplier</MenuItem>
              {suppliers.map((sup) => (
                <MenuItem key={sup._id} value={sup._id}>{sup.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField fullWidth type="text" label="Or Enter Custom Supplier" margin="normal" value={newOrder.customSupplier} onChange={(e) => setNewOrder({ ...newOrder, customSupplier: e.target.value })} />

          <TextField fullWidth type="date" label="Expected Arrival" InputLabelProps={{ shrink: true }} margin="normal" value={newOrder.expectedArrival} onChange={(e) => setNewOrder({ ...newOrder, expectedArrival: e.target.value })} />

          


          <Button variant="contained" color="primary" onClick={handleCreateOrder} sx={{ mt: 2 }}>Place Order</Button>
        </Box>
      </Modal>


      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Order ID</TableCell>
              <TableCell sx={{ color: "white" }}>Products</TableCell>
              <TableCell sx={{ color: "white" }}>Supplier</TableCell>
              <TableCell sx={{ color: "white" }}>Expected Arrival</TableCell>
              <TableCell sx={{ color: "white" }}>Total Invoice</TableCell>
              <TableCell sx={{ color: "white" }}>Payment Due Date</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Progress</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
              <TableCell sx={{ color: "white" }}>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderNumber || order._id}</TableCell>
                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>
                      {p.product?.name || p.customProduct} - {p.quantity} pcs
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.supplier?.name || order.customSupplier}</TableCell>
                <TableCell>{order.estimatedArrival ? new Date(order.estimatedArrival).toLocaleDateString() : "N/A"}</TableCell>
                <TableCell>€{order.invoiceAmount.toFixed(2)}</TableCell>
                <TableCell>{order.paymentDueDate ? new Date(order.paymentDueDate).toLocaleDateString() : "N/A"}</TableCell>
                <TableCell>{order.status}</TableCell>
                {/* ✅ Progress Bar */}
                <TableCell>
  <LinearProgress 
    variant="determinate" 
    value={getOrderProgress(order.status)} 
    sx={{ 
      width: "100%", 
      bgcolor: "#eeeeee", // Light grey background
      "& .MuiLinearProgress-bar": { bgcolor: getOrderProgressColor(order.status) }
    }} 
  />
</TableCell>


                
                <TableCell>

 
  {/* ✅ Download PDF */}
  {userRole==="admin" ? (
  <Tooltip title="Download Purchase Order">
    <Button variant="contained" color="secondary" sx={{ mr: 1 }} onClick={() => downloadPurchaseOrderPDF(order._id)}>
      Download PDF
    </Button>
  </Tooltip>
  ):(
    <Typography variant="body2" color="gray">🔒 Admin Only</Typography>
  )}
  {/* ✅ Approve Order Button */}
  {userRole === "admin" && order.status === "Pending" && (
    <Tooltip title="Mark Order as Received (Updates Stock)">
      <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={() => setConfirmDialog({ open: true, action: "Approve", orderId: order._id })}>
        Approve
      </Button>
    </Tooltip>
  )}

  {/* ✅ Cancel Order Button */}
  {userRole === "admin" && order.status === "Pending" && (
    <Tooltip title="Cancel Order & Restore Stock">
      <Button variant="contained" color="error" onClick={() => setConfirmDialog({ open: true, action: "Cancel", orderId: order._id })}>
        Cancel
      </Button>
    </Tooltip>
  )}

  {/* ✅ Send to Production Button */}
  {userRole === "admin" && order.status === "Received" && (
    <Tooltip title="Move Order to Production">
      <Button variant="contained" color="primary" onClick={() => sendOrderToProduction(order._id)}>
        Send to Production
      </Button>
    </Tooltip>
  )}
</TableCell>

<TableCell>
  {order.paymentStatus === "Pending" ? (
    userRole === "admin" ? (
      <Tooltip title="Mark Order as Paid">
        <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={() => handleMarkAsPaid(order._id)}>
          Mark as Paid
        </Button>
      </Tooltip>
    ) : (
      <Typography variant="body2" color="gray">🔒 Admin Only</Typography>
    )
  ) : (
    <Typography variant="body2" color="green">✅ Payment Done</Typography>
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

