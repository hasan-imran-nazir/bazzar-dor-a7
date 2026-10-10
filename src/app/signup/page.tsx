"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Page = () => {
    const router = useRouter();

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড দুটি মিলছে না!");
            return;
        }

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;

        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: "/"
        });

        if (data) {
            toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
            router.push("/");
            router.refresh();
        }

        if (error) {
            toast.error(error.message || "সাইন আপ করতে সমস্যা হয়েছে");
        }
    };

    const handleGoogleSignin = async () => {
        try {
            const res = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (res && "error" in res && res.error) {
                toast.error(res.error.message || "Google sign-in failed");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    };

    const handleGitHubSignin = async () => {
        try {
            const res = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });
            if (res && "error" in res && res.error) {
                toast.error(res.error.message || "GitHub sign-in failed");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit} className="w-full max-w-md mx-auto py-12 flex flex-col items-center">
                <div className="text-center mb-8 space-y-1.5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100/80 space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 block">নাম</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="w-full bg-[#fcfdfe] border border-gray-200/80 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-600"
                        />
                    </div>

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
                            minLength={8}
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full bg-[#fcfdfe] border border-gray-200/80 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-600"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 block">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            placeholder="আবার লিখুন"
                            className="w-full bg-[#fcfdfe] border border-gray-200/80 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#058240] hover:bg-[#046e36] text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-colors mt-2"
                    >
                        অ্যাকাউন্ট তৈরি করুন
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
                        অ্যাকাউন্ট আছে?{" "}
                        <Link href="/signin" className="text-[#058240] font-semibold hover:underline">
                            সাইন ইন করুন
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