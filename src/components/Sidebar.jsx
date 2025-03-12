import { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from "@mui/material";
import { Dashboard, ShoppingCart, Inventory, History, Build, Group, Category } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // ✅ Get current path
  const [drawerOpen] = useState(true);

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, link: "/" },
    { text: "Products", icon: <Category />, link: "/products" },
    { text: "Orders", icon: <ShoppingCart />, link: "/orders" },
    { text: "Stock", icon: <Inventory />, link: "/stock" },
    { text: "Purchase History", icon: <History />, link: "/purchase-history" },
    { text: "Production", icon: <Build />, link: "/production" },
    { text: "Suppliers", icon: <Group />, link: "/suppliers" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={drawerOpen}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          bgcolor: "#2E0249", // ✅ Funky sidebar background color
          color: "white",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.link}
                sx={{
                  color: location.pathname === item.link ? "#FDE74C" : "white", // ✅ Highlight active link
                  bgcolor: location.pathname === item.link ? "#420C5F" : "transparent",
                  borderRadius: "8px",
                  m: 1,
                  "&:hover": {
                    bgcolor: "#7C00A0", // ✅ Hover background effect
                    color: "#FDE74C",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: location.pathname === item.link ? "bold" : "normal",
                        textDecoration: location.pathname === item.link ? "underline" : "none",
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
