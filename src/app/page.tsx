"use client";
import React, { useState, useEffect } from 'react';
import Header from './_components/Header';
import Footer from "./_components/Footer";
import Feature5 from "./_components/Feature5";
import Hero3 from "./_components/Hero3";
import ContactForm from "./_components/ContactForm";
import { getAllHomeData } from "@/servives/HomeService";
import { Realisation, Reglage, Partenaires, Publicite } from "@/interfaces/HomeInterface";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import Pub from "./_components/Pub";
import useAuth from "@/servives/useAuth";
import WhatsappFloatButton from "@/components/WhatsappFloatButton";
import WaxPrintInterface from "@/components/WaxPrintInterface";

const Home: React.FC = () => {
  const token = useAuth();  // Récupérer le token à l'aide du hook
  // Déclaration d'un état pour stocker les données
  const [reglages, setReglages] = useState<Reglage[]>([]);
  const [partenaire, setPartenaire] = useState<Partenaires[]>([]);
  const [realisation, setRealisation] = useState<Realisation[]>([]);
  const [publicites, setPublicites] = useState<Publicite[]>([]);


  useEffect(() => {
    const fetchData = async () => {

      const result = await getAllHomeData(token);
      // Vérification si l'objet retourné est une erreur
      if ('error' in result) {
        // Affichage de l'erreur avec `toast.error`
        toast.error(result.error);
      } else {
        // Si les données sont récupérées avec succès, affiche un message de succès
        toast.success("Données récupérées avec succès !");
        setReglages(result.reglages)
        setRealisation(result.realisations)
        setPartenaire(result.partenaires)
        setPublicites(result.Publicites)
      }
    };

    fetchData();
  }, []); // Le useEffect se déclenche quand le composant est monté

  return (

    <>

      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-10 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
        <div className="w-full py-1 md:py-1 lg:py-1">
          <div className="md:container md:mx-auto">
            <Hero3 data={reglages} />
            <Feature5 data={realisation} reglage={reglages} />
            <WaxPrintInterface />
            {/* <Pub data={publicites} /> */}
            {/* <Partenaire data={partenaire}/> */}
            <ContactForm data={reglages} />
            <WhatsappFloatButton />
          </div>
        </div>
      </div>
      <Footer data={reglages} />
      <Toaster />

    </>
  );
};

export default Home;
