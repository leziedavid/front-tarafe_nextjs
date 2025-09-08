"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ Import du Skeleton
import FormImageDialog from "./Modals/FormImageDialog";
import { Eye } from "lucide-react";

const allPochons = [
    { id: 1, imageUrl: "/Tarafe-47230G.webp", layout: "small" },
    { id: 2, imageUrl: "/Tarafe-51069Z.webp", layout: "small" },
    { id: 3, imageUrl: "/Tarafe-94028T.webp", layout: "medium" },
    { id: 4, imageUrl: "/images75316N.jpeg", layout: "large" },
    { id: 5, imageUrl: "/Tarafe-08961O.webp", layout: "small" },
    { id: 6, imageUrl: "/Tarafe-45821F.webp", layout: "small" },
    { id: 7, imageUrl: "/Tarafe-51069Z.webp", layout: "medium" },
    { id: 8, imageUrl: "/Tarafe-45901J.webp", layout: "large" },
];

export default function PochonCarousel() {
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true); // ✅ état de chargement
    const [imageLink, setImageLink] = React.useState<string>("");
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [id, setId] = React.useState<number>(0);

    const limit = 4;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = allPochons.slice(start, end);

    const maxPage = Math.ceil(allPochons.length / limit);

    // ✅ Simulation de chargement
    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000); // 1s
        return () => clearTimeout(timer);
    }, [page]);

    const handleImageClick = (url: string, id: number) => {
        setId(id);
        setImageLink(url);
        setDialogOpen(true);
    };

    const handleCloseDialog = (open: boolean) => {
        setDialogOpen(open);
        setImageLink("");
    };

    return (
        <div className="container mx-auto px-4 w-full py-5 lg:py-5">
            <h2 className="text-2xl font-bold text-center mb-1 uppercase">
                Catégorie et <span className="text-orange-500">models de produits</span>
            </h2>

            <p className="text-sm text-gray-600 text-center mb-3">
                Personnalisez votre image avec texte, logos, etc.
            </p>

            {/* ✅ Skeleton si loading */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 h-[600px]">
                    {/* Colonne gauche */}
                    <div className="col-span-12 md:col-span-6 flex flex-col gap-4 h-full">
                        <div className="flex gap-4 flex-1">
                            <Skeleton className="flex-1 h-full" />
                            <Skeleton className="flex-1 h-full" />
                        </div>
                        <Skeleton className="flex-1 h-full mt-4" />
                    </div>
                    {/* Colonne droite */}
                    <div className="col-span-12 md:col-span-6 h-full">
                        <Skeleton className="w-full h-full" />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 h-[600px] md:h-[600px]">
                    {/* Colonne gauche */}
                    <div className="col-span-12 md:col-span-6 flex flex-col gap-4 h-full">
                        {/* Ligne du haut */}
                        <div className="flex gap-4 flex-1">
                            {data
                                .filter((item) => item.layout === "small")
                                .map((item) => (
                                    <Card
                                        key={item.id}
                                        onClick={() => handleImageClick(item.imageUrl, item.id)}
                                        className="relative flex-1 rounded-none overflow-hidden cursor-pointer group"
                                        style={{
                                            backgroundImage: `url(${item.imageUrl})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition duration-300 p-3 bg-white rounded-full">
                                                <Eye className="w-6 h-6 text-gray-800" />
                                            </div>
                                        </div>
                                        <CardContent className="h-full w-full" />
                                    </Card>
                                ))}
                        </div>

                        {/* Ligne du bas */}
                        {data
                            .filter((item) => item.layout === "medium")
                            .map((item) => (
                                <Card
                                    key={item.id}
                                    onClick={() => handleImageClick(item.imageUrl, item.id)}
                                    className="relative flex-1 rounded-none overflow-hidden mt-4 cursor-pointer group"
                                    style={{
                                        backgroundImage: `url(${item.imageUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition duration-300 p-3 bg-white rounded-full">
                                            <Eye className="w-6 h-6 text-gray-800" />
                                        </div>
                                    </div>
                                    <CardContent className="h-full w-full" />
                                </Card>
                            ))}
                    </div>

                    {/* Colonne droite */}
                    <div className="col-span-12 md:col-span-6 h-full">
                        {data
                            .filter((item) => item.layout === "large")
                            .map((item) => (
                                <Card
                                    key={item.id}
                                    onClick={() => handleImageClick(item.imageUrl, item.id)}
                                    className="relative h-full rounded-none overflow-hidden cursor-pointer group"
                                    style={{
                                        backgroundImage: `url(${item.imageUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition duration-300 p-3 bg-white rounded-full">
                                            <Eye className="w-6 h-6 text-gray-800" />
                                        </div>
                                    </div>
                                    <CardContent className="h-full w-full" />
                                </Card>
                            ))}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className="flex justify-center gap-4">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="shadow hover:shadow-lg active:ring-2 active:ring-orange-500 rounded-full"
                >
                    ⬅
                </Button>
                <span className="self-center font-medium">
                    Page {page} / {maxPage}
                </span>
                <Button
                    variant="outline"
                    disabled={page === maxPage}
                    onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                    className="shadow hover:shadow-lg active:ring-2 active:ring-orange-500 rounded-full"
                >
                    ➡
                </Button>
            </div>

            {/* Dialog */}
            <FormImageDialog
                imageUrl={imageLink}
                open={dialogOpen}
                onOpenChange={handleCloseDialog}
                id={id}
            />
        </div>
    );
}
