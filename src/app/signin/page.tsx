"use client"
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const errorMsg = searchParams.get("error");
        if (errorMsg) {
            toast.error(errorMsg);
        }
    }, [searchParams]);

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string, name:string };

        const { data, error } = await authClient.signIn.email({
            ...user,
        });

        if (error) {
            toast.error(error.message || "An error occurred");
        }
        if (data) {
            toast.success(`স্বাগতম ${user.name}!`);
            router.push("/");
        }
    };

    const handleGoogleSignin = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        });
        if (error) {
            toast.error(error.message || "Google sign-in failed");
        }
    };

    const handleGitHubSignin = async () => {
        const { error } = await authClient.signIn.social({
            provider: "github",
            callbackURL: "/"
        });
        if (error) {
            toast.error(error.message || "GitHub sign-in failed");
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit} className="w-full max-w-md mx-auto py-12 flex flex-col items-center">
                <div className="text-center mb-8 space-y-1.5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        সাইন ইন
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100/80 space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 block">ইমেইল</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className="w-full bg-[#fcfdfe] border border-gray-200/80 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-600"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 block">পাসওয়ার্ড</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full bg-[#fcfdfe] border border-gray-200/80 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#058240] hover:bg-[#046e36] text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-colors mt-2"
                    >
                        সাইন ইন
                    </button>

                    <div className="relative my-4 flex items-center justify-center">
                        <div className="border-t border-gray-100 w-full" />
                        <span className="bg-white px-3 text-[11px] text-gray-400 absolute">অথবা</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={handleGoogleSignin}
                            type="button"
                            className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <FcGoogle className="text-base" />
                            <span>Google দিয়ে চালিয়ে যান</span>
                        </button>

                        <button
                            onClick={handleGitHubSignin}
                            type="button"
                            className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <FaGithub className="text-base text-gray-900" />
                            <span>GitHub দিয়ে চালিয়ে যান</span>
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 pt-2">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link href="/signup" className="text-[#058240] font-semibold hover:underline">
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                <Link
                    href="/"
                    className="mt-8 text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </form>
        </div>
    );
};

export default Page;