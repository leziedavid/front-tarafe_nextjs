"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const allPochons = [
    { id: 1, imageUrl: "/Tarafe-08961O.webp", layout: "small" },
    { id: 2, imageUrl: "/Tarafe-45821F.webp", layout: "small" },
    { id: 3, imageUrl: "/Tarafe-45901J.webp", layout: "large" },
    { id: 4, imageUrl: "/Tarafe-51069Z.webp", layout: "medium" },
];

export default function PochonCarousel() {
    const [page, setPage] = React.useState(1);
    const limit = 4;

    const start = (page - 1) * limit;
    const end = start + limit;
    const data = allPochons.slice(start, end);

    const maxPage = Math.ceil(allPochons.length / limit);

    const getLayoutClass = (layout: string) => {
        switch (layout) {
            case "large":
                return "md:col-span-2 md:row-span-2 h-96"; // grande image
            case "medium":
                return "md:col-span-2 h-48"; // image droite
            case "small":
                return "md:col-span-1 h-48"; // petite image
            default:
                return "md:col-span-1 h-48";
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-6">
            <h2 className="text-2xl font-bold text-center mb-6">
                Catégorie <span className="text-orange-500">Pochons</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 auto-rows-min">
                {data.map((pochon) => (
                    <Card
                        key={pochon.id}
                        className={`${getLayoutClass(pochon.layout)} rounded-none overflow-hidden`}
                        style={{
                            backgroundImage: `url(${pochon.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Contenu vide, image en background */}
                        <CardContent className="h-full w-full" />
                    </Card>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="shadow hover:shadow-lg active:ring-2 active:ring-orange-500"
                >
                    ⬅ Précédent
                </Button>
                <span className="self-center font-medium">
                    Page {page} / {maxPage}
                </span>
                <Button
                    variant="outline"
                    disabled={page === maxPage}
                    onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                    className="shadow hover:shadow-lg active:ring-2 active:ring-orange-500"
                >
                    Suivant ➡
                </Button>
            </div>
        </div>
    );
}
