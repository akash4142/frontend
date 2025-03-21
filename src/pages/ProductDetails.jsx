
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getProductById, updateProduct, deleteProduct } from "../api/apiService";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Container,
//   TextField,
//   Box,
//   Grid,
//   Divider,
//   IconButton,
//   Collapse,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogTitle,DialogContent,DialogActions
// } from "@mui/material";
// import { motion } from "framer-motion";
// import {
//   Edit,
//   Delete,
//   Save,
//   Cancel,
//   ArrowBack,
//   Ballot,
//   AttachMoney,
//   Category,
//   ExpandMore,
//   ExpandLess,
//   Info,
//   Inventory,
//   LocalShipping,
// } from "@mui/icons-material";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [updatedProduct, setUpdatedProduct] = useState({});
//   const [expandProcess, setExpandProcess] = useState(false);

//   useEffect(() => {
//     fetchProductDetails();
//   }, []);

//   const fetchProductDetails = async () => {
//     try {
//       const data = await getProductById(id);
//       setProduct(data);
//       setUpdatedProduct(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//       setLoading(false);
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       await updateProduct(id, updatedProduct);
//       setEditing(false);
//       fetchProductDetails();
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await deleteProduct(id);
//       alert("Order deleted successfully!")
//       navigate("/products");
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Failed to delete Order.")
//     }
//   };

//   if (loading)
//     return (
//       <Typography align="center" sx={{ mt: 4, fontSize: "22px", fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }}>
//         Loading product details...
//       </Typography>
//     );

//   return (
//     <Container sx={{ mt: 4 }}>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Card
//           sx={{
//             maxWidth: 900,
//             mx: "auto",
//             p: 4,
//             boxShadow: 4,
//             borderRadius: "15px",
//             background: "#FFFFFF",
//             color: "#333",
//             border: "2px solid #ddd",
//           }}
//         >
//           <CardContent>
//             {!editing ? (
//               <>
//                 {/* Product Name */}
//                 <Typography
//                   variant="h4"
//                   gutterBottom
//                   sx={{
//                     textAlign: "center",
//                     fontWeight: "bold",
//                     fontFamily: "Raleway, sans-serif",
//                     color: "#1976D2",
//                   }}
//                 >
//                   {product.name}
//                 </Typography>

//                 <Divider sx={{ my: 2 }} />

//                 {/* Product Details in Table Format */}
//                 <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
//                   <Table>
//                     <TableBody>
//                       <TableRow>
//                         <TableCell sx={{ fontWeight: "bold", width: "35%" }}>
//                           <Ballot sx={{ color: "#FF9800", mr: 1 }} />
//                           ASIN:
//                         </TableCell>
//                         <TableCell>{product.ASIN}</TableCell>
//                       </TableRow>

//                       <TableRow>
//                         <TableCell sx={{ fontWeight: "bold" }}>
//                           <Category sx={{ color: "#FF9800", mr: 1 }} />
//                           SKU:
//                         </TableCell>
//                         <TableCell>{product.SKU}</TableCell>
//                       </TableRow>

//                       <TableRow>
//                         <TableCell sx={{ fontWeight: "bold" }}>
//                           <Info sx={{ color: "#4CAF50", mr: 1 }} />
//                           Manufacturer:
//                         </TableCell>
//                         <TableCell>{product.manufacturerReference}</TableCell>
//                       </TableRow>

//                       <TableRow>
//                         <TableCell sx={{ fontWeight: "bold" }}>
//                           <AttachMoney sx={{ color: "#4CAF50", mr: 1 }} />
//                           Price:
//                         </TableCell>
//                         <TableCell>${product.price}</TableCell>
//                       </TableRow>

//                       <TableRow>
//                         <TableCell sx={{ fontWeight: "bold" }}>
//                           <LocalShipping sx={{ color: "#1976D2", mr: 1 }} />
//                           Packaging Type:
//                         </TableCell>
//                         <TableCell>{product.packagingType}</TableCell>
//                       </TableRow>

//                       <TableRow>
//                         <TableCell sx={{ fontWeight: "bold" }}>
//                           <Inventory sx={{ color: "#673ab7", mr: 1 }} />
//                           Required Materials:
//                         </TableCell>
//                         <TableCell>{product.requiredMaterials?.join(", ") || "N/A"}</TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//                 <Divider sx={{ my: 2 }} />

//                 {/* Expandable Production Process Section */}
//                 <Box sx={{ mt: 3 }}>
//                   <Typography
//                     sx={{
//                       fontSize: "18px",
//                       fontFamily: "Montserrat, sans-serif",
//                       color: "#444",
//                       cursor: "pointer",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       bgcolor: "#f5f5f5",
//                       p: 2,
//                       borderRadius: "5px",
//                     }}
//                     onClick={() => setExpandProcess(!expandProcess)}
//                   >
//                     <strong>Production Process:</strong> {expandProcess ? <ExpandLess /> : <ExpandMore />}
//                   </Typography>

//                   <Collapse in={expandProcess} timeout="auto" unmountOnExit>
//                     <Box sx={{ bgcolor: "#f0f0f0", p: 2, mt: 1, borderRadius: "5px" }}>
//                       <Typography sx={{ fontSize: "16px", fontFamily: "Montserrat, sans-serif", color: "#333" }}>
//                         {product.productionProcess || "No production process details available."}
//                       </Typography>
//                     </Box>
//                   </Collapse>
//                 </Box>




//                 <Dialog open={editing} onClose={() => setEditing(false)} fullWidth maxWidth="sm">
//   <DialogTitle>Edit Product</DialogTitle>
//   <DialogContent dividers>
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <TextField
//           label="Name"
//           fullWidth
//           value={updatedProduct.name || ""}
//           onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
//         />
//       </Grid>

//       <Grid item xs={6}>
//         <TextField
//           label="ASIN"
//           fullWidth
//           value={updatedProduct.ASIN || ""}
//           onChange={(e) => setUpdatedProduct({ ...updatedProduct, ASIN: e.target.value })}
//         />
//       </Grid>

//       <Grid item xs={6}>
//         <TextField
//           label="SKU"
//           fullWidth
//           value={updatedProduct.SKU || ""}
//           onChange={(e) => setUpdatedProduct({ ...updatedProduct, SKU: e.target.value })}
//         />
//       </Grid>

//       <Grid item xs={12}>
//         <TextField
//           label="Manufacturer Reference"
//           fullWidth
//           value={updatedProduct.manufacturerReference || ""}
//           onChange={(e) =>
//             setUpdatedProduct({ ...updatedProduct, manufacturerReference: e.target.value })
//           }
//         />
//       </Grid>

//       <Grid item xs={6}>
//         <TextField
//           label="Price"
//           type="number"
//           fullWidth
//           value={updatedProduct.price || ""}
//           onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
//         />
//       </Grid>

//       <Grid item xs={6}>
//         <TextField
//           label="Packaging Type"
//           fullWidth
//           value={updatedProduct.packagingType || ""}
//           onChange={(e) => setUpdatedProduct({ ...updatedProduct, packagingType: e.target.value })}
//         />
//       </Grid>

//       <Grid item xs={12}>
//         <TextField
//           label="Required Materials (comma-separated)"
//           fullWidth
//           value={updatedProduct.requiredMaterials?.join(", ") || ""}
//           onChange={(e) =>
//             setUpdatedProduct({
//               ...updatedProduct,
//               requiredMaterials: e.target.value.split(",").map((mat) => mat.trim()),
//             })
//           }
//         />
//       </Grid>

//       <Grid item xs={12}>
//         <TextField
//           label="Production Process"
//           multiline
//           fullWidth
//           minRows={3}
//           value={updatedProduct.productionProcess || ""}
//           onChange={(e) =>
//             setUpdatedProduct({ ...updatedProduct, productionProcess: e.target.value })
//           }
//         />
//       </Grid>
//     </Grid>
//   </DialogContent>

//   <DialogActions>
//     <Button onClick={() => setEditing(false)} color="inherit">
//       Cancel
//     </Button>
//     <Button onClick={handleEdit} variant="contained" color="primary">
//       Save
//     </Button>
//   </DialogActions>
// </Dialog>

















//                 {/* ✅ Show Edit/Delete Buttons Only for Admins */}
                 
//                   <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
//                   <Button 
//   variant="contained" 
//   sx={{ background: "#FFA000", ":hover": { background: "#FF8F00" } }} 
//   onClick={() => setEditing(true)}
// >
//   <Edit sx={{ mr: 1 }} /> Edit 
// </Button>

// <Button 
//   variant="contained" 
//   color="error" 
//   onClick={() => handleDelete(product._id)}
// >
//   <Delete sx={{ mr: 1 }} /> Delete
// </Button>

//                   </Box>
                
//               </>
//             ) : null}
//           </CardContent>
//         </Card>
//       </motion.div>
//     </Container>
//   );
// };

// export default ProductDetails;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct, deleteProduct } from "../api/apiService";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  TextField,
  Box,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
} from "@mui/material";
import {
  Edit,
  Delete,
  Save,
  Cancel,
  ArrowBack,
  Ballot,
  AttachMoney,
  Category,
  ExpandMore,
  ExpandLess,
  Info,
  Inventory,
  LocalShipping,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [expandProcess, setExpandProcess] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
      setUpdatedProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      await updateProduct(id, updatedProduct);
      setEditing(false);
      fetchProductDetails();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      alert("Product deleted successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <Typography align="center" sx={{ mt: 4, fontSize: "22px", fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }}>
        Loading product details...
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Card
          sx={{
            maxWidth: 900,
            mx: "auto",
            p: 4,
            boxShadow: 4,
            borderRadius: "15px",
            background: "#FFFFFF",
            color: "#333",
            border: "2px solid #ddd",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", fontFamily: "Raleway, sans-serif", color: "#1976D2" }}>
              {product.name}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", width: "35%" }}><Ballot sx={{ color: "#FF9800", mr: 1 }} /> ASIN:</TableCell>
                    <TableCell>{product.ASIN}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}><Category sx={{ color: "#FF9800", mr: 1 }} /> SKU:</TableCell>
                    <TableCell>{product.SKU}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}><Info sx={{ color: "#4CAF50", mr: 1 }} /> Manufacturer:</TableCell>
                    <TableCell>{product.manufacturerReference}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}><AttachMoney sx={{ color: "#4CAF50", mr: 1 }} /> Price:</TableCell>
                    <TableCell>${product.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}><LocalShipping sx={{ color: "#1976D2", mr: 1 }} /> Packaging Type:</TableCell>
                    <TableCell>{product.packagingType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}><Inventory sx={{ color: "#673ab7", mr: 1 }} /> Required Materials:</TableCell>
                    <TableCell>{product.requiredMaterials?.join(", ") || "N/A"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 2 }} />

            {/* Expandable Production Process */}
            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontFamily: "Montserrat, sans-serif",
                  color: "#444",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "#f5f5f5",
                  p: 2,
                  borderRadius: "5px",
                }}
                onClick={() => setExpandProcess(!expandProcess)}
              >
                <strong>Production Process:</strong> {expandProcess ? <ExpandLess /> : <ExpandMore />}
              </Typography>

              <Collapse in={expandProcess} timeout="auto" unmountOnExit>
                <Box sx={{ bgcolor: "#f0f0f0", p: 2, mt: 1, borderRadius: "5px" }}>
                  <Typography sx={{ fontSize: "16px", fontFamily: "Montserrat, sans-serif", color: "#333" }}>
                    {product.productionProcess || "No production process details available."}
                  </Typography>
                </Box>
              </Collapse>
            </Box>

            {/* Buttons */}
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                sx={{ background: "#FFA000", ":hover": { background: "#FF8F00" } }}
                onClick={() => setEditing(true)}
              >
                <Edit sx={{ mr: 1 }} /> Edit
              </Button>

              <Button variant="contained" color="error" onClick={handleDelete}>
                <Delete sx={{ mr: 1 }} /> Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <Button
        onClick={() => navigate("/products")}
        variant="outlined"
        sx={{
          mt: 4,
          display: "block",
          mx: "auto",
          color: "#fff",
          backgroundColor: "#1976D2",
          ":hover": { backgroundColor: "#1565C0" },
          fontFamily: "Raleway, sans-serif",
        }}
      >
        <ArrowBack sx={{ mr: 1 }} /> Back to Products
      </Button>

      {/* 🛠️ EDIT DIALOG */}
      <Dialog open={editing} onClose={() => setEditing(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={updatedProduct.name || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="ASIN"
                fullWidth
                value={updatedProduct.ASIN || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, ASIN: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="SKU"
                fullWidth
                value={updatedProduct.SKU || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, SKU: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Manufacturer Reference"
                fullWidth
                value={updatedProduct.manufacturerReference || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, manufacturerReference: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={updatedProduct.price || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Packaging Type"
                fullWidth
                value={updatedProduct.packagingType || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, packagingType: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Required Materials (comma-separated)"
                fullWidth
                value={updatedProduct.requiredMaterials?.join(", ") || ""}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    requiredMaterials: e.target.value.split(",").map((mat) => mat.trim()),
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Production Process"
                multiline
                fullWidth
                minRows={3}
                value={updatedProduct.productionProcess || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, productionProcess: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditing(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductDetails;
