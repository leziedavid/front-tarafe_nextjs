"use client";

import React from 'react';
import { Copy } from 'lucide-react';
import Image from 'next/image';

const WaxPrintInterface = () => {
    return (
        <>

            <div className="w-full py-5 lg:py-5">
                <div className="md:container md:mx-auto">
                    <div className="w-full min-h-[500px] flex flex-col py-6">

                        {/* Top Section: Image + Content */}
                        <div className="flex flex-col md:flex-row w-full flex-1">
                            {/* Left - Image Section */}
                            <div className="md:w-1/2 w-full h-[350px] md:h-auto relative">
                                <Image src="/images75316N.jpeg" alt="Farmer" fill style={{ objectFit: "cover" }} className="object-cover" />
                            </div>

                            {/* Right - Text Section */}
                            <div className="md:w-1/2 w-full bg-[#242078] text-white p-8 flex flex-col justify-center items-start">
                                <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter ">Tarafé</h1>
                                <h2 className="text-3xl md:text-3xl font-bold text-[#ffb44b] mt-2">Plateforme digitale</h2>
                                <p className="text-sm md:text-base mt-4 max-w-md">
                                    Tarafé est une plateforme digitale de personnalisation des produits mode, accessoires et déco, avec une touche africaine, pour les entreprises et les particuliers. Notre mission est de valoriser les savoir-faire et le patrimoine textile local. Bienvenue !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
export default WaxPrintInterface;
