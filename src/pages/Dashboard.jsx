import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/apiService";
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";
import { ShoppingCart, AttachMoney, Inventory, Factory } from "@mui/icons-material";

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
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", bgcolor: "#3f51b5", color: "white" }}>
            <CardContent>
              <ShoppingCart fontSize="large" />
              <Typography variant="h6">Total Purchases</Typography>
              <Typography variant="h4">{stats.totalPurchases}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", bgcolor: "#d32f2f", color: "white" }}>
            <CardContent>
              <AttachMoney fontSize="large" />
              <Typography variant="h6">Pending Payments</Typography>
              <Typography variant="h4">{stats.pendingPayments}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", bgcolor: "#388e3c", color: "white" }}>
            <CardContent>
              <Inventory fontSize="large" />
              <Typography variant="h6">Stock Items</Typography>
              <Typography variant="h4">{stats.totalStockItems}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", bgcolor: "#f57c00", color: "white" }}>
            <CardContent>
              <Factory fontSize="large" />
              <Typography variant="h6">Ongoing Production</Typography>
              <Typography variant="h4">{stats.ongoingProduction}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
