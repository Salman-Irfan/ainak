"use client";

import { logout } from "@/services/auth/logout";

import { useRouter } from "next/navigation";

export default function LogoutButton() {

    const router = useRouter();

    const handleLogout =
        async () => {

            await logout();

            router.push(
                "/admin/login"
            );
        };

    return (
        <button
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}