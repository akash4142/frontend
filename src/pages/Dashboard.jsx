import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/apiService";
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";
import { ShoppingCart, Inventory, Factory, EuroSymbol } from "@mui/icons-material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts";

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

  // ✅ Monthly Purchases vs Payments Due
  const financeData = stats.financeTrends?.length ? stats.financeTrends : null;
  
  // ✅ Production Efficiency
  const productionData = [
    { name: "Pending Orders", value: stats.pendingOrders },
    { name: "Completed Orders", value: stats.completedOrders },
  ];

  // ✅ Stock Trends Over Time
  const stockTrendsData = stats.stockTrends?.length ? stats.stockTrends : null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}>
        📊 Business Insights Dashboard
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

        {/* Pending Payments */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: "center", bgcolor: "red", color: "white", p: 2 }}>
            <CardContent>
              <EuroSymbol fontSize="large" />
              <Typography variant="h6">Total Pending Payments (€)</Typography>
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

      {/* ✅ Graphs Section */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {/* ✅ Bar Chart: Purchases vs Payments Due */}
        {financeData && (
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" align="center" gutterBottom>
                📈 Monthly Purchases vs Payments Due
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={financeData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="purchases" fill="#3f51b5" name="Purchases" />
                  <Bar dataKey="paymentsDue" fill="#ff3d00" name="Payments Due" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        )}

        {/* ✅ Production Efficiency (if data is valid) */}
        {productionData.some(item => item.value > 0) && (
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" align="center" gutterBottom>
                🏭 Production Efficiency (Orders Processed)
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={productionData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#388e3c" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        )}

        {/* ✅ Line Chart: Stock Levels Over Time */}
        {stockTrendsData && (
          <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" align="center" gutterBottom>
                📦 Stock Levels Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={stockTrendsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="stockLevel" stroke="#f57c00" name="Stock Level" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
