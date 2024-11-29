"use client"

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, Share2, ShoppingCart, Check } from 'lucide-react';
import Image from 'next/image';
import { OrderSheet } from './OrderSheet';

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

// Définition du composant fonctionnel avec la props typée ProductPageProps
export const LuxuryWatchProductPage: React.FC<{ product: ProductPageProps }> = ({ product }) => {

    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedStrap, setSelectedStrap] = useState(product.straps[0]);
    const [isWishlist, setIsWishlist] = useState(false);
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(1);

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleOpenSheet = () => setIsSheetOpen(true);
    const handleCloseSheet = () => setIsSheetOpen(false);

    const handleAddToCart = () => {
        handleOpenSheet();
    }


    return (
        <div className="flex justify-center items-center min-h-screen px-4 lg:px-8">
            <Card className="w-full max-w-5xl h-fit overflow-hidden bg-white border-0 shadow-none">
                <div className="flex flex-col lg:flex-row">

                    {/* Section image principale */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8">
                        <div className="relative w-full  mb-4">
                            <img
                                src={product.image}  // Image principale
                                alt={product.name}
                                width={500}   // Ajuster selon votre design
                                height={500}  // Ajuster selon votre design
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Petites images sous l'image principale */}
                        <div className="flex space-x-4 w-full justify-center">
                            {product.images.map((image) => (
                                <div key={image.id} className="w-24 h-24 cursor-pointer rounded-md hover:opacity-75 transition">
                                    <Image
                                        src={image.url}
                                        alt={image.alt}
                                        layout="responsive"
                                        width={100}   // Taille des petites images
                                        height={100}  // Taille des petites images
                                        className="object-cover w-full h-full"
                                        onClick={() => setMainImage(image)}  // Mettre l'image principale à jour
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section contenu */}
                    <CardContent className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col h-full">
                        <div className="mb-4">
                            <h4 className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</h4>
                            <h2 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h2>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                        </div>
                        <p className="text-gray-600 mb-6">{product.description}</p>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Color</h3>
                            <div className="flex space-x-3">
                                {product.colors.map((color) => (
                                    <button key={color.name}
                                        className={`w-8 h-8 rounded-full ${selectedColor.name === color.name ? '' : ''}`}  // Retirer le "ring" ici
                                        style={{ backgroundColor: color.hex }}
                                        onClick={() => setSelectedColor(color)}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Strap</h3>
                            <div className="flex space-x-3">
                                {product.straps.map((strap) => (
                                    <Button key={strap} variant={selectedStrap === strap ? "default" : "outline"}
                                        onClick={() => setSelectedStrap(strap)} >
                                        {strap}
                                    </Button>
                                ))}
                            </div>
                        </div> */}


                        <Tabs defaultValue="features" className="mb-6">
                            <TabsList>
                                <TabsTrigger value="features">Features</TabsTrigger>
                                <TabsTrigger value="warranty">Warranty</TabsTrigger>
                            </TabsList>
                            <TabsContent value="features">
                                <ul className="list-disc pl-5 text-sm text-gray-600">
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </TabsContent>
                            <TabsContent value="warranty">
                                <p className="text-sm text-gray-600">{product.warranty}</p>
                            </TabsContent>
                        </Tabs>
                        <div className="mt-auto">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex space-x-2">
                                    <Button onClick={handleAddToCart} className="w-full bg-gray-900 hover:bg-gray-800 text-white" size="lg">
                                        <ShoppingCart className="mr-2 h-5 w-5" />  Passer une commande
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

            <OrderSheet productId={product.name as string}
                    isOpen={isSheetOpen} // Passer l'état d'ouverture du Sheet
                    onClose={handleCloseSheet} // Passer la fonction pour fermer le Sheet
                />
        </div>
    );
    

};

export default LuxuryWatchProductPage;