"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { auth } from "@/config/firebase";

import {
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

const AdminNavbar = () => {

    const router = useRouter();

    const [adminUser, setAdminUser] = useState(null);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {

                if (user) {

                    setAdminUser(user);

                } else {

                    setAdminUser(null);

                }
            }
        );

        return () => unsubscribe();

    }, []);

    const handleLogout = async () => {

        try {

            await signOut(auth);

            setAdminUser(null);

            router.replace("/admin/login");

        } catch (error) {

            console.error("Logout Error:", error);

        }
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shadow-md">

            <div>
                <Link
                    href="/admin/dashboard"
                    className="text-xl font-bold"
                >
                    Admin Panel
                </Link>
            </div>

            <div className="flex items-center gap-6">

                {adminUser && (
                    <>
                        <Link href="/admin/dashboard">
                            Dashboard
                        </Link>

                        <Link href="/admin/products">
                            Products
                        </Link>

                        <Link href="/admin/categories">
                            Categories
                        </Link>

                        <Link href="/admin/orders">
                            Orders
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>
    );
};

export default AdminNavbar;