"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Avatar } from "@heroui/react";
import { Button, Dropdown, Label } from "@heroui/react";
import toast from "react-hot-toast";
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
    const handleSignout = async () => {
        try {
            await authClient.signOut();
            toast.success("সাইন-আউট করেছেন!");

            setTimeout(() => {
                window.location.reload();
            }, 800);
        } catch (err) {
            toast.error(`${err}`||"সাইন-আউট করতে সমস্যা হয়েছে");
        }
    }
    return (
        <div>
            {
                user ? <div className="flex items-center gap-2">
                    <Avatar className="rounded-lg">
                        <Avatar.Image alt={user?.name as string} src={user?.image as string} />
                        <Avatar.Fallback className="rounded-lg">{getInitials(user?.name as string)}</Avatar.Fallback>
                    </Avatar>
                    <Dropdown>
                        <Button aria-label="Menu" variant="ghost">
                            {user?.name}
                        </Button>
                        <Dropdown.Popover >
                            <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                                <Dropdown.Item className="font-semibold text-xl">
                                    {user?.name}
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    {user?.email}
                                </Dropdown.Item>
                                <Dropdown.Item id="Profile" textValue="Save file">
                                    <Link href="/profile"><Label>👤 আমার প্রোফাইল</Label></Link>

                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleSignout} id="signout" textValue="Delete file" variant="danger">
                                    <Label >↩ সাইন আউট</Label>

                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
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