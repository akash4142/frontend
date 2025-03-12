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
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { Edit, Delete, Save, Cancel, ArrowBack, Ballot, AttachMoney, Category } from "@mui/icons-material";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [updatedProduct, setUpdatedProduct] = useState({});

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
//       navigate("/products");
//     } catch (error) {
//       console.error("Error deleting product:", error);
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
//             maxWidth: 750,
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

//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Typography sx={{ fontSize: "18px", fontFamily: "Montserrat, sans-serif", color: "#444" }}>
//                       <Ballot sx={{ color: "#FF9800" }} /> <strong>ASIN:</strong> {product.ASIN}
//                     </Typography>
//                     <Typography sx={{ fontSize: "18px", fontFamily: "Montserrat, sans-serif", color: "#444" }}>
//                       <Category sx={{ color: "#FF9800" }} /> <strong>SKU:</strong> {product.SKU}
//                     </Typography>
//                     <Typography sx={{ fontSize: "18px", fontFamily: "Montserrat, sans-serif", color: "#444" }}>
//                       <strong>Manufacturer:</strong> {product.manufacturerReference}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography sx={{ fontSize: "18px", fontFamily: "Montserrat, sans-serif", color: "#444" }}>
//                       <AttachMoney sx={{ color: "#4CAF50" }} /> <strong>Price:</strong> ${product.price}
//                     </Typography>
//                     <Typography sx={{ fontSize: "18px", fontFamily: "Montserrat, sans-serif", color: "#444" }}>
//                       <strong>Packaging Type:</strong> {product.packagingType}
//                     </Typography>
//                     <Typography sx={{ fontSize: "18px", fontFamily: "Montserrat, sans-serif", color: "#444" }}>
//                       <strong>Required Materials:</strong> {product.requiredMaterials?.join(", ") || "N/A"}
//                     </Typography>
//                   </Grid>
//                 </Grid>

//                 <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
//                   <Button
//                     onClick={() => setEditing(true)}
//                     variant="contained"
//                     sx={{
//                       background: "#FFA000",
//                       ":hover": { background: "#FF8F00" },
//                       fontFamily: "Raleway, sans-serif",
//                     }}
//                   >
//                     <Edit sx={{ mr: 1 }} /> Edit
//                   </Button>
//                   <Button
//                     onClick={handleDelete}
//                     variant="contained"
//                     color="error"
//                     sx={{ fontFamily: "Raleway, sans-serif" }}
//                   >
//                     <Delete sx={{ mr: 1 }} /> Delete
//                   </Button>
//                 </Box>
//               </>
//             ) : (
//               <Box>
//                 <TextField
//                   label="Product Name"
//                   fullWidth
//                   margin="normal"
//                   value={updatedProduct.name}
//                   onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
//                   sx={{ background: "white", borderRadius: "5px", fontFamily: "Montserrat, sans-serif" }}
//                 />
//                 <TextField
//                   label="Production Process"
//                   fullWidth
//                   margin="normal"
//                   value={updatedProduct.productionProcess}
//                   onChange={(e) => setUpdatedProduct({ ...updatedProduct, productionProcess: e.target.value })}
//                   sx={{ background: "white", borderRadius: "5px", fontFamily: "Montserrat, sans-serif" }}
//                 />
//                 <TextField
//                   label="Packaging Type"
//                   fullWidth
//                   margin="normal"
//                   value={updatedProduct.packagingType}
//                   onChange={(e) => setUpdatedProduct({ ...updatedProduct, packagingType: e.target.value })}
//                   sx={{ background: "white", borderRadius: "5px", fontFamily: "Montserrat, sans-serif" }}
//                 />
//                 <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
//                   <Button onClick={handleEdit} variant="contained" color="success">
//                     <Save sx={{ mr: 1 }} /> Save
//                   </Button>
//                   <Button onClick={() => setEditing(false)} variant="contained" color="secondary">
//                     <Cancel sx={{ mr: 1 }} /> Cancel
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>

//       <Button
//         onClick={() => navigate("/products")}
//         variant="outlined"
//         sx={{
//           mt: 4,
//           display: "block",
//           mx: "auto",
//           color: "#fff",
//           backgroundColor: "#1976D2",
//           ":hover": { backgroundColor: "#1565C0" },
//           fontFamily: "Raleway, sans-serif",
//         }}
//       >
//         <ArrowBack sx={{ mr: 1 }} /> Back to Products
//       </Button>
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
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [expandProcess, setExpandProcess] = useState(false);
  const userRole = localStorage.getItem("role") || "public"; // ✅ Get user role

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
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading)
    return (
      <Typography align="center" sx={{ mt: 4, fontSize: "22px", fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }}>
        Loading product details...
      </Typography>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
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
            {!editing ? (
              <>
                {/* Product Name */}
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontFamily: "Raleway, sans-serif",
                    color: "#1976D2",
                  }}
                >
                  {product.name}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Product Details in Table Format */}
                <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", width: "35%" }}>
                          <Ballot sx={{ color: "#FF9800", mr: 1 }} />
                          ASIN:
                        </TableCell>
                        <TableCell>{product.ASIN}</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          <Category sx={{ color: "#FF9800", mr: 1 }} />
                          SKU:
                        </TableCell>
                        <TableCell>{product.SKU}</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          <Info sx={{ color: "#4CAF50", mr: 1 }} />
                          Manufacturer:
                        </TableCell>
                        <TableCell>{product.manufacturerReference}</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          <AttachMoney sx={{ color: "#4CAF50", mr: 1 }} />
                          Price:
                        </TableCell>
                        <TableCell>${product.price}</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          <LocalShipping sx={{ color: "#1976D2", mr: 1 }} />
                          Packaging Type:
                        </TableCell>
                        <TableCell>{product.packagingType}</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          <Inventory sx={{ color: "#673ab7", mr: 1 }} />
                          Required Materials:
                        </TableCell>
                        <TableCell>{product.requiredMaterials?.join(", ") || "N/A"}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Divider sx={{ my: 2 }} />

                {/* Expandable Production Process Section */}
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

                {/* ✅ Show Edit/Delete Buttons Only for Admins */}
                 (
                  <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button variant="contained" sx={{ background: "#FFA000", ":hover": { background: "#FF8F00" } }}>
                      <Edit sx={{ mr: 1 }} /> Edit
                    </Button>
                    <Button variant="contained" color="error">
                      <Delete sx={{ mr: 1 }} /> Delete
                    </Button>
                  </Box>
                )
              </>
            ) : null}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ProductDetails;
