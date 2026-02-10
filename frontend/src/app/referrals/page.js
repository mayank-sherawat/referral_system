"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { apiRequest } from "../../utils/api";
import { getToken } from "../../utils/auth";
import useRequireAuth from "../../utils/useRequireAuth";

export default function Referrals() {
  const [data, setData] = useState({});

  useRequireAuth();

  useEffect(() => {
    apiRequest("/user/referrals", "GET", null, getToken())
      .then(setData);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10">
        <p>Used Slots: {data.used}</p>
        <p>Available Slots: {data.available}</p>
      </div>
    </>
  );
}
