"use client";

import { Auth } from "@/components/auth";
import { Logo } from "@/components/logo";
import ProductCard from "../_components/productCard";
import Image from 'next/image';

import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from 'react';
import Header from '../_components/Header';
import Footer from "../_components/Footer";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AllProduct from "../_components/AllProduct";
import {Filter, MoveRight, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LuxuryWatchProductPage from "../_components/WatchProductCard";
import { BreadcrumbDemo } from "../_components/BreadcrumbDemo";


const Page: React.FC = () => {

  const productData = {
    id: 1,
    name: 'Pochons unis et pagne tissé personnalisables',
    price: 99.99,
    rating: 4.5,
    shortDescription: "Offrez une expérience client unique et mémorable avec nos pochons textiles personnalisables. Personnalisables dans une variété de tailles, tissus (dont pagnes recyclés) et de couleurs, ces pochons offrent une solution élégante, durable et pratique pour renforcer votre image de marque. Mettez en valeur votre logo, votre nom de marque ou un message personnalisé sur ces pochons pour renforcer la reconnaissance de votre marque et créer une impression durable auprès de vos clients. Idéaux pour les événements promotionnels, les cadeaux d'entreprise ou simplement pour ajouter une touche sophistiquée à vos produits, nos pochons textiles personnalisables sont conçus pour répondre à vos besoins de branding.",
    longDescription: "Offrez une expérience client unique et mémorable avec nos pochons textiles personnalisables. Personnalisables dans une variété de tailles, tissus (dont pagnes recyclés) et de couleurs, ces pochons offrent une solution élégante, durable et pratique pour renforcer votre image de marque. Mettez en valeur votre logo, votre nom de marque ou un message personnalisé sur ces pochons pour renforcer la reconnaissance de votre marque et créer une impression durable auprès de vos clients. Idéaux pour les événements promotionnels, les cadeaux d'entreprise ou simplement pour ajouter une touche sophistiquée à vos produits, nos pochons textiles personnalisables sont conçus pour répondre à vos besoins de branding.",
    specifications: [
      'Contains natural fruit extracts',
      'Free from artificial colors and flavors',
      'Includes vitamins and minerals: Vitamin C, Vitamin D, Calcium',
      'Organic and non-GMO ingredients',
    ],
    colors: ['#DCA47C', '#FFD3B6', '#698474'], // Colors
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      { id: 1, url: '/Tarafe1.jpeg', alt: 'Product Image 1' },
      { id: 2, url: '/Tarafe1.jpeg', alt: 'Product Image 2' },
      { id: 3, url: '/Tarafe1.jpeg', alt: 'Product Image 3' },
    ],
    reviews: [
      { id: 1, author: 'Jane Doe', rating: 5, comment: 'Great product!', date: '2024-06-01' },
      { id: 2, author: 'John Smith', rating: 4, comment: 'Very useful, but a bit expensive.', date: '2024-06-15' },
      { id: 3, author: 'Alice Johnson', rating: 4, comment: 'I liked it, but the color was slightly different than expected.', date: '2024-06-20' },
    ],
    relatedProducts: [
      { id: 2, name: 'Related Product 1', price: 59.99, imageUrl: '/Tarafe1.jpeg' },
      { id: 3, name: 'Related Product 2', price: 79.99, imageUrl: '/Tarafe1.jpeg' },
      { id: 4, name: 'Related Product 3', price: 89.99, imageUrl: '/Tarafe1.jpeg' },
    ],
  };

  const product = {
    id: '1',
    name: 'Celestial Chronograph',
    brand: 'Luxe Timepieces',
    price: 4999.99,
    rating: 4.8,
    reviews: 128,
    image: 'https://tarafe.tarafe.com/Realisations/Tarafe-08961O.jpg',
    description: "Offrez une expérience client unique et mémorable avec nos pochons textiles personnalisables. Personnalisables dans une variété de tailles, tissus (dont pagnes recyclés) et de couleurs, ces pochons offrent une solution élégante, durable et pratique pour renforcer votre image de marque. Mettez en valeur votre logo, votre nom de marque ou un message personnalisé sur ces pochons pour renforcer la reconnaissance de votre marque et créer une impression durable auprès de vos clients. Idéaux pour les événements promotionnels, les cadeaux d'entreprise ou simplement pour ajouter une touche sophistiquée à vos produits, nos pochons textiles personnalisables sont conçus pour répondre à vos besoins de branding.",
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
      { id: 3, url: '/Tarafe1.jpeg', alt: 'Product Image 3' }
    ],
    straps: ['Leather', 'Metal', 'Rubber'],
    warranty: '5-year international warranty'
  };
  

  return (

    <>

      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
          <BreadcrumbDemo />
          <LuxuryWatchProductPage product={product}  />
      </div>
      <Footer />

    </>
  );
};

export default Page;
