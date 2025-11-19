"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, CheckSquare, UserCircle } from "lucide-react";
import Image from "next/image";
import { useProfile } from "@/modules/profile/hooks";
import { useAuthContext } from "@/context/Context";
import { useEffect } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const route = useRouter()

    const menuItems = [
        {
            label: "Todos",
            href: "/todo",
            icon: <CheckSquare size={18} />,
        },
        {
            label: "Account Information",
            href: "/profile",
            icon: <UserCircle size={18} />,
        },
    ];


    const { data } = useProfile();
    const { setUser } = useAuthContext();
    useEffect(() => {
        setUser(data);
    }, [data]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        route.push("/login");
        console.log("Logged out");
    }

    return (
        <aside className="h-screen lg:max-w-[280px] 2xl:max-w-[340px] sticky left-0 top-0 bottom-0 w-full bg-[#0D224A] text-white flex flex-col pt-[60px] pb-[30px] z-50">
            {/* User section */}
            <div className="flex flex-col items-center mb-6">
                <img
                    width={86}
                    height={86}
                    src={data?.profile_image || '/profile.png'}
                    alt="User"
                    className="w-[86px] h-[86px] bg-cover rounded-full border-2 border-white"
                />
                <h2 className="text-[16px] font-semibold mt-3">{data?.first_name + " " + data?.last_name}</h2>
                <p className="text-xs font-normal text-gray-300">{data?.email}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <div
                            className={`flex items-center gap-3 font-medium mb-1 px-10 text-[16px] py-3 cursor-pointer transition-all 
                                ${pathname === item.href
                                    ? "bg-gradient-to-r from-[#1d3473] to-[#0e224a] text-white"
                                    : "text-[#8CA3CD] hover:bg-gradient-to-r from-[#1d3473] to-[#0e224a]"
                                }
                            `}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <div className="mt-6">
                <button onClick={handleLogout} className="flex group items-center px-10 gap-3 w-full cursor-pointer py-3 transition-all hover:bg-gradient-to-r from-[#1d3473] to-[#0e224a]">
                    <LogOut className="group-hover:scale-110" size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}