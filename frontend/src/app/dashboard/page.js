"use client";
import Navbar from "../../components/Navbar";
import { apiRequest } from "../../utils/api";
import { getToken } from "../../utils/auth";
import useRequireAuth from "../../utils/useRequireAuth";

export default function Dashboard() {
  const buy = async (amount) => {
    const token = getToken();
    const data = await apiRequest("/purchase", "POST", { amount }, token);
    alert(data.message);
  };

  useRequireAuth();

  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-xl mb-4">Accessories</h1>

        {[500, 1000, 2000].map((price) => (
          <div key={price} className="border p-4 mb-2">
            <p>Accessory worth ₹{price}</p>
            <button
              className="bg-green-600 text-white p-2"
              onClick={() => buy(price)}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
