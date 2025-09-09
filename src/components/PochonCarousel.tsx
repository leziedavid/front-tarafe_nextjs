"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormImageDialog from "./Modals/FormImageDialog";
import { Eye } from "lucide-react"; // Import de l'icône
import { Skeleton } from "./ui/skeleton";

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
    const [imageLink, setImageLink] = React.useState<string>(''); // Etat pour l'URL de l'image
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false); // Etat pour contrôler l'ouverture du Dialog
    const [id, setId] = React.useState<number>(0); // Etat pour l'ID de l'image
    const [loading, setLoading] = React.useState(true); // ✅ état de chargement

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

    // Fonction pour ouvrir le Dialog avec l'image sélectionnée
    const handleImageClick = (url: string, id: number) => {
        setId(id);  // Met l'ID de l'image dans l'état
        setImageLink(url);  // Met l'URL de l'image dans l'état
        setDialogOpen(true); // Ouvre le Dialog
    };

    // Fonction pour fermer le Dialog
    const handleCloseDialog = (open: boolean) => {
        setDialogOpen(open);  // Ferme le Dialog
        setImageLink('');  // Réinitialise l'URL de l'image
    };

    return (

        <div className="container mx-auto px-4 w-full py-5 lg:py-5">

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center uppercase">
                models de produits
            </h2>

            <p className="text-sm text-gray-600 text-center mb-3">
                Personnalisez votre image avec texte, logos, etc.
            </p>


            {loading ? (

                <div className="grid grid-cols-3 gap-2 mb-6 h-[500px]">
                    {/* Zone gauche - 2 colonnes */}
                    <div className="col-span-2 flex flex-col gap-2">
                        {/* Ligne du haut - 2 images longues */}
                        <div className="flex gap-2 h-3/5">
                            <Skeleton className="flex-1 h-full" />
                            <Skeleton className="flex-1 h-full" />
                        </div>
                        {/* Ligne du bas - 1 image large */}
                        <div className="h-2/5">
                            <Skeleton className="w-full h-full" />
                        </div>
                    </div>

                    {/* Zone droite - Grande image */}
                    <div className="col-span-1">
                        <Skeleton className="w-full h-full" />
                    </div>
                </div>

            ) : (

                <>

                    <div className="grid grid-cols-3 gap-2 mb-6 h-[500px]">
                        {/* Zone gauche - 2 colonnes pour les 3 images */}
                        <div className="col-span-2 flex flex-col gap-2">
                            {/* Ligne du haut - 2 images longues et hautes */}
                            <div className="flex gap-2 h-3/5">
                                {data.filter((item) => item.layout === "small")
                                    .map((item) => (
                                        <Card key={item.id} onClick={() => handleImageClick(item.imageUrl, item.id)}
                                            className="relative flex-1 h-full rounded-none overflow-hidden cursor-pointer group"
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

                            {/* Ligne du bas - 1 image large horizontalement */}
                            <div className="h-2/5">
                                {data.filter((item) => item.layout === "medium").map((item) => (
                                    <Card key={item.id} onClick={() => handleImageClick(item.imageUrl, item.id)}
                                        className="relative w-full h-full rounded-none overflow-hidden cursor-pointer group"
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

                        {/* Zone droite - Très grande image verticale */}
                        <div className="col-span-1">
                            {data.filter((item) => item.layout === "large").map((item) => (
                                <Card key={item.id} onClick={() => handleImageClick(item.imageUrl, item.id)}
                                    className="relative w-full h-full rounded-none overflow-hidden cursor-pointer group"
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

                    {/* Navigation */}
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="shadow hover:shadow-lg active:ring-2 active:ring-orange-500 rounded-full" > ⬅ </Button>
                        <span className="self-center font-medium">
                            Page {page} / {maxPage}
                        </span>
                        <Button variant="outline" disabled={page === maxPage} onClick={() => setPage((p) => Math.min(maxPage, p + 1))} className="shadow hover:shadow-lg active:ring-2 active:ring-orange-500 rounded-full"> ➡ </Button>
                    </div>

                </>

            )}


            {/* Intégration du Dialog */}
            <FormImageDialog imageUrl={imageLink} open={dialogOpen} onOpenChange={handleCloseDialog} id={id} />

        </div>
    );
}
