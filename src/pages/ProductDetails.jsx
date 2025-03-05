import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct, deleteProduct } from "../api/apiService";
import { Card, CardContent, Typography, Button, Container, TextField } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});

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

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading product details...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
        <CardContent>
          {!editing ? (
            <>
              <Typography variant="h5" gutterBottom>{product.name}</Typography>
              <Typography><strong>Production Process:</strong> {product.productionProcess}</Typography>
              <Typography><strong>Packaging Type:</strong> {product.packagingType}</Typography>
              <Typography><strong>Suppliers:</strong> {product.suppliers?.map(s => s.name).join(", ") || "N/A"}</Typography>
              <Typography><strong>Required Materials:</strong> {product.requiredMaterials?.join(", ") || "N/A"}</Typography>

              <Button onClick={() => setEditing(true)} variant="contained" color="primary" sx={{ mt: 2, mr: 1 }}>
                Edit
              </Button>
              <Button onClick={handleDelete} variant="contained" color="error" sx={{ mt: 2 }}>
                Delete
              </Button>
            </>
          ) : (
            <div>
              <TextField
                label="Product Name"
                fullWidth
                margin="normal"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <TextField
                label="Production Process"
                fullWidth
                margin="normal"
                value={updatedProduct.productionProcess}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, productionProcess: e.target.value })}
              />
              <TextField
                label="Packaging Type"
                fullWidth
                margin="normal"
                value={updatedProduct.packagingType}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, packagingType: e.target.value })}
              />
              <Button onClick={handleEdit} variant="contained" color="success" sx={{ mt: 2, mr: 1 }}>
                Save
              </Button>
              <Button onClick={() => setEditing(false)} variant="contained" color="secondary" sx={{ mt: 2 }}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Button onClick={() => navigate("/products")} variant="outlined" sx={{ mt: 4, display: "block", mx: "auto" }}>
        Back to Products
      </Button>
    </Container>
  );
};

export default ProductDetails;
