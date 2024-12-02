"use client";

import { Auth } from "@/components/auth";
import { Logo } from "@/components/logo";
import ProductCard from "./_components/productCard";

import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from 'react';
import Header from './_components/Header';
import Footer from "./_components/Footer";
import Feature5 from "./_components/Feature5";
import CarouselComponent from "./_components/CarouselComponent";
import Hero3 from "./_components/Hero3";
import Contact1 from "./_components/Contact1";
import ContactForm from "./_components/ContactForm";
import { getAllHomeData } from "@/servives/HomeService";
import { Realisation, Reglage } from "@/interfaces/HomeInterface";

import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"

const Home: React.FC = () => {

  // Déclaration d'un état pour stocker les données
  const [result, setResult] = useState<any>(null);
  const [reglages, setReglages] = useState<Reglage []>([]);
  const [realisation, setRealisation] = useState<Realisation[]>([]);

const CARROUSSEL_BANNER = [
  {
    image: "/images.jpg",
    config: { point: true },
    content: ["Content 1", "Content 2", "Content 3"],
  },
  {
    image: "/images.jpg",
    config: {},
    content: ["Content A", "Content B"],
  },
];


useEffect(() => {
  const fetchData = async () => {
    
      const result = await getAllHomeData();
      // Vérification si l'objet retourné est une erreur
      if ('error' in result) {
          // Affichage de l'erreur avec `toast.error`
          toast.error(result.error);
      } else {
          // Si les données sont récupérées avec succès, affiche un message de succès
          toast.success("Données récupérées avec succès !");
          setReglages(result.reglages)
          setRealisation(result.realisations)
      }
  };

  fetchData();
}, []); // Le useEffect se déclenche quand le composant est monté

  return (

    <>

      <Header/>
      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
        <Hero3 data={reglages} />
        <Feature5 data={realisation} reglage={reglages}/>
        <ContactForm data={reglages} />
      </div>
      <Footer data={reglages}/>
      <Toaster />

    </>
  );
};

export default Home;
