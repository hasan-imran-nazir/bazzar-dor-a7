"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Avatar } from "@heroui/react";
const UserInfo = () => {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const getInitials = (name: string): string => {
        if (!name) return "";

        return name
            .trim()
            .split(/\s+/)
            .map((part) => part[0]?.toUpperCase() || "")
            .slice(0, 2)
            .join("");
    }
    return (
        <div>
            {
                user ? <div className="flex items-center gap-2">
                    <Avatar className="rounded-lg">
                        <Avatar.Image alt={user?.name} src={user?.image as string} />
                        <Avatar.Fallback className="rounded-lg">{getInitials(user?.name)}</Avatar.Fallback>
                    </Avatar>
                    <div><h2>{user?.name}</h2></div>
                </div> : <div className="flex items-center gap-4">
                    <Link href="/signin" className="cursor-pointer">
                        <button className="text-gray-800 text-sm font-semibold hover:text-green-700 transition-colors px-3 py-2">
                            সাইন ইন
                        </button>
                    </Link>
                    <Link href="/signup" className="cursor-pointer">
                        <button className="bg-[#008a45] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#00753a] transition-colors shadow-sm">
                            সাইন আপ
                        </button>
                    </Link>
                </div>
            }
        </div>

    );
};

export default UserInfo;