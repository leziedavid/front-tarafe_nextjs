"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';  // Import de Image de Next.js
import { LucideBell, LucideLoader, LucideMail, LucideUser2, LucideLogIn, LucideMenu, LucideTrash2, LucideHome, LucidePackage, LucideImage, LucideInfo } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";

// Composant Header principal
const Header: React.FC = ({ }) => {

    const navigationItems = [
        {
            title: "ACCUEIL",
            href: "/",
            description: "",
            icon: <LucideHome className="w-4 h-4 mr-2" /> // Icône pour ACCUEIL
        },
        {
            title: "PRODUITS",
            href: "/realisations",
            description: "",
            icon: <LucidePackage className="w-4 h-4 mr-2" /> // Icône pour PRODUITS
        },
        {
            title: "REALISATIONS",
            href: "/gallerie",
            description: "",
            icon: <LucideImage className="w-4 h-4 mr-2" /> // Icône pour REALISATIONS
        },
        {
            title: "A PROPOS",
            href: "/apropos",
            description: "",
            icon: <LucideInfo className="w-4 h-4 mr-2" /> // Icône pour A PROPOS
        },
    ];

    const [isOpen, setOpen] = useState(false);

    return (
        <header className="flex flex-col items-center fixed top-0 z-50 w-full shadow-sm">

            <div className="py-4 md:py-2 items-center w-full bg-white">

                <div className="max-w-7xl mx-4 px-4 lg:mx-auto flex justify-between items-center gap-x-10">

                    <div className="flex justify-start items-center gap-4 ">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo/Logo-Tarafé-slogan-principal.png" alt="Logo" className="h-10"
                        width={100}  // Largeur d'origine de l'image
                        height={90} // Hauteur d'origine de l'image
                        />
                    </Link>
                </div>


                    {/* Navigation pour les écrans plus grands */}
                    <nav className="hidden md:flex gap-3">
                        <NavigationMenu className="flex justify-start items-start">
                            <NavigationMenuList className="flex justify-start gap-4 flex-row">
                                {navigationItems.map((item) => (

                                    <NavigationMenuItem key={item.title}>
                                        {item.href ? (
                                            <>
                                                <NavigationMenuLink href={item.href}>
                                                    <Button variant="ghost" className="font-extrabold font-title tracking-tight text-sm flex items-center hover:bg-[#ffb44b]">
                                                        {/* {item.icon} */}
                                                        {item.title}
                                                    </Button>
                                                </NavigationMenuLink>
                                            </>
                                        ) : (
                                            <>
                                                <NavigationMenuTrigger className="font-medium text-sm font-extrabold font-title tracking-tight text-lg">
                                                    {/* {item.icon} */}
                                                    {item.title}
                                                </NavigationMenuTrigger>
                                            </>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    <div className="flex items-center gap-x-2">
                        {/* Icône du panier */}
                        <div className="flex items-center gap-x-2">
                            <div>
                                <Link href="/login" className="font-title flex">
                                    <LucideUser2 className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-12 shrink lg:hidden items-end justify-end">

                        <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>

                        {isOpen && (
                            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
                                {navigationItems.map((item) => (
                                    <div key={item.title}>
                                        <div className="flex flex-col gap-2">
                                            {item.href ? (
                                                <Link href={item.href} className="flex justify-between items-center" >
                                                    <span onClick={() => setOpen(!isOpen)} className="text-sm font-extrabold font-title tracking-tighter flex items-center">
                                                        {/* {item.icon} */}
                                                        {item.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                                </Link>
                                            ) : (
                                                <p onClick={() => setOpen(!isOpen)} className="text-sm font-extrabold font-title tracking-tighter flex items-center">
                                                    {/* {item.icon} */}
                                                    {item.title}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </header>
    );
};

export default Header;
