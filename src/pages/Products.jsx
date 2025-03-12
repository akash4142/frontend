
import { useEffect, useState } from "react";
import { getProducts, addProduct, getSuppliers } from "../api/apiService";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProductModal from "../components/ProductModal";
import { ShoppingCart, AttachMoney, Inventory, Category, Storefront, Ballot, ColorLens } from "@mui/icons-material";
import { motion } from "framer-motion"; // ✅ Import animation library

const userRole = localStorage.getItem("role") || "public"; // ✅ Get user role

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
    if (!newProduct.name || !newProduct.productionProcess || !newProduct.packagingType || !newProduct.quantityPerMasterBox || !newProduct.price || !newProduct.supplier || !newProduct.ASIN || !newProduct.SKU) {
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
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#ffffff",
          background: "linear-gradient(45deg, #ff6f61, #ffb74d)",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        🛍️ Product Management
      </Typography>

      {/* ✅ Admin Only: Add Product Button */}
      {userRole === "admin" ? (
        <Button
          variant="contained"
          color="primary"
          sx={{
            mb: 2,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #007AFF, #0051ff)",
            ":hover": { background: "linear-gradient(45deg, #0051ff, #0033cc)" },
          }}
          onClick={() => setOpenModal(true)}
        >
          + Add New Product
        </Button>
      ) : (
        <Typography variant="body2" color="gray">🔒 Admin Only</Typography>
      )}

      {/* ✅ Product Modal */}
      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleAddProduct={handleAddProduct}
        suppliers={suppliers}
      />

      {/* ✅ Product Table */}
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#2E3B55" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}><Ballot /> SKU</TableCell>
              <TableCell sx={{ color: "white" }}><Ballot /> ASIN</TableCell>
              <TableCell sx={{ color: "white" }}><ShoppingCart /> Name</TableCell>
              <TableCell sx={{ color: "white" }}><Category /> Manufacturer</TableCell>
              <TableCell sx={{ color: "white" }}><AttachMoney /> Price</TableCell>
              <TableCell sx={{ color: "white" }}><Inventory /> Packaging</TableCell>
              <TableCell sx={{ color: "white" }}><Storefront /> Supplier</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <motion.tr key={product._id} whileHover={{ scale: 1.02, backgroundColor: "#f1f1f1" }} transition={{ duration: 0.2 }}>
                <TableCell>{product.SKU}</TableCell>
                <TableCell>{product.ASIN}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.manufacturerReference}</TableCell>
                <TableCell sx={{ color: "#ff6f61", fontWeight: "bold" }}>€ {product.price}</TableCell>
                <TableCell>{product.packagingType}</TableCell>
                <TableCell>
                  {Array.isArray(product.suppliers) && product.suppliers.length > 0
                    ? product.suppliers.map((s) => s.name).join(", ")
                    : "No Supplier"}
                </TableCell>
                <TableCell>
                  <Tooltip title="View Product">
                    <Button
                      variant="contained"
                      sx={{
                        background: "linear-gradient(45deg, #4CAF50, #388E3C)",
                        ":hover": { background: "linear-gradient(45deg, #388E3C, #2E7D32)" },
                      }}
                      component={Link}
                      to={`/products/${product._id}`}
                    >
                      View
                    </Button>
                  </Tooltip>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Products;
