import axiosClient from "./axiosClient";


// Fetch Dashboard Stats
export const getDashboardStats = async () => {
  try {
    const response = await axiosClient.get("/api/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};


export const getSuppliers = async () => {
  try {
    const response = await axiosClient.get("/api/suppliers");
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return [];
  }
};


export const addProduct = async (newProduct) => {
  try {
    const response = await axiosClient.post("/api/products/add", newProduct);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.response ? error.response.data : error.message);
    throw error;
  }
};


// Fetch All Products
export const getProducts = async () => {
  try {
    const response = await axiosClient.get("/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch All Orders
// export const getOrders = async () => {
//   try {
//     const response = await axiosClient.get("/api/orders");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     throw error;
//   }
// };
export const getOrders = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString(); // ✅ Convert filters to query string
    const response = await axiosClient.get(`/api/orders?${params}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching orders:", error.response?.data || error.message);
    throw error;
  }
};


export const sendOrderToProduction = async (orderId) => {
  try {
    const response = await axiosClient.post("/api/production/send-to-production", { orderId });
    return response.data;
  } catch (error) {
    console.error("❌ Error sending order to production:", error.response?.data || error.message);
    throw error;
  }
};



export const createOrder = async (orderData) => {
  try {
    const response = await axiosClient.post("/api/orders/create", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response ? error.response.data : error.message);
    throw error;
  }
};


// Fetch Stock Data
export const getStock = async () => {
  try {
    const response = await axiosClient.get("/api/stock");
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};


export const downloadPurchaseOrdersExcel = async () => {
  try {
    const response = await axiosClient.get("/api/orders/generate-excel", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Purchase_Orders.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading purchase orders Excel file:", error);
  }
};



// Fetch a Single Product by ID
export const getProductById = async (id) => {
  try {
    const response = await axiosClient.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// Update a Product
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await axiosClient.put(`/api/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a Product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosClient.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axiosClient.put(`/api/orders/${id}/status`, { status });
    console.log("🔄 Order Updated:", response.data); // Debugging Log
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const downloadPurchaseOrderPDF = async (orderId) => {
  try {
    const response = await axiosClient.get(`/api/orders/${orderId}/generate-pdf`, { responseType: "blob" });

    if (response.status !== 200) {
      throw new Error("Failed to generate PDF");
    }

    // ✅ Create URL for Blob Data
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // ✅ Create Download Link
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Invoice_${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`✅ Invoice PDF for order ${orderId} downloaded successfully.`);
  } catch (error) {
    console.error(`❌ Error downloading order ${orderId} PDF:`, error);
    alert(`❌ Failed to download invoice PDF.`);
  }
};



export const checkPendingPayments = async () => {
  try {
    const response = await axiosClient.get("/api/orders/pending-payments");
    return response.data;
  } catch (error) {
    console.error("Error checking pending payments:", error);
    return { message: "Error fetching pending payments" };
  }
};


export const getPurchaseHistory = async () => {
  try {
    const response = await axiosClient.get("/api/orders/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching purchase history:", error.response ? error.response.data : error.message);
    throw error;
  }
};



// ✅ Fetch all production orders
export const getProductionOrders = async () => {
  try {
    const response = await axiosClient.get("/api/production");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching production orders:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Start production for an order
export const startProduction = async (orderId, productId, quantity, packagingProcess) => {
  try {
    const response = await axiosClient.post("/api/production/start", {
      orderId,
      productId,
      quantity,
      packagingProcess,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error starting production:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update production status (Move to Packaging, Completed)
export const updateProductionStatus = async (productionId, status) => {
  try {
    const response = await axiosClient.put(`/api/production/${productionId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("❌ Error updating production status:", error.response?.data || error.message);
    throw error;
  }
};


