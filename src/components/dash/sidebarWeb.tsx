"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Home, Package, ShoppingCart, Users, LineChart, Package2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SidebarWeb: React.FC = () => {

    const navigationItems = [
        {
            title: "Dashboard",
            href: "/dashboard/dash",
            icon: <Home className="h-5 w-5" />
        },
        {
            title: "Orders",
            href: "/dashboard/orders",
            icon: <ShoppingCart className="h-5 w-5" />,
            badge: 6
        },
        {
            title: "Products",
            href: "/dashboard/products",
            icon: <Package className="h-5 w-5" />
        },
        {
            title: "Reglages",
            href: "/dashboard/reglages",
            icon: <Users className="h-5 w-5" />
        },
        {
            title: "Analytics",
            href: "#",
            icon: <LineChart className="h-5 w-5" />
        },
    ];


    const [isOpen, setOpen] = useState(false);

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span>Tarafé</span>
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navigationItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${item.title === "Products" ? "bg-muted text-primary" : "text-muted-foreground hover:text-primary"
                                    } transition-all`}
                            >
                                {item.icon}
                                {item.title}
                                {item.badge && (
                                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        {item.badge}
                                    </Badge>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SidebarWeb;
