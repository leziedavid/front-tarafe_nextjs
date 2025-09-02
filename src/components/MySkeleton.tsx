"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface WebSkeletonsProps {
    count?: number; // nombre de skeleton cards
}

const WebSkeletons: React.FC<WebSkeletonsProps> = ({ count = 4 }) => {
    return (
        <div className="container mx-auto px-4 w-full py-20 lg:py-20">
            {/* Titre principal */}
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center uppercase">
                Chargement...
            </h2>

            {/* Section titre + description */}
            <div className="flex gap-4 flex-col items-start mb-2">
                <div className="flex gap-2 flex-col">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
            </div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: count }).map((_, i) => (
                    <Card
                        key={i}
                        className="overflow-hidden border-none shadow-none"
                    >
                        <CardContent className="p-0 flex flex-col h-full">
                            {/* Image */}
                            <Skeleton className="w-full h-48 sm:h-64 md:h-72 lg:h-96" />

                            {/* Titre + lien */}
                            <div className="flex flex-col justify-between flex-1 p-4">
                                <Skeleton className="h-4 w-40 mb-2" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default WebSkeletons;
