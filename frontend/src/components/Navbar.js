"use client";
import Link from "next/link";
import { logout } from "../utils/auth";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex gap-4">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/earnings">Earnings</Link>
      <Link href="/referrals">Referrals</Link>
      <button onClick={logout} className="ml-auto text-red-400">
        Logout
      </button>
    </nav>
  );
}
