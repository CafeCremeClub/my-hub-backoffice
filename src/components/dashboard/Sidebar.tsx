"use client";

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {lightBlueLogo} from "../../../public";
import {Button} from "@/components/ui/button";
import HouseIcon from "@/components/icons/HouseIcon";
import {ListTodo, LogOut} from "lucide-react";
import {TbUsers} from "react-icons/tb";
import {usePathname, useRouter} from "next/navigation";
import useGetMe from "@/hooks/auth/useGetMe";
import {Skeleton} from "@/components/ui/skeleton";
import LogoutAlertDialog from "@/components/dashboard/LogoutAlertDialog";

const routes = [
    {
        id: 1,
        name: "Accueil",
        icon: HouseIcon,
        route: "/dashboard",
    },
    {
        id: 2,
        name: "Membres",
        icon: TbUsers,
        route: "/dashboard/members",
    },
    {
        id: 3,
        name: "Utilisateurs autorisés",
        icon: ListTodo,
        route: "/dashboard/whitelist",
    }
]

interface SidebarProps {
    isSheet?: boolean;
    closeSheet?: () => void;
}


const Sidebar = ({
                     isSheet = false,
                     closeSheet = () => {
                     }
                 }: SidebarProps) => {

    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState<boolean>(false);

    const {
        isPending,
        data
    } = useGetMe()
    const router = useRouter();
    const pathname = usePathname();

    const [selectedRoute, setSelectedRoute] = useState<string>(routes[0].route);

    const onRoutePress = (name: string) => {
        setSelectedRoute(name)
        router.push(name);

        if (isSheet) {
            closeSheet();
        }
    }

    useEffect(() => {
        // Handle root route specially
        if (pathname === "/" || pathname === "/dashboard") {
            setSelectedRoute(routes[0].route);
            return;
        }

        // Find the route that best matches the current pathname
        // Sort routes by route length (descending) to prioritize longer, more specific routes
        const sortedRoutes = [...routes].sort((a, b) => b.route.length - a.route.length);

        const matchingRoute = sortedRoutes.find(route => {
            if (route.route === "/") {
                return pathname === "/" || pathname === "/dashboard";
            }
            return pathname.startsWith(route.route);
        });

        if (matchingRoute) {
            setSelectedRoute(matchingRoute.route);
        } else {
            setSelectedRoute(routes[0].route);
        }
    }, [pathname])

    return (
        <>

            <LogoutAlertDialog
                open={isLogoutConfirmOpen}
                onClose={() => setIsLogoutConfirmOpen(false)}
            />

            <aside className="h-full flex flex-col w-[17.625rem] bg-[#142057] px-4 pt-9 pb-6 flex-none">
                <div className="flex flex-col gap-4 h-full">
                    <Image
                        src={lightBlueLogo}
                        alt="logo"
                        className="object-center object-cover w-64 cursor-pointer"
                        onClick={() => onRoutePress("/dashboard")}
                    />
                    <div className="flex flex-col gap-2 h-full">
                        {
                            routes.map((route) => (
                                <Button
                                    key={route.id}
                                    className={`flex justify-start items-center gap-3 w-full rounded-[0.375rem] text-[#BCD8FF] font-semibold tracking-tighter bricolage-grotesque cursor-pointer hover:bg-[#697194]/90 ${
                                        selectedRoute === route.route
                                            ? "bg-[#697194]"
                                            : "bg-transparent"
                                    }`}
                                    onClick={() => onRoutePress(route.route)}
                                    aria-label={route.name}
                                >
                                    {<route.icon width={16} height={16} stroke="#BCD8FF" className="shrink-0"/>}
                                    {route.name}
                                </Button>
                            ))
                        }

                        <div className="flex items-center justify-between mt-auto">
                            {
                                isPending ? (
                                    <div className="flex flex-col gap-1">
                                        <Skeleton className="h-4 w-24 rounded-md"/> {/* name placeholder */}
                                        <Skeleton className="h-4 w-36 rounded-md"/> {/* email placeholder */}
                                    </div>
                                ) : data ?
                                    <div className="flex flex-col">
                                        <p className="text-[#EEF5FF] font-semibold text-sm">
                                            {data.firstname} {data.lastname}
                                        </p>
                                        <p className="text-[#2970FF] text-sm">
                                            {data.email}
                                        </p>
                                    </div> : null
                            }

                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-[#BCD8FF]  hover:text-[#BCD8FF]  hover:bg-[#697194] cursor-pointer"
                                onClick={() => setIsLogoutConfirmOpen(true)}
                            >
                                <LogOut className="size-5"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;