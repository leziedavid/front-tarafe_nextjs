"use client";

import React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const WaxPrintInterface = () => {
    const [loading, setLoading] = React.useState(true);

    // ✅ Simulation de chargement
    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200); // 1.2s
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full py-2 lg:py-2">
            <div className="md:container md:mx-auto">
                <div className="w-full min-h-[500px] flex flex-col py-6">
                    <div className="flex flex-col md:flex-row w-full flex-1">
                        {/* Left - Image Section */}
                        <div className="md:w-1/2 w-full h-[350px] md:h-auto relative">
                            {loading ? (
                                <Skeleton className="w-full h-full" />
                            ) : (
                                <Image
                                    src="/images75316N.jpeg"
                                    alt="Farmer"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="object-cover"
                                />
                            )}
                        </div>

                        {/* Right - Text Section */}
                        <div className="md:w-1/2 w-full bg-[#242078] text-white p-8 flex flex-col justify-center items-start">
                            {loading ? (
                                <div className="flex flex-col gap-4 w-full max-w-md">
                                    <Skeleton className="h-10 w-2/3" />
                                    <Skeleton className="h-8 w-1/2" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-4/6" />
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                                        Tarafé
                                    </h1>
                                    <h2 className="text-3xl md:text-3xl font-bold text-[#ffb44b] mt-2">
                                        Plateforme digitale
                                    </h2>
                                    <p className="text-sm md:text-base mt-4 max-w-md">
                                        Tarafé est une plateforme digitale de personnalisation des
                                        produits mode, accessoires et déco, avec une touche
                                        africaine, pour les entreprises et les particuliers. Notre
                                        mission est de valoriser les savoir-faire et le patrimoine
                                        textile local. Bienvenue !
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WaxPrintInterface;
