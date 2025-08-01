"use client";

import { Auth } from "@/components/auth";
import { Logo } from "@/components/logo";
import Image from 'next/image';

import React, { useState, useEffect } from 'react';
import Header from '../_components/Header';
import Footer from "../_components/Footer";

import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react";
import { ApiAllDataResponse, OptionRealisation, Realisation, RealisationData, Reglage } from "@/interfaces/HomeInterface";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { getAllRealisations } from "@/servives/HomeService";
import { getBaseUrlImg } from "@/servives/baseUrl";
import SkeletonDemo from "../_components/SkeletonDemo";
import { ApiResponse } from "@/interfaces/ApiResponse";
import PaginationComponent from "@/components/pagination/paginationComponent"
import useAuth from "@/servives/useAuth";
import { useRouter } from 'next/navigation';
import WhatsappFloatButton from "@/components/WhatsappFloatButton";
import CategoryFilter from "@/components/Modals/CategoryFilter";


const Page: React.FC = () => {

  const token = useAuth();  // Récupérer le token à l'aide du hook
  // Déclaration d'un état pour stocker les données
  const [reglage, setReglages] = useState<Reglage[]>([]);
  const [realisation, setRealisation] = useState<RealisationData[]>([]);
  const [option, setOption] = useState<OptionRealisation[]>([]);
  const router = useRouter();

  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Catégorie sélectionnée

  const fetchData = async () => {
    const validCategoryId = selectedCategory ?? 0;
    const result: ApiResponse<ApiAllDataResponse> = await getAllRealisations(token, currentPage, validCategoryId);

    if (result.statusCode !== 200) {
      toast.error(result.message);

    } else {

      setReglages(result.data.reglages);
      setOption(result.data.OptionRealisation);
      setRealisations(result.data.realisations.data);
      setTotalPages(result.data.realisations.last_page); // Met à jour le nombre total de pages
    }
  };

  // Fonction pour changer la page
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Mettre à jour la page courante
  };

  // Appeler la fonction fetchData à chaque changement de page ou de catégorie
  useEffect(() => {
    fetchData();
  }, [currentPage, selectedCategory]); // Dépendances mises à jour pour inclure selectedCategory


  const handleFilterChange = (categoryId: number | null) => {
    // Si categoryId est null, on utilise une valeur par défaut (par exemple, 0)
    const validCategoryId = categoryId ?? 0; // Si `categoryId` est `null`, on utilise 0 comme valeur par défaut.
    setSelectedCategory(validCategoryId); // Mettre à jour la catégorie sélectionnée
    setCurrentPage(1); // Réinitialiser la page à 1 lors du changement de catégorie
  };

  const isDataEmpty = !realisations || realisations.length <= 0;

  // Fonction pour tronquer la description HTML
  const truncateDescription = (htmlContent: string, maxLength: number) => {
    // Crée un élément DOM temporaire pour manipuler le HTML
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    let textContent = doc.body.textContent || ""; // On récupère juste le texte brut

    // Si le texte est trop long, on le tronque et on ajoute "..."
    if (textContent.length > maxLength) {
      textContent = textContent.substring(0, maxLength) + "...";
    }

    // On réutilise le contenu tronqué dans un élément HTML
    const truncatedDoc = document.createElement("div");
    truncatedDoc.textContent = textContent;
    return truncatedDoc.innerHTML; // Retourne le texte HTML tronqué
  };


  const navigateTo = (path: string) => {
    const libelleModified = path.replace(/ /g, '-');
    router.push('/product/' + libelleModified);
  };


  return (

    <>

      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>

        <div className="bg-muted rounded-md relative h-[40vh] mb-2">
          <Image
            src="/hero.jpg"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        <div className="w-full py-10 lg:py-10">

          <div className="md:container md:mx-auto flex flex-col gap-14">

            <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
              <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-tighter max-w-xl font-bold whitespace-nowrap">
                DÉCOUVRIR NOS CRÉATIONS
              </h4>
            </div>


            {/* Filtre des catégories */}
            <CategoryFilter options={option} onFilterChange={handleFilterChange} />

            {isDataEmpty ? (
              <SkeletonDemo />
            ) : (

              <>


                {/* Grid de produits */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {realisations.map((item, index) => (
                    <div key={index} className="cursor-pointer">
                      {/* Image en arrière-plan */}
                      <div className="bg-muted rounded-md aspect-video mb-2">
                        <Image src={`${getBaseUrlImg()}/${item.images_realisations}`} alt={item.libelle_realisations}  width={500} height={300} className="object-cover rounded-md" layout="intrinsic" />
                      </div>
                      {/* Informations du produit */}
                      <h3 className="text-xl font-bold truncate mb-2">{item.libelle_realisations}</h3>
                      <p className="text-muted-foreground text-sm md:text-base line-clamp-3 mb-2" dangerouslySetInnerHTML={{ __html: truncateDescription(item.descript_real, 20) }} />
                      <Button className="gap-4 w-full cursor-pointer bg-white text-black hover:text-white border-2 border-gray-500 hover:border-white" onClick={() => navigateTo(item.libelle_realisations)}>
                        Commander <MoveRight className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <PaginationComponent
                  currentPage={currentPage}
                  lastPage={totalPages}
                  onPageChange={handlePageChange}
                />

              </>
            )}


          </div>

        </div>

      </div>

      <WhatsappFloatButton />

      <Footer data={reglage} />

    </>

  );
};

export default Page;
