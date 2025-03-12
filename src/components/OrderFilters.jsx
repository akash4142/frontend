import { useState } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, Card, CardContent, Typography } from "@mui/material";
import { Refresh, FilterList } from "@mui/icons-material";

const OrderFilters = ({ filters, setFilters, fetchOrders, products }) => {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ productId: "", month: "", year: "", status: "", paymentStatus: "" });
    fetchOrders(); // Refresh orders without filters
  };

  // ✅ Month Names Array
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <Card sx={{ p: 2, mb: 3, borderRadius: "10px", boxShadow: 3 }}>
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          {/* Title */}
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", fontSize: "14px" }}>
              <FilterList sx={{ mr: 1 }} fontSize="small" /> Filter Orders
            </Typography>
          </Grid>

          {/* Product Filter */}
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Product</InputLabel>
              <Select value={filters.productId} onChange={(e) => handleFilterChange("productId", e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {products.map((product) => (
                  <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Status Filter */}
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Received">Received</MenuItem>
                <MenuItem value="In Production">In Production</MenuItem>
                <MenuItem value="Packaging">Packaging</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Payment Status Filter */}
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Payment Status</InputLabel>
              <Select value={filters.paymentStatus} onChange={(e) => handleFilterChange("paymentStatus", e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Month Filter with Names */}
          <Grid item xs={12} sm={2} md={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Month</InputLabel>
              <Select value={filters.month} onChange={(e) => handleFilterChange("month", e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {monthNames.map((month, index) => (
                  <MenuItem key={index + 1} value={index + 1}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Year Filter */}
          <Grid item xs={12} sm={2} md={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Year</InputLabel>
              <Select value={filters.year} onChange={(e) => handleFilterChange("year", e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {Array.from({ length: 5 }, (_, i) => (
                  <MenuItem key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Apply & Clear Buttons */}
          <Grid item xs={12} sm={4} md={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" size="small" onClick={fetchOrders} sx={{ mr: 1 }}>
              Apply
            </Button>
            <Button variant="outlined" color="secondary" size="small" onClick={clearFilters} startIcon={<Refresh />}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderFilters;
