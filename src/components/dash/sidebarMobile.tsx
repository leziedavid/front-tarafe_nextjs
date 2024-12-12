"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Home, Package, ShoppingCart, Users, LineChart, Package2, Menu, CircleUser } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"; 
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"; 
import AdminSearch from './adminSearch';
import ModeToggle from './modeToggle';

const SidebarMobile: React.FC = () => {

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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>

                        {navigationItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                                    item.badge
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
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
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <AdminSearch />
            </div>
            <ModeToggle />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default SidebarMobile;
