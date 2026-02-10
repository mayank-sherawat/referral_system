"use client";
import { useEffect } from "react";
import { getToken } from "./auth";

export default function useRequireAuth() {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
}
