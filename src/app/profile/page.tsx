"use client"
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession()
    const user = session?.user
    console.log(user?.name)
    const getInitials = (name: string): string => {
        if (!name) return "";

        return name
            .trim()
            .split(/\s+/)
            .map((part) => part[0]?.toUpperCase() || "")
            .slice(0, 2)
            .join("");
    }

    const handleSignout = async () => {
        await authClient.signOut();
        router.replace("/");
    }
    const handleUpdateProfile = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newUserData = Object.fromEntries(formData.entries()) as { name: string }
        await authClient.updateUser({
            ...newUserData
        })
    }
    return (
        <div>
            <div className="w-full max-w-2xl mx-auto py-8 sm:py-12 px-4 space-y-6 mb-16 sm:mb-24">
                <div className="space-y-1 text-center sm:text-left">
                    <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                        আমার প্রোফাইল
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
                        <div className="overflow-hidden flex items-center justify-center shrink-0">
                            <Avatar className="rounded-lg w-14 h-14 sm:w-12 sm:h-12">
                                <Avatar.Image alt={user?.name as string} src={user?.image as string} />
                                <Avatar.Fallback className="rounded-lg text-sm sm:text-base">{getInitials(user?.name as string)}</Avatar.Fallback>
                            </Avatar>
                        </div>

                        <div className="space-y-0.5">
                            <h2 className="text-base sm:text-lg font-bold text-gray-900">
                                {user?.name}
                            </h2>
                            <p className="text-xs text-gray-500 break-all">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignout}
                        type="button"
                        className="flex items-center justify-center gap-1.5 border border-red-200 text-red-500 hover:bg-red-50 font-medium text-xs px-4 py-2.5 sm:py-2 rounded-xl transition-colors w-full sm:w-auto mt-2 sm:mt-0"
                    >
                        <span>↩ সাইন আউট</span>
                    </button>
                </div>

                <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100/80 space-y-5">
                    <h3 className="text-base font-bold text-gray-900 text-center sm:text-left">
                        তথ্য
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <label className="text-xs font-semibold text-gray-700 block text-left">
                                    নাম
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={user?.name}
                                    className="w-full bg-[#fcfdfe] border border-gray-200/80 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-emerald-600"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[#058240] hover:bg-[#046e36] text-white font-medium py-2.5 px-4 rounded-xl text-sm cursor-pointer transition-colors"
                                >
                                    আপডেট
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;