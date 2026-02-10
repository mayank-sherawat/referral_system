"use client";
import { useState } from "react";
import { apiRequest } from "../../utils/api";
import { saveToken } from "../../utils/auth";
import { useEffect } from "react";
import { getToken } from "../../utils/auth";
import Link from "next/link";
import { isValidEmail, isValidPassword } from "../../utils/validate";



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (getToken()) {
            window.location.href = "/dashboard";
        }
    }, []);

    const handleLogin = async () => {
        if (!isValidEmail(email)) {
            alert("Please enter a valid email");
            return;
        }

        if (!isValidPassword(password)) {
            alert("Password must be at least 5 characters");
            return;
        }

        const data = await apiRequest("/auth/login", "POST", {
            email,
            password
        });

        if (data.token) {
            saveToken(data.token);
            window.location.href = "/dashboard";
        } else {
            alert(data.message);
        }
    };


    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Login</h1>

            <input
                placeholder="Email"
                className="border p-2 w-full mb-2"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                className="border p-2 w-full mb-2"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleLogin}
                className="bg-black text-white p-2 w-full"
            >
                Login
            </button>
            <p className="mt-4 text-center">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-blue-600 underline">
                    Sign up
                </Link>
            </p>

        </div>
    );
}
