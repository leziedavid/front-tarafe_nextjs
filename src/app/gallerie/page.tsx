"use client";

import { Auth } from "@/components/auth";
import { Logo } from "@/components/logo";
import ProductCard from "../_components/productCard";

import React, { useState, useEffect } from 'react';
import Header from '../_components/Header';
import Footer from "../_components/Footer";
import { GallerieImage, GallerieImagesResponse, OptionRealisation, Realisation, RealisationData, Reglage } from "@/interfaces/HomeInterface";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { getAllImagesGallery } from "@/servives/HomeService";
import { getBaseUrlImg } from "@/servives/baseUrl";
import SkeletonDemo from "../_components/SkeletonDemo";
import { ApiResponse } from "@/interfaces/ApiResponse";
import PaginationComponent from "@/components/pagination/paginationComponent"
import useAuth from "@/servives/useAuth";
import { Filters } from "@/interfaces/Filters";
import ImagePreviewDialog from "@/components/Dialog/ImagePreviewDialog";
import WhatsappFloatButton from "@/components/WhatsappFloatButton";
import Image from 'next/image';

const Page: React.FC = () => {

  const token = useAuth();  // Récupérer le token à l'aide du hook
  // Déclaration d'un état pour stocker les données
  const [reglage, setReglages] = useState<Reglage[]>([]);
  const [realisation, setRealisation] = useState<RealisationData[]>([]);
  const [option, setOption] = useState<OptionRealisation[]>([]);

  const [dataImages, setImage] = useState<GallerieImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState(''); // Recherche


  const [imageLink, setImageLink] = useState<string>(''); // Etat pour l'URL de l'image
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Etat pour contrôler l'ouverture du Dialog

  const fetchData = async () => {
    const filters: Filters = { page: currentPage, limit: 10, search: search || undefined, };

    const result: ApiResponse<GallerieImagesResponse> = await getAllImagesGallery(token, filters);


    if (result.statusCode !== 200) {
      toast.error(result.message);

    } else {

      setReglages(result.data.reglages);
      setImage(result.data.data.data);
      setTotalPages(result.data.data.last_page); // Met à jour le nombre total de pages
    }
  };

  // Fonction pour changer la page
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Mettre à jour la page courante
  };

  // Appeler la fonction fetchData à chaque changement de page ou de catégorie
  useEffect(() => {
    fetchData();
  }, [currentPage, search]); // Dépendances mises à jour pour inclure selectedCategory



  const isDataEmpty = !dataImages || dataImages.length <= 0;

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


  // Fonction pour ouvrir le Dialog avec l'image sélectionnée
  const handleImageClick = (url: string) => {
    setImageLink(url);  // Met l'URL de l'image dans l'état
    setDialogOpen(true); // Ouvre le Dialog
  };

  // Fonction pour fermer le Dialog
  const handleCloseDialog = (open: boolean) => {
    setDialogOpen(open);  // Ferme le Dialog
    setImageLink('');  // Réinitialise l'URL de l'image
  };



  return (

    <>

      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>

        <div className="w-full py-20 lg:py-20">

          <div className="md:container md:mx-auto flex flex-col gap-14">

            <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold">
                NOS REALISATIONS
              </h4>

            </div>

            {isDataEmpty ? (
              <SkeletonDemo />

            ) : (

              <>


                {/* Grid de produits */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {dataImages.map((item, index) => (
                    <div key={index} className="cursor-pointer">
                      {/* Image en arrière-plan */}
                      <div className="bg-muted rounded-md aspect-video">
                        <Image src={`${getBaseUrlImg()}/${item.files_gallerie_images}`} alt="Tarafe"
                          width={500}
                          height={300}
                          className="object-cover rounded-md"
                          layout="intrinsic"
                          onClick={() => handleImageClick(`${getBaseUrlImg()}/${item.files_gallerie_images}`)}
                        />
                      </div>
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

      {/* Intégration du Dialog */}
      <ImagePreviewDialog
        imageUrl={imageLink}
        open={dialogOpen}
        onOpenChange={handleCloseDialog} // Fonction pour fermer le Dialog
      />

      <WhatsappFloatButton />
      <Footer data={reglage} />

    </>

  );
};

export default Page;
