"use client";
import { useEffect } from "react";
import { getToken } from "../utils/auth";

export default function Home() {
  useEffect(() => {
    const token = getToken();

    if (token) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login";
    }
  }, []);

  return <p className="p-10">Redirecting...</p>;
}
