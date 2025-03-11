// import { useEffect, useState } from "react";
// import { getProducts, addProduct ,getSuppliers} from "../api/apiService";
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Container, TextField, Box, Modal, Typography,FormControl,InputLabel ,Select,MenuItem} from "@mui/material";
// import { Link } from "react-router-dom";
// import ProductModal from "../components/ProductModal";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [suppliers, setSuppliers] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     productionProcess: "",
//     packagingType: "",
//     requiredMaterials: "",
//     quantityPerMasterBox: "",
//     price: "",
//     supplier: "",
//     ASIN: "",
//     SKU: "",
//     manufacturerReference: "",
//   });

  
//   useEffect(() => {
//     fetchProducts();
//     fetchSuppliers();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await getProducts();
//       setProducts(data);
//     } catch (error) {
//       alert("Failed to fetch products.");
//     } finally {
//       setLoading(false);
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

//   const handleAddProduct = async () => {
//     if (!newProduct.name || !newProduct.productionProcess || !newProduct.packagingType || !newProduct.quantityPerMasterBox || !newProduct.price || !newProduct.supplier|| !newProduct.ASIN || !newProduct.SKU) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     try {
//       await addProduct({
//         ...newProduct,
//         requiredMaterials: newProduct.requiredMaterials.split(",").map((item) => item.trim()), // Convert string to array
//         quantityPerMasterBox: parseInt(newProduct.quantityPerMasterBox,10),
//         price:parseFloat(newProduct.price),
//         supplier: newProduct.supplier,
//       });

//       // Reset form fields
//       setNewProduct({ name: "", productionProcess: "", packagingType: "", requiredMaterials: "" , quantityPerMasterBox:"",price:"",supplier:"",ASIN:"",SKU:"",manufacturerReference:""});

//       fetchProducts(); // Refresh product list after adding a new product
//       setOpenModal(false); // Close the modal after adding a product
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product. Please try again.");
//     }
//   };

//   if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Products</Typography>

//       {/* ✅ "Add New Product" Button to Open Modal */}
//       <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
//         Add New Product
//       </Button>

//       {/* ✅ Modal for Adding a New Product */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box sx={{
//           position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//           width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
//         }}>
//           <Typography variant="h6" gutterBottom>Add New Product</Typography>
//           <TextField fullWidth label="Product Name" margin="normal"
//             value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//           />
//           <TextField fullWidth label="Production Process" margin="normal"
//             value={newProduct.productionProcess} onChange={(e) => setNewProduct({ ...newProduct, productionProcess: e.target.value })}
//           />
//           <TextField fullWidth label="Packaging Type" margin="normal"
//             value={newProduct.packagingType} onChange={(e) => setNewProduct({ ...newProduct, packagingType: e.target.value })}
//           />
//           <TextField fullWidth label="Required Materials (comma-separated)" margin="normal"
//             value={newProduct.requiredMaterials} onChange={(e) => setNewProduct({ ...newProduct, requiredMaterials: e.target.value })}
//           />
//            <TextField fullWidth label="Quantity Per Master Box" margin="normal" type="number"
//             value={newProduct.quantityPerMasterBox} onChange={(e) => setNewProduct({ ...newProduct, quantityPerMasterBox: e.target.value })}
//           />
//           <TextField fullWidth type="number" label="Price" margin="normal" value={newProduct.price}
//             onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//           />

//           {/* ✅ Single Supplier Selection */}
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>Select Supplier</InputLabel>
//             <Select
//               value={newProduct.supplier}
//               onChange={(e) => {
//                 setNewProduct({ ...newProduct, supplier: e.target.value });
//               }}
//             >
//               {suppliers.map((supplier) => (
//                 <MenuItem key={supplier._id} value={supplier._id}>{supplier.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField fullWidth label="ASIN" margin="normal" required value={newProduct.ASIN} onChange={(e) => setNewProduct({ ...newProduct, ASIN: e.target.value })} />
//           <TextField fullWidth label="SKU" margin="normal" required value={newProduct.SKU} onChange={(e) => setNewProduct({ ...newProduct, SKU: e.target.value })} />
//           <TextField fullWidth label="Manufacturer Reference" margin="normal" value={newProduct.manufacturerReference} onChange={(e) => setNewProduct({ ...newProduct, manufacturerReference: e.target.value })} />
//           <Button variant="contained" color="primary" onClick={handleAddProduct} sx={{ mt: 2 }}>
//             Submit
//           </Button>
//           <Button variant="outlined" color="secondary" onClick={() => setOpenModal(false)} sx={{ mt: 2, ml: 2 }}>
//             Cancel
//           </Button>
//         </Box>
//       </Modal>

//       {/* ✅ Product Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
//             <TableRow>
//               <TableCell sx={{ color: "white" }}>Name</TableCell>
//               <TableCell sx={{ color: "white" }}>Production Process</TableCell>
//               <TableCell sx={{ color: "white" }}>Packaging</TableCell>
//               <TableCell sx={{ color: "white" }}>Price</TableCell>
//               <TableCell sx={{ color: "white" }}>quantityPerMasterBox</TableCell>
//               <TableCell sx={{ color: "white" }}>Suppliers</TableCell> {/* ✅ New Column */}
//               <TableCell sx={{ color: "white" }}>Actions</TableCell>

              
              
              
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product._id}>
//                 <TableCell>{product.name}</TableCell>
//                 <TableCell>{product.productionProcess}</TableCell>
//                 <TableCell>{product.packagingType}</TableCell>
//                 <TableCell>$ {product.price}</TableCell>
//                 <TableCell>{product.quantityPerMasterBox}</TableCell>
//                 <TableCell>
//   {Array.isArray(product.suppliers) && product.suppliers.length > 0
//     ? product.suppliers.map((s) => s.name).join(", ")
//     : "No Supplier"} {/* ✅ Properly handles multiple suppliers */}
// </TableCell>

//                 <TableCell>
//                   <Button variant="contained" color="primary" component={Link} to={`/products/${product._id}`}>
//                     View
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default Products;



import { useEffect, useState } from "react";
import { getProducts, addProduct ,getSuppliers} from "../api/apiService";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Container, TextField, Box, Modal, Typography,FormControl,InputLabel ,Select,MenuItem} from "@mui/material";
import { Link } from "react-router-dom";
import ProductModal from "../components/ProductModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    productionProcess: "",
    packagingType: "",
    requiredMaterials: "",
    quantityPerMasterBox: "",
    price: "",
    supplier: "",
    ASIN: "",
    SKU: "",
    manufacturerReference: "",
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
    } finally {
      setLoading(false);
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

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.productionProcess || !newProduct.packagingType || !newProduct.quantityPerMasterBox || !newProduct.price || !newProduct.supplier|| !newProduct.ASIN || !newProduct.SKU) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await addProduct({ ...newProduct });
      setOpenModal(false);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product. Please try again.");
    }
  };

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Products</Typography>

      {/* ✅ "Add New Product" Button to Open Modal */}
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
        Add New Product
      </Button>

      <ProductModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              handleAddProduct={handleAddProduct}
              suppliers={suppliers}
      />

      {/* ✅ Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>SKU</TableCell>
              <TableCell sx={{ color: "white" }}>ASIN</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>ManufacturerReference</TableCell>
              <TableCell sx={{ color: "white" }}>Production Process</TableCell>
              <TableCell sx={{ color: "white" }}>Packaging</TableCell>
              <TableCell sx={{ color: "white" }}>Price</TableCell>
              <TableCell sx={{ color: "white" }}>QuantityPerMasterBox</TableCell>
              <TableCell sx={{ color: "white" }}>Suppliers</TableCell> {/* ✅ New Column */}
              <TableCell sx={{ color: "white" }}>Actions</TableCell>

              
              
              
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.SKU}</TableCell>
                <TableCell>{product.ASIN}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.manufacturerReference}</TableCell>
                <TableCell>{product.productionProcess}</TableCell>
                <TableCell>{product.packagingType}</TableCell>
                <TableCell>$ {product.price}</TableCell>
                <TableCell>{product.quantityPerMasterBox}</TableCell>
                <TableCell>
  {Array.isArray(product.suppliers) && product.suppliers.length > 0
    ? product.suppliers.map((s) => s.name).join(", ")
    : "No Supplier"} {/* ✅ Properly handles multiple suppliers */}
</TableCell>

                <TableCell>
                  <Button variant="contained" color="primary" component={Link} to={`/products/${product._id}`}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Products;
