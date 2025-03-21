import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/apiService";
import { Grid, Card, CardContent, Typography, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { ShoppingCart, Inventory, Factory, EuroSymbol } from "@mui/icons-material";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        alert("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}>
        📊 Business Insights Dashboard
      </Typography>

      {/* ✅ Stats Overview */}
      <Grid container spacing={3} justifyContent="center">
        {/* Total Purchases */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", bgcolor: "#3f51b5", color: "white", p: 2 }}>
            <CardContent>
              <ShoppingCart fontSize="large" />
              <Typography variant="h6">Total Purchases</Typography>
              <Typography variant="h4">{stats.totalPurchases}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Payments */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", bgcolor: "red", color: "white", p: 2 }}>
            <CardContent>
              <EuroSymbol fontSize="large" />
              <Typography variant="h6">Pending Payments</Typography>
              <Typography variant="h4">€{stats.pendingPayments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Stock Items */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", bgcolor: "#388e3c", color: "white", p: 2 }}>
            <CardContent>
              <Inventory fontSize="large" />
              <Typography variant="h6">Stock Items</Typography>
              <Typography variant="h4">{stats.totalStockItems}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Ongoing Production */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", bgcolor: "#f57c00", color: "white", p: 2 }}>
            <CardContent>
              <Factory fontSize="large" />
              <Typography variant="h6">Ongoing Production</Typography>
              <Typography variant="h4">{stats.ongoingProduction}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ✅ Latest Orders Table */}
      <Typography variant="h5" sx={{ mt: 4, fontWeight: "bold" }}>
        📌 Latest Orders
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976D2", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Order ID</TableCell>
              <TableCell sx={{ color: "white" }}>Invoice No.</TableCell>
              <TableCell sx={{ color: "white" }}>Products</TableCell>
              <TableCell sx={{ color: "white" }}>Supplier</TableCell>
              <TableCell sx={{ color: "white" }}>Total Invoice (€)</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.latestOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderNumber || order._id}</TableCell>
                <TableCell>{order.invoiceNumber}</TableCell>
                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>
                      {p.product?.name || "Deleted Product"} - {p.quantity} pcs
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.supplier?.name || order.customSupplier}</TableCell>
                <TableCell>€{order.invoiceAmount.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Orders in Production Table */}
      <Typography variant="h5" sx={{ mt: 4, fontWeight: "bold" }}>
        🏭 Orders in Production
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f57c00", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Order ID</TableCell>
              <TableCell sx={{ color: "white" }}>Invoice No.</TableCell>
              <TableCell sx={{ color: "white" }}>Products</TableCell>
              <TableCell sx={{ color: "white" }}>Total Invoice (€)</TableCell>
              <TableCell sx={{ color: "white" }}>Production Stage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.ordersInProduction.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderNumber || order._id}</TableCell>
                <TableCell>{order.invoiceNumber}</TableCell>
                <TableCell>
                  {order.products.map((p, idx) => (
                    <div key={idx}>
                      {p.product?.name || "Deleted Product"} - {p.quantity} pcs
                    </div>
                  ))}
                </TableCell>
                <TableCell>€{order.invoiceAmount.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
