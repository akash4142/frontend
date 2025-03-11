import { useState } from "react";
import { Box, Button, Modal, Tab, Tabs, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ProductModal = ({ open, onClose, newProduct, setNewProduct, handleAddProduct, suppliers }) => {
  const [tabIndex, setTabIndex] = useState(0); // ✅ Track which tab is active

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 500, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
      }}>
        <Typography variant="h6" gutterBottom>Add New Product</Typography>

        {/* ✅ Tabs for Sectioned Input */}
        <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 2 }}>
          <Tab label="General Info" />
          <Tab label="Pricing" />
          <Tab label="Supplier Info" />
          <Tab label="Production Process" />
        </Tabs>

        {/* ✅ Tab Panels */}
        <Box hidden={tabIndex !== 0}>
          <TextField fullWidth label="Product Name" margin="normal"
            value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <TextField fullWidth label="ASIN" margin="normal" required
            value={newProduct.ASIN} onChange={(e) => setNewProduct({ ...newProduct, ASIN: e.target.value })}
          />
          <TextField fullWidth label="SKU" margin="normal" required
            value={newProduct.SKU} onChange={(e) => setNewProduct({ ...newProduct, SKU: e.target.value })}
          />
          <TextField fullWidth label="Manufacturer Reference" margin="normal"
            value={newProduct.manufacturerReference} onChange={(e) => setNewProduct({ ...newProduct, manufacturerReference: e.target.value })}
          />
        </Box>

        <Box hidden={tabIndex !== 1}>
          <TextField fullWidth label="Quantity Per Master Box" margin="normal" type="number"
            value={newProduct.quantityPerMasterBox} onChange={(e) => setNewProduct({ ...newProduct, quantityPerMasterBox: e.target.value })}
          />
          <TextField fullWidth type="number" label="Price" margin="normal"
            value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
        </Box>

        <Box hidden={tabIndex !== 2}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Supplier</InputLabel>
            <Select
              value={newProduct.supplier}
              onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier._id} value={supplier._id}>{supplier.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField fullWidth type="number" label="Initial Stock" margin="normal" required
  value={newProduct.initialStock} onChange={(e) => setNewProduct({ ...newProduct, initialStock: e.target.value })}
/>

        </Box>

        <Box hidden={tabIndex !== 3}>
        <TextField fullWidth label="Production Process" margin="normal"
            value={newProduct.productionProcess} onChange={(e) => setNewProduct({ ...newProduct, productionProcess: e.target.value })}
          />
          <TextField fullWidth label="Packaging Type" margin="normal"
            value={newProduct.packagingType} onChange={(e) => setNewProduct({ ...newProduct, packagingType: e.target.value })}
          />
          <TextField fullWidth label="Required Materials (comma-separated)" margin="normal"
            value={newProduct.requiredMaterials} onChange={(e) => setNewProduct({ ...newProduct, requiredMaterials: e.target.value })}
          />
        </Box>

        {/* ✅ Submit & Cancel Buttons */}
        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddProduct}>Submit</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;



