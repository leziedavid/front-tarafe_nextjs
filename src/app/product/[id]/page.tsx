"use client";
import React, { useState, useEffect } from 'react';
import Header from '../../_components/Header';
import Footer from "../../_components/Footer";
import LuxuryWatchProductPage from "../../_components/WatchProductCard";
import {useParams } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import {DetailRealisation,Reglage,Realisation,Images} from "@/interfaces/HomeInterface";
import { getRealisationsByLaballe } from "@/servives/HomeService";
import { ApiResponse } from "@/interfaces/ApiResponse";
import useAuth from "@/servives/useAuth";
// import { Breadcrumbs } from "@/components/breadcrumbs";
import WhatsappFloatButton from "@/components/WhatsappFloatButton";


const Page: React.FC = () => {
  
  const token = useAuth();  // Récupérer le token à l'aide du hook
  const { id } = useParams<{ id: string }>();
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [images, setImages] = useState<Images[]>([]);
  const [reglage, setReglages] = useState<Reglage []>([]);

  const fetchData = async (id:string) => {

    const libelleModified = id.substring(id.lastIndexOf('/') + 1);
    const libelle = libelleModified.replace(/-/g, ' ');

    const result: ApiResponse<DetailRealisation> = await getRealisationsByLaballe(token,libelle);

    if (result.statusCode !== 200) {
      toast.error(result.message);

    } else {

      setReglages(result.data.reglages);
      setRealisations(result.data.realisations);
      setImages(result.data.images);
    }

  };

  useEffect(() => {

    if (id) {
      fetchData(id);
    }

    }, [id]);


  return (
    <>
      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
          <LuxuryWatchProductPage data={realisations} image={images}  />
      </div>
      <WhatsappFloatButton />
      <Footer data={reglage} />
      <Toaster />
    </>
  );
};

export default Page;
