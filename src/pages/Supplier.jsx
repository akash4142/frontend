import { useEffect, useState } from "react";
import { getSuppliers, createSupplier,updateSupplier,deleteSupplier } from "../api/apiService";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, Typography, Button, Modal, Box, TextField } from "@mui/material";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: "", contactPerson: "", email: "", phone: "", address: "" });

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

  const handleCreateSupplier = async () => {
    if (!newSupplier.name) {
      alert("❌ Please enter a supplier name!");
      return;
    }

    try {
      await createSupplier(newSupplier);
      alert("✅ Supplier added successfully!");
      setOpenModal(false);
      fetchSuppliers();
    } catch (error) {
      alert("❌ Failed to add supplier.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Suppliers</Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setOpenModal(true)}>
        + Add New Supplier
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Contact Person</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier._id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contactPerson || "N/A"}</TableCell>
                <TableCell>{supplier.email || "N/A"}</TableCell>
                <TableCell>{supplier.phone || "N/A"}</TableCell>
                <TableCell>{supplier.address || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Add New Supplier</Typography>
          <TextField fullWidth label="Name" margin="normal" value={newSupplier.name} onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })} />
          <TextField fullWidth label="Contact Person" margin="normal" value={newSupplier.contactPerson} onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })} />
          <TextField fullWidth label="Email" margin="normal" value={newSupplier.email} onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })} />
          <TextField fullWidth label="Phone" margin="normal" value={newSupplier.phone} onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })} />
          <TextField fullWidth label="Address" margin="normal" value={newSupplier.address} onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })} />
          <Button variant="contained" color="primary" onClick={handleCreateSupplier} sx={{ mt: 2 }}>Add Supplier</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Suppliers;
// import { useEffect, useState } from "react";
// import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from "../api/apiService";
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, Typography, Button, Modal, Box, TextField } from "@mui/material";

// const Suppliers = () => {
//   const [suppliers, setSuppliers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [editingSupplier, setEditingSupplier] = useState(null);
//   const [supplierData, setSupplierData] = useState({ name: "", contactPerson: "", email: "", phone: "", address: "" });

//   useEffect(() => {
//     fetchSuppliers();
//   }, []);

//   const fetchSuppliers = async () => {
//     try {
//       const data = await getSuppliers();
//       setSuppliers(data);
//     } catch (error) {
//       alert("Failed to fetch suppliers.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveSupplier = async () => {
//     try {
//       if (editingSupplier) {
//         await updateSupplier(editingSupplier._id, supplierData);
//         alert("✅ Supplier updated successfully!");
//       } else {
//         await createSupplier(supplierData);
//         alert("✅ Supplier added successfully!");
//       }
//       setOpenModal(false);
//       fetchSuppliers();
//     } catch (error) {
//       alert("❌ Failed to save supplier.");
//     }
//   };

//   const handleDeleteSupplier = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this supplier?")) return;
//     try {
//       await deleteSupplier(id);
//       alert("✅ Supplier deleted successfully!");
//       fetchSuppliers();
//     } catch (error) {
//       alert("❌ Failed to delete supplier.");
//     }
//   };

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Suppliers</Typography>

//       <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => { setEditingSupplier(null); setSupplierData({ name: "", contactPerson: "", email: "", phone: "", address: "" }); setOpenModal(true); }}>
//         + Add New Supplier
//       </Button>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
//             <TableRow>
//               <TableCell sx={{ color: "white" }}>Name</TableCell>
//               <TableCell sx={{ color: "white" }}>Contact Person</TableCell>
//               <TableCell sx={{ color: "white" }}>Email</TableCell>
//               <TableCell sx={{ color: "white" }}>Phone</TableCell>
//               <TableCell sx={{ color: "white" }}>Address</TableCell>
//               <TableCell sx={{ color: "white" }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {suppliers.map((supplier) => (
//               <TableRow key={supplier._id}>
//                 <TableCell>{supplier.name}</TableCell>
//                 <TableCell>{supplier.contactPerson || "N/A"}</TableCell>
//                 <TableCell>{supplier.email || "N/A"}</TableCell>
//                 <TableCell>{supplier.phone || "N/A"}</TableCell>
//                 <TableCell>{supplier.address || "N/A"}</TableCell>
//                 <TableCell>
//                   <Button color="primary" onClick={() => { setEditingSupplier(supplier); setSupplierData(supplier); setOpenModal(true); }}>Edit</Button>
//                   <Button color="error" onClick={() => handleDeleteSupplier(supplier._id)}>Delete</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default Suppliers;
