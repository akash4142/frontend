import axiosClient from "./axiosClient";

// Fetch Dashboard Stats
export const getDashboardStats = async () => {
  try {
    const response = await axiosClient.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};


export const getSuppliers = async () => {
  try {
    const response = await axiosClient.get("/suppliers");
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return [];
  }
};


export const addProduct = async (newProduct) => {
  try {
    const response = await axiosClient.post("/products/add", newProduct);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.response ? error.response.data : error.message);
    throw error;
  }
};


// Fetch All Products
export const getProducts = async () => {
  try {
    const response = await axiosClient.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch All Orders
export const getOrders = async () => {
  try {
    const response = await axiosClient.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};


export const createOrder = async (orderData) => {
  try {
    const formattedOrder = {
      productId: orderData.productId , // ✅ Use existing product or set to null
      supplier: orderData.supplier || null, // ✅ Use existing supplier or set to null
      customSupplier: orderData.customSupplier || null, // ✅ Include manually entered supplier
      quantity: orderData.quantity, // ✅ Correct field name
      expectedDelivery: orderData.expectedDelivery, // ✅ Ensure expected delivery is sent
    };

    const response = await axiosClient.post("/orders/create", formattedOrder);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response ? error.response.data : error.message);
    throw error;
  }
};


// Fetch Stock Data
export const getStock = async () => {
  try {
    const response = await axiosClient.get("/stock");
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};


export const downloadPurchaseOrdersExcel = async () => {
  try {
    const response = await axiosClient.get("/orders/generate-excel", { responseType: "blob" });
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
    const response = await axiosClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// Update a Product
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await axiosClient.put(`/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a Product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axiosClient.put(`/orders/${id}/status`, { status });
    console.log("🔄 Order Updated:", response.data); // Debugging Log
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const downloadPurchaseOrderPDF = async (id) => {
  try {
    const response = await axiosClient.get(`/orders/${id}/generate-pdf`, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Purchase_Order_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(`Error downloading order ${id} PDF:`, error);
  }
};


export const checkPendingPayments = async () => {
  try {
    const response = await axiosClient.get("/orders/pending-payments");
    return response.data;
  } catch (error) {
    console.error("Error checking pending payments:", error);
    return { message: "Error fetching pending payments" };
  }
};


export const getPurchaseHistory = async () => {
  try {
    const response = await axiosClient.get("/orders/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching purchase history:", error.response ? error.response.data : error.message);
    throw error;
  }
};
