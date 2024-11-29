"use client";

import React, { useState } from 'react';
import {
    Star,
    ShoppingCart,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight,
    Plus,
    Minus,
    Paintbrush,
    Terminal,
    PenLine
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import Image from 'next/image';  // Importer le composant Image de Next.js
import { useRouter } from 'next/navigation';
import { OrderSheet } from './OrderSheet';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LuxuryWatchProductPage from './WatchProductCard';

interface ProductImage {
    id: number;
    url: string;
    alt: string;
}

interface Review {
    id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

interface RelatedProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductPageProps {
    product: {
        id: number;
        name: string;
        price: number;
        rating: number;
        shortDescription: string;
        longDescription: string;
        specifications: string[];
        colors: string[];
        sizes: string[];
        images: ProductImage[];
        reviews: Review[];
        relatedProducts: RelatedProduct[];
    };
}

export const ProductPage: React.FC<ProductPageProps> = ({ product }) => {

    const [mainImage, setMainImage] = useState(product.images[0]);

    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleOpenSheet = () => setIsSheetOpen(true);
    const handleCloseSheet = () => setIsSheetOpen(false);

    const handleAddToCart = () => {
        handleOpenSheet();
    };

    const handleAddToWishlist = () => {
        console.log('Added to wishlist:', product.id);
    };

    return (
        <>
        {/* <LuxuryWatchProductPage /> */}
        </>
    );
};
