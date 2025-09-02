"use client";


import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Header from '../_components/Header';
import Footer from "../_components/Footer";
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react";
import { ApiAllDataResponse, OptionRealisation, Realisation, RealisationData, Reglage } from "@/interfaces/HomeInterface";
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
import { Card, CardContent } from "@/components/ui/card";
import WebSkeletons from '@/components/MySkeleton';


const Page: React.FC = () => {

  const token = useAuth();  // Récupérer le token à l'aide du hook
  // Déclaration d'un état pour stocker les données
  const [reglage, setReglages] = useState<Reglage[]>([]);
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
          <Image src="/hero.jpg" alt="Hero Image" layout="fill" objectFit="cover" className="rounded-md" />
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
              <WebSkeletons count={8} />
            ) : (

              <>

                <div className="container mx-auto px-4 w-full py-5 lg:py-5">

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {realisations.map((item, i) => (

                      <Card key={i} className="overflow-hidden border-none shadow-none" onClick={() => navigateTo(item.libelle_realisations)} >
                        <CardContent className="p-0 flex flex-col h-full">
                          {/* Image plus grande */}
                          <div className="w-full h-48 sm:h-64 md:h-72 lg:h-96 relative">
                            <Image src={`${getBaseUrlImg()}/${item.images_realisations}`} alt={item.libelle_realisations} fill className="object-cover" />
                          </div>

                          {/* Titre + lien alignés en bas */}
                          <div className="flex flex-col justify-between flex-1 p-4">
                            <h3 className="font-bold text-sm text-muted-foreground  uppercase tracking-tighter">{item.libelle_realisations}</h3>

                            <p onClick={() => navigateTo(item.libelle_realisations)} className="text-sm text-muted-foreground mt-auto cursor-pointer hover:text-[#ffb44b]">
                              Je découvre →
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                    ))}
                  </div>

                </div>

                {/* Grid de produits */}

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
