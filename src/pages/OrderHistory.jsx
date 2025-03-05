import { useEffect, useState } from "react";
import { getOrders } from "../api/apiService";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      alert("Failed to fetch order history.");
    }
  };

  return (
    <div className="container mt-8">
      <h1 className="text-2xl font-bold mb-4">Purchase Order History</h1>

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-3 text-left">Order ID</th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Ordered Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="px-4 py-3">{order._id}</td>
              <td className="px-4 py-3">{order.product.name}</td>
              <td className="px-4 py-3">{order.status}</td>
              <td className="px-4 py-3">{new Date(order.orderDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
