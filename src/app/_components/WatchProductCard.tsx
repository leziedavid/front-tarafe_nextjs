"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pen, Share2 } from "lucide-react";
import { OrderSheet } from './OrderSheet';
import { Realisation, Images } from "@/interfaces/HomeInterface";
import { getBaseUrlImg } from "@/servives/baseUrl";

interface ProductPageProps {
    id: string;
    name: string;
    brand: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    description: string;
    features: string[];
    colors: { name: string; hex: string; }[];
    images: { id: number; url: string; alt: string; }[];
    straps: string[];
    warranty: string;
}

interface Props {
    data: Realisation[];
    image: Images[];
}

const LuxuryWatchProductPage: React.FC<Props> = ({ data, image }) => {
    const [mainImage, setMainImage] = useState<Images>(image[0]);
    const [quantity, setQuantity] = useState(1);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const imagesPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (image.length > 0) {
            setMainImage(image[0]);
        }
    }, [image]);

    const mainImageSrc = mainImage ? `${getBaseUrlImg()}/${mainImage.filles_img_realisations}` : '';

    const totalPages = Math.ceil(image.length / imagesPerPage);

    const currentImages = image.slice(
        currentPage * imagesPerPage,
        (currentPage + 1) * imagesPerPage
    );

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleOpenSheet = () => setIsSheetOpen(true);
    const handleCloseSheet = () => setIsSheetOpen(false);
    const handleAddToCart = () => handleOpenSheet();

    const isDataEmpty = !data || data.length <= 0;

    return (
        <>
            {isDataEmpty ? (
                <div className="w-full py-10 lg:py-20">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
                            <div className="bg-muted rounded-md aspect-square" />
                            <div className="bg-muted rounded-md aspect-square" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-screen px-4 lg:px-8">
                    <Card className="w-full max-w-5xl h-fit overflow-hidden bg-white border-0 shadow-none">
                        <div className="flex flex-col lg:flex-row">
                            {/* Section image principale */}
                            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8">

                                <div className="relative w-full mb-4">
                                    {mainImage ? (
                                        <Image
                                            src={mainImageSrc}
                                            alt={mainImage.codeId}
                                            width={500}
                                            height={500}
                                            className="max-w-full max-h-full object-contain bg-muted rounded-md"
                                        />
                                    ) : (
                                        <p>Image non disponible</p>
                                    )}
                                </div>

                                {/* Pagination */}
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-5">
                                        <div className="flex items-center w-full justify-center mb-4 space-x-4">
                                            {/* Flèche gauche */}
                                            <div
                                                className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full bg-gray-300 hover:bg-gray-400 transition transform hover:scale-110 ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                onClick={prevPage}
                                            >
                                                <ChevronLeft className="h-6 w-6 text-gray-800" />
                                            </div>

                                            {/* Liste des images */}
                                            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide scroll-smooth max-w-[90%] md:max-w-[70%] justify-center">
                                                {currentImages.map((item) => (
                                                    <div
                                                        key={item.id_img_realisations}
                                                        className="w-24 h-24 cursor-pointer rounded-md hover:opacity-75 transition bg-muted flex items-center justify-center"
                                                        onClick={() => setMainImage(item)}
                                                    >
                                                        <Image
                                                            src={`${getBaseUrlImg()}/${item.filles_img_realisations}`}
                                                            alt={item.codeId}
                                                            width={100}
                                                            height={100}
                                                            className="object-contain w-full h-full"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Flèche droite */}
                                            <div
                                                className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full bg-gray-300 hover:bg-gray-400 transition transform hover:scale-110 ${currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                onClick={nextPage}
                                            >
                                                <ChevronRight className="h-6 w-6 text-gray-800" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            {/* Section contenu */}
                            <CardContent className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col h-full">
                                <div className="mb-4">
                                    <h4 className="text-sm text-gray-500 uppercase tracking-wide">
                                        CODE : {data[0].code_realisation}
                                    </h4>
                                    <h2 className="text-2xl font-extrabold font-title text-gray-900 mt-1 uppercase">
                                        {data[0].libelle_realisations}
                                    </h2>
                                </div>

                                <p
                                    className="text-gray-600 mb-6"
                                    dangerouslySetInnerHTML={{
                                        __html: data && data[0] ? data[0].descript_real : '',
                                    }}
                                />

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex space-x-2">
                                            <Button
                                                onClick={handleAddToCart}
                                                className="w-full hover:bg-[#ffb44b] text-white"
                                                size="lg"
                                            >
                                                <Pen className="mr-2 h-5 w-5" /> Je personnalise
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <Share2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </Card>

                    <OrderSheet
                        productId={data[0].libelle_realisations}
                        isOpen={isSheetOpen}
                        datas={data}
                        onClose={handleCloseSheet}
                    />
                </div>
            )}
        </>
    );
};

export default LuxuryWatchProductPage;
