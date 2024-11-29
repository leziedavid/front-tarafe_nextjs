
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import de la balise Image de Next.js

// Typage des props du menu
type MenuProps = {};

// Composant Menu
const Menu: React.FC<MenuProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // Fonction pour gérer l'ouverture et la fermeture du menu mobile
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white w-full flex relative justify-between items-center mx-auto px-8 h-20">
            {/* Logo */}
            <div className="inline-flex">
                <Link href="/">
                    {/* Remplacer par le SVG de ton logo */}
                    <div className="hidden md:block">
                        <svg width="102" height="32" fill="currentcolor" style={{ display: "block" }}>
                            <path d="M29.24 22.68c..." />
                        </svg>
                    </div>
                
                </Link>
            </div>

            {/* Recherche (pour la version desktop) */}
            <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
                <div className="inline-block">
                    <div className="inline-flex items-center max-w-full">
                        <button className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1 py-1" type="button">
                            <div className="block flex-grow flex-shrink overflow-hidden">Start your search</div>
                            <div className="flex items-center justify-center relative h-8 w-8 rounded-full">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    style={{
                                        display: "block",
                                        fill: "none",
                                        height: "12px",
                                        width: "12px",
                                        stroke: "currentcolor",
                                        strokeWidth: "5.33333",
                                        overflow: "visible",
                                    }}
                                >
                                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu principal */}
            <div className="hidden md:flex space-x-8">
                <Link href="/" className="hover:text-gray-500">
                    Accueil
                </Link>
                <Link href="/produit" className="hover:text-gray-500">
                    Produit
                </Link>
                <Link href="/gallerie" className="hover:text-gray-500">
                    Galerie
                </Link>
                <Link href="/apropos" className="hover:text-gray-500">
                    À propos
                </Link>
            </div>

            {/* Menu mobile */}
            <div className="flex md:hidden items-center">
                <button onClick={toggleMenu}
                    className="inline-flex items-center px-2 py-2 text-gray-600 hover:bg-gray-200 rounded-full" >
                    <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                            display: "block",
                            height: "24px",
                            width: "24px",
                            fill: "none",
                            stroke: "currentcolor",
                            strokeWidth: "2",
                        }}
                    >
                        <path d="M4 7h24M4 16h24M4 25h24" />
                    </svg>
                </button>

                {/* Menu mobile avec animation (ouverte depuis la gauche) */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-start transition-all duration-300 ease-in-out"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="bg-white w-72 h-full flex flex-col shadow-lg transition-transform duration-300 ease-in-out transform"
                            style={{ transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)" }} >

                            {/* Logo et bouton sur la même ligne */}
                            <div className="flex justify-between items-center p-4">
                                {/* Logo à gauche */}
                                <Link href="/">
                                    <Image src="/logos2.png" alt="Logo" width={150} height={150} />
                                </Link>

                                {/* Bouton de fermeture */}
                                <button  onClick={toggleMenu}  >
                                    <svg
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        role="presentation"
                                        focusable="false"
                                        style={{
                                            display: "block",
                                            height: "24px",
                                            width: "24px",
                                            fill: "none",
                                            stroke: "currentcolor",
                                            strokeWidth: "2",
                                        }}
                                    >
                                        <path d="M4 7h24M4 16h24M4 25h24" />
                                    </svg>
                                </button>

                            </div>
                            <div className="flex flex-col items-center">
                                <Link href="/" className="px-4 py-2 hover:bg-gray-200 w-full text-center">
                                    Accueil
                                </Link>
                                <Link href="/produit" className="px-4 py-2 hover:bg-gray-200 w-full text-center">
                                    Produit
                                </Link>
                                <Link href="/gallerie" className="px-4 py-2 hover:bg-gray-200 w-full text-center">
                                    Galerie
                                </Link>
                                <Link href="/apropos" className="px-4 py-2 hover:bg-gray-200 w-full text-center">
                                    À propos
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Menu;
