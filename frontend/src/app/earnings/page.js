"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { apiRequest } from "../../utils/api";
import { getToken } from "../../utils/auth";
import useRequireAuth from "../../utils/useRequireAuth";

export default function Earnings() {
    const [earnings, setEarnings] = useState({});
    useRequireAuth();

    useEffect(() => {
        apiRequest("/user/earnings", "GET", null, getToken())
            .then(setEarnings);
    }, []);



    return (
        <>
            <Navbar />
            <div className="p-10">
                <p>Direct: ₹{earnings.direct}</p>
                <p>Indirect: ₹{earnings.indirect}</p>
                <p>Total: ₹{earnings.total}</p>
            </div>
        </>
    );
}
