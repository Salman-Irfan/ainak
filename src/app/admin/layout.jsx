// /src/app/admin/layout.jsx

"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminNavbar from "../../components/admin/AdminNavbar";

export default function AdminLayout({children}) {

    useAdminAuth();

    return (
        <>
            {/* Admin Layout Navbar */}
            <AdminNavbar />
            {children}
        </>
    );
}