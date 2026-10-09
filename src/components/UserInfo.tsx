"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Avatar } from "@heroui/react";
import { Button, Dropdown, Kbd, Label } from "@heroui/react";
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
        await authClient.signOut();
    }
    return (
        <div>
            {
                user ? <div className="flex items-center gap-2">
                    <Avatar >
                        <Avatar.Image alt={getInitials(user?.name)} src={user?.image as string | undefined} />
                        <Avatar.Fallback className="rounded-lg">{getInitials(user?.image as string)}</Avatar.Fallback>
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
                                    <Label>👤 আমার প্রোফাইল</Label>
                                    <Kbd className="ms-auto" slot="keyboard" variant="light">

                                    </Kbd>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleSignout} id="signout" textValue="Delete file" variant="danger">
                                    <Label >↩ সাইন আউট</Label>
                                    <Kbd className="ms-auto" slot="keyboard" variant="light">


                                    </Kbd>
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