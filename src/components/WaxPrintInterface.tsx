"use client";

import React from 'react';
import { Copy } from 'lucide-react';

const WaxPrintInterface = () => {
    return (

        <div className="container mx-auto py-4 md:py-2">
            <div className="w-full max-w-5xl">
                {/* Desktop: Grid 2 cols | Mobile: Flex column */}
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-0 overflow-hidden rounded-lg md:shadow-sm">

                    {/* Image Section (BG) */}
                    <div
                        className="bg-cover bg-center order-1 md:order-1 flex items-center justify-center h-72 md:h-auto"
                        style={{ backgroundImage: "url('/images75316N.jpeg')" }}
                    >
                        {/* Overlay */}
                        <div className="bg-black/40 w-full h-full flex items-center justify-center">
                            {/* tu peux rajouter du texte ou un bouton ici si besoin */}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white p-6 md:p-12 flex flex-col justify-center order-2 md:order-2 md:text-left">
                        <div className="space-y-4 md:space-y-6">
                            <p className="text-xs md:text-sm font-medium text-gray-600 tracking-wider uppercase">
                                LES IMPRIMÉS MINIMALISTES
                            </p>

                            <h1 className="text-3xl md:text-5xl font-bold text-[#242078] leading-tight"> TARAFE </h1>

                            <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
                                Tarafé est une plateforme digitale de personnalisation des produits mode, accessoires et déco, avec une touche africaine, pour les entreprises et les particuliers. Notre mission est de valoriser les savoir-faire et le patrimoine textile local. Bienvenue !
                            </p>

                            <button className="bg-[#242078] hover:bg-[#242078]/50 text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-medium transition-colors w-full md:w-auto max-w-xs mx-auto md:mx-0">
                                Découvrir
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Section */}
                <div className="md:hidden mt-8 px-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-emerald-800 leading-tight">
                            NOS DESIGNS<br />
                            MINIMALISTES
                        </h2>

                        <button className="border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-50 w-12 h-12 rounded-md flex items-center justify-center transition-colors">
                            <Copy className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex items-center justify-center">
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                            🔒 www.tarafe.com/gallerie
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default WaxPrintInterface;
