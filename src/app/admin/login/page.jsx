"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { adminLogin } from "@/services/auth/adminLogin";
import { useAdminGuest } from "@/hooks/useAdminGuest";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLoginPage() {

    useAdminGuest();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setLoading(true);
            await adminLogin(
                email,
                password
            );

            router.push(
                "/admin/dashboard"
            );

        } catch {

            alert("Invalid Credentials");
        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-slate-800">
                        Admin Login
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Sign in to access the dashboard
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="admin@example.com"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition"
                            >
                                {
                                    showPassword
                                        ? <FaEyeSlash size={18} />
                                        : <FaEye size={18} />
                                }
                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-medium py-3 rounded-lg transition cursor-pointer"
                    >
                        {
                            loading
                                ? "Signing In..."
                                : "Login"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
}