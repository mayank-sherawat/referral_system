"use client";
import { useState } from "react";
import { apiRequest } from "../../utils/api";
import { useEffect } from "react";
import { getToken } from "../../utils/auth";
import Link from "next/link";
import { isValidEmail, isValidPassword } from "../../utils/validate";


export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        referralCode: ""
    });

    useEffect(() => {
        if (getToken()) {
            window.location.href = "/dashboard";
        }
    }, []);

    const handleSignup = async () => {
        if (!form.name.trim()) {
            alert("Name is required");
            return;
        }

        if (!isValidEmail(form.email)) {
            alert("Enter a valid email");
            return;
        }

        if (!isValidPassword(form.password)) {
            alert("Password must be at least 5 characters");
            return;
        }

        const payload = {
            name: form.name,
            email: form.email,
            password: form.password
        };

        if (form.referralCode.trim() !== "") {
            payload.referralCode = form.referralCode;
        }

        const data = await apiRequest("/auth/signup", "POST", payload);

        if (data.message) {
            alert("Signup successful. Please login.");
            window.location.href = "/login";
        } else {
            alert(data.message);
        }
    };



    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Signup</h1>

            <input
                placeholder="Name"
                className="border p-2 w-full mb-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
                placeholder="Email"
                className="border p-2 w-full mb-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-2"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <input
                placeholder="Referral Code (optional)"
                className="border p-2 w-full mb-2"
                value={form.referralCode}
                onChange={(e) =>
                    setForm({ ...form, referralCode: e.target.value })
                }
            />


            <button
                onClick={handleSignup}
                className="bg-black text-white p-2 w-full"
            >
                Signup
            </button>
            <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 underline">
                    Login
                </Link>
            </p>

        </div>
    );
}
