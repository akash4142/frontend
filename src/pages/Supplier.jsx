import { useEffect, useState } from "react";
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from "../api/apiService";
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container,
  Typography, Button, Modal, Box, TextField, Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import { AddCircleOutline, Edit, Delete, Business, Email, Phone, LocationOn } from "@mui/icons-material";
import { motion } from "framer-motion"; // ✅ Animation for smooth UI experience

const userRole = localStorage.getItem("role"); // ✅ Check if the user is admin

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  const [supplierData, setSupplierData] = useState({ name: "", contactPerson: "", email: "", phone: "", address: "" });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (error) {
      alert("Failed to fetch suppliers.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSupplier = async () => {
    try {
      if (editingSupplier) {
        await updateSupplier(editingSupplier._id, supplierData);
        alert("✅ Supplier updated successfully!");
      } else {
        await createSupplier(supplierData);
        alert("✅ Supplier added successfully!");
      }
      setOpenModal(false);
      fetchSuppliers();
    } catch (error) {
      alert("❌ Failed to save supplier.");
    }
  };

  const handleDeleteSupplier = async () => {
    try {
      await deleteSupplier(deleteDialog.id);
      alert("✅ Supplier deleted successfully!");
      setDeleteDialog({ open: false, id: null });
      fetchSuppliers();
    } catch (error) {
      alert("❌ Failed to delete supplier.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", color: "#3f51b5" }}>
        🏢 Supplier Management
      </Typography>

      {userRole === "admin" && (
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddCircleOutline />}
          sx={{ mb: 2 }}
          onClick={() => { setEditingSupplier(null); setSupplierData({ name: "", contactPerson: "", email: "", phone: "", address: "" }); setOpenModal(true); }}
        >
          + Add New Supplier
        </Button>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}><Business /> Name</TableCell>
              <TableCell sx={{ color: "white" }}><Business /> Contact Person</TableCell>
              <TableCell sx={{ color: "white" }}><Email /> Email</TableCell>
              <TableCell sx={{ color: "white" }}><Phone /> Phone</TableCell>
              <TableCell sx={{ color: "white" }}><LocationOn /> Address</TableCell>
              {userRole === "admin" && <TableCell sx={{ color: "white" }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <motion.tr key={supplier._id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contactPerson || "N/A"}</TableCell>
                <TableCell>{supplier.email || "N/A"}</TableCell>
                <TableCell>{supplier.phone || "N/A"}</TableCell>
                <TableCell>{supplier.address || "N/A"}</TableCell>
                 
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => { setEditingSupplier(supplier); setSupplierData(supplier); setOpenModal(true); }}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => setDeleteDialog({ open: true, id: supplier._id })}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Add/Edit Supplier Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>{editingSupplier ? "Edit Supplier" : "Add New Supplier"}</Typography>
          <TextField fullWidth label="Name" margin="normal" value={supplierData.name} onChange={(e) => setSupplierData({ ...supplierData, name: e.target.value })} />
          <TextField fullWidth label="Contact Person" margin="normal" value={supplierData.contactPerson} onChange={(e) => setSupplierData({ ...supplierData, contactPerson: e.target.value })} />
          <TextField fullWidth label="Email" margin="normal" value={supplierData.email} onChange={(e) => setSupplierData({ ...supplierData, email: e.target.value })} />
          <TextField fullWidth label="Phone" margin="normal" value={supplierData.phone} onChange={(e) => setSupplierData({ ...supplierData, phone: e.target.value })} />
          <TextField fullWidth label="Address" margin="normal" value={supplierData.address} onChange={(e) => setSupplierData({ ...supplierData, address: e.target.value })} />
          <Button variant="contained" color="primary" onClick={handleSaveSupplier} sx={{ mt: 2 }}>
            {editingSupplier ? "Update Supplier" : "Add Supplier"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setOpenModal(false)} sx={{ mt: 2, ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this supplier?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteSupplier} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Suppliers;
