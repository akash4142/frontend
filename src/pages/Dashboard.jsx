import { useEffect, useState } from "react";
import { getDashboardStats , getTotalPendingPayments} from "../api/apiService";
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";
import { ShoppingCart, AttachMoney, Inventory, Factory, EuroSymbol } from "@mui/icons-material";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [TotalPendingPayments , setTotalPendingPayments] = useState(0);

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
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    const total = await getTotalPendingPayments();
    setTotalPendingPayments(total);
  };

  if (loading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
        Dashboard Overview
      </Typography>

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

        
        

        {/* Pending Supplier Payments (€) */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", bgcolor: "red", color: "white", p: 2 }}>
            <CardContent>
              <EuroSymbol fontSize="large" />
              <Typography variant="h6">Total Pending Payments (€)</Typography>
              <Typography variant="h4">€{TotalPendingPayments}</Typography>
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
    </Container>
  );
};

export default Dashboard;
