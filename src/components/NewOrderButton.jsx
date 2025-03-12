import { useState, useEffect } from "react";
import { getProducts, getSuppliers, createOrder } from "../api/apiService";
import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const NewOrderButton = ({ fetchOrders }) => {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [useCustomSupplier, setUseCustomSupplier] = useState(false);

  const [newOrder, setNewOrder] = useState({
    products: [{ product: "", quantity: 1 }],
    supplier: "",
    customSupplier: "",
    expectedArrival: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

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

  return (
    <>
      <Button variant="contained" color="primary" sx={{ mb: 2, mr: 2 }} onClick={() => setOpenModal(true)}>
        + Add New Order
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>Add New Order</Typography>

          {newOrder.products.map((product, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Select Product</InputLabel>
                <Select
                  value={product.product}
                  onChange={(e) => {
                    const updatedProducts = [...newOrder.products];
                    updatedProducts[index].product = e.target.value;
                    setNewOrder({ ...newOrder, products: updatedProducts });
                  }}
                >
                  {products.map((prod) => (
                    <MenuItem key={prod._id} value={prod._id}>{prod.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="number"
                label="Quantity"
                value={product.quantity}
                onChange={(e) => {
                  const updatedProducts = [...newOrder.products];
                  updatedProducts[index].quantity = e.target.value;
                  setNewOrder({ ...newOrder, products: updatedProducts });
                }}
              />

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

          <TextField
            fullWidth
            type="text"
            label="Or Enter Custom Supplier"
            margin="normal"
            value={newOrder.customSupplier}
            onChange={(e) => setNewOrder({ ...newOrder, customSupplier: e.target.value })}
          />

          <TextField
            fullWidth
            type="date"
            label="Expected Arrival"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            value={newOrder.expectedArrival}
            onChange={(e) => setNewOrder({ ...newOrder, expectedArrival: e.target.value })}
          />

          <Button variant="contained" color="primary" onClick={handleCreateOrder} sx={{ mt: 2 }}>
            Place Order
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default NewOrderButton;
