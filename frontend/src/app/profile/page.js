"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { apiRequest } from "../../utils/api";
import { getToken } from "../../utils/auth";
import useRequireAuth from "../../utils/useRequireAuth";

export default function Profile() {
  useRequireAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    apiRequest("/user/profile", "GET", null, getToken())
      .then(setProfile);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10 max-w-md ">
        <h1 className="text-xl mb-4">Profile</h1>

        <p><b>User ID:</b> {profile.userId}</p>
        <p><b>Name:</b> {profile.name}</p>
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Referral Code:</b> {profile.referralCode}</p>
        <p><b>Total Earnings:</b> ₹{profile.totalEarnings}</p>
      </div>
    </>
  );
}
