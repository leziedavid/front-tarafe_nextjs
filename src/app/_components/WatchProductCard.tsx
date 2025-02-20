"use client"

import React, { useState,useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, Share2, ShoppingCart, Check, Pen } from 'lucide-react';
import Image from 'next/image';
import { OrderSheet } from './OrderSheet';
import {Realisation,Images} from "@/interfaces/HomeInterface";
import { getBaseUrlImg } from "@/servives/baseUrl";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import des flèches
import { Skeleton } from "@/components/ui/skeleton";


const product = {
    id: '1',
    name: 'Celestial Chronograph',
    brand: 'Luxe Timepieces',
    price: 4999.99,
    rating: 4.8,
    reviews: 128,
    image: '/Tarafe1.jpeg',
    description: 'The Celestial Chronograph is a masterpiece of horological engineering, combining timeless elegance with cutting-edge technology.',
    features: [
        'Swiss-made automatic movement',
        'Sapphire crystal glass',
        'Water-resistant to 100 meters',
        'Luminous hands and markers',
        '42mm case diameter'
    ],
    colors: [
        { name: 'Midnight Blue', hex: '#191970' },
        { name: 'Rose Gold', hex: '#B76E79' },
        { name: 'Emerald Green', hex: '#50C878' }
    ],
    images: [
        { id: 1, url: '/Tarafe1.jpeg', alt: 'Product Image 1' },
        { id: 2, url: '/Tarafe1.jpeg', alt: 'Product Image 2' },
        { id: 3, url: '/Tarafe1.jpeg', alt: 'Product Image 3' },
    ],
    straps: ['Leather', 'Metal', 'Rubber'],
    warranty: '5-year international warranty'
};

interface ProductImage {
    id: number;
    url: string;
    alt: string;
}

interface ProductColor {
    name: string;
    hex: string;
}

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
    colors: ProductColor[];
    images: ProductImage[];
    straps: string[];
    warranty: string;
}

interface Props {
    data: Realisation[];
    image:  Images[];
}

const LuxuryWatchProductPage: React.FC<Props> = ({ data,image }) => {

       // Initialiser l'image principale avec la première image de la liste `image`
    const [mainImage, setMainImage] = useState<Images>(image[0]);

    const [quantity, setQuantity] = useState(1);

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleOpenSheet = () => setIsSheetOpen(true);
    const handleCloseSheet = () => setIsSheetOpen(false);

    const handleAddToCart = () => {
        handleOpenSheet();
    }

    useEffect(() => {
        // Si le tableau `image` change, on met à jour l'image principale pour être la première image
        if (image.length > 0) { setMainImage(image[0]);}
    }, [image]); // Utiliser useEffect pour réagir au changement des images


    // Assurez-vous que mainImage est défini avant d'accéder à ses propriétés
    const mainImageSrc = mainImage ? `${getBaseUrlImg()}/${mainImage.filles_img_realisations}` : '';

    const imagesPerPage = 3; // Nombre d'images par page
  const [currentPage, setCurrentPage] = useState(0); // Page actuelle

    // Calculer les images à afficher pour la page actuelle
    const currentImages = image.slice(
        currentPage * imagesPerPage,
        (currentPage + 1) * imagesPerPage
    );

    // Fonction pour passer à la page précédente
    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Fonction pour passer à la page suivante
    const nextPage = () => {
        if ((currentPage + 1) * imagesPerPage < image.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const isDataEmpty = !data || data.length <= 0;

    return (

        <>

            {isDataEmpty ? (

                <div className="w-full py-10 lg:py-20">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">

                            <div className="bg-muted rounded-md aspect-square">
                            </div>

                            <div className="bg-muted rounded-md aspect-square">
                            </div>

                        </div>
                    </div>
                </div>

            ) : (
                
                <div className="flex justify-center items-center min-h-screen px-4 lg:px-8">

                    <Card className="w-full max-w-5xl h-fit overflow-hidden bg-white border-0 shadow-none">
                        <div className="flex flex-col lg:flex-row">

                            {/* Section image principale */}
                            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8">

                                <div className="relative w-full  mb-4">
                                    {/* Image principale */}
                                    {mainImage ? (
                                        <img
                                            src={mainImageSrc} // Image principale affichée ici
                                            alt={mainImage.codeId} // Alt text for accessibility
                                            width={500} // Ajuster selon votre design
                                            height={500} // Ajuster selon votre design
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    ) : (
                                        <p>Image non disponible</p> // Message si l'image principale est introuvable
                                    )}
                                </div>

                                {/* Conteneur de pagination avec flèches */}
                                <div className="flex items-center w-full justify-center mb-4 space-x-4">
                                    {/* Flèche gauche (Retour) */}
                                    <div className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full bg-gray-300 hover:bg-gray-400 transition transform hover:scale-110 ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""}`} onClick={prevPage} >
                                        <ChevronLeft className="h-6 w-6 text-gray-800" />
                                    </div>

                                    {/* Petites images sous l'image principale */}
                                    <div className="flex space-x-4 w-full justify-start overflow-x-auto scrollbar-hide">
                                        {currentImages.map((item) => (
                                            <div key={item.id_img_realisations} className="w-24 h-24 cursor-pointer rounded-md hover:opacity-75 transition" onClick={() => { }} >
                                                <img
                                                    src={`${getBaseUrlImg()}/${item.filles_img_realisations}`}
                                                    alt={item.codeId}
                                                    width={100}
                                                    height={100}
                                                    className="object-cover w-full h-full"
                                                    onClick={() => setMainImage(item)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Flèche droite (Suivant) */}
                                    <div className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full bg-gray-300 hover:bg-gray-400 transition transform hover:scale-110 ${(currentPage + 1) * imagesPerPage >= image.length ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={nextPage} >
                                        <ChevronRight className="h-6 w-6 text-gray-800" />
                                    </div>

                                </div>

                            </div>


                            {/* Section contenu */}
                            <CardContent className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col h-full">
                                <div className="mb-4">
                                    <h4 className="text-sm text-gray-500 uppercase tracking-wide">CODE : {data[0].code_realisation}</h4>
                                    <h2 className="text-2xl font-extrabold font-title text-gray-900 mt-1 uppercase">{data[0].libelle_realisations}</h2>
                                </div>

                                <p className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: data && data[0] ? data[0].descript_real : '' }} />

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex space-x-2">
                                            <Button onClick={handleAddToCart} className="w-full  hover:bg-[#ffb44b] text-white" size="lg">
                                                <Pen className="mr-2 h-5 w-5" />  Je personnalise
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

                    <OrderSheet productId={product.name as string} isOpen={isSheetOpen} datas={data} onClose={handleCloseSheet} />

                </div>

            )}



        </>

    );
    

};

export default LuxuryWatchProductPage;