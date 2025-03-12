import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

const OrderFilters = ({ filters, setFilters, fetchOrders }) => (
  <>
    <FormControl sx={{ mr: 2, minWidth: 200 }}>
      <InputLabel>Filter by Product</InputLabel>
      <Select value={filters.productId} onChange={(e) => setFilters({ ...filters, productId: e.target.value })}>
        <MenuItem value="">All Products</MenuItem>
      </Select>
    </FormControl>
    <Button variant="contained" color="primary" onClick={fetchOrders}>Apply Filters</Button>
  </>
);

export default OrderFilters;
