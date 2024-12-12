"use client";

import { Auth } from "@/components/auth";
import { Logo } from "@/components/logo";
import ProductCard from "../../_components/productCard";
import Image from 'next/image';

import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from 'react';
import Header from '../../_components/Header';
import Footer from "../../_components/Footer";

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
import AllProduct from "../../_components/AllProduct";
import {Filter, MoveRight, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LuxuryWatchProductPage from "../../_components/WatchProductCard";
import { BreadcrumbDemo } from "../../_components/BreadcrumbDemo";
import { useRouter,useParams } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import {DetailRealisation,Reglage,Realisation,Images} from "@/interfaces/HomeInterface";
import { getRealisationsByLaballe } from "@/servives/HomeService";
import { ApiResponse } from "@/interfaces/ApiResponse";
import useAuth from "@/servives/useAuth";
import { Breadcrumbs } from "@/components/breadcrumbs";


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
      toast.error(result.statusMessage);

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
          <div className="flex items-center gap-2 px-4">
            <Breadcrumbs />
          </div>
          <LuxuryWatchProductPage data={realisations} image={images}  />
      </div>

      <Footer data={reglage} />
      <Toaster />

    </>
  );
};

export default Page;
