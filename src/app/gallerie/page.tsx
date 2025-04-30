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
import { GalleryCategory, GalleryCategoryResponse } from "@/interfaces/AdminInterface";
import { fetchGalleryCategory } from "@/servives/AdminService";
import { Loader2 } from "lucide-react";

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
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); 
    const [loading, setLoading] = useState<boolean>(false); // État pour gérer le chargement


  const [imageLink, setImageLink] = useState<string>(''); // Etat pour l'URL de l'image
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Etat pour contrôler l'ouverture du Dialog

  const fetchData = async () => {
    const validCategoryId = selectedCategory ?? 0;
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


  const fetchDataCategory = async () => {

    const result = await fetchGalleryCategory(token);

    if (result.statusCode !== 200) {
      toast.error(result.message);

    } else {
      toast.success("Catégories récupérées avec succès !");
      setCategories(result.data);
    }

  };


  const handleCategoryClick = (categoryId: number | null) => {
    setLoading(true); // Commence le chargement dès qu'une catégorie est sélectionnée
    const validCategoryId = categoryId ?? 0; // Si `categoryId` est `null`, on utilise 0 comme valeur par défaut.
    setSelectedCategory(categoryId); // Mettre à jour la catégorie sélectionnée
    setSearch(validCategoryId.toString()); // Convertit en string
    setCurrentPage(1); // Réinitialiser la page à 1 lors du changement de catégorie
    console.log('Catégorie sélectionnée :', categoryId);
    setTimeout(() => setLoading(false), 500); // Arrêter le chargement après un délai


  };

  // Fonction pour changer la page
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Mettre à jour la page courante
  };

  // Appeler la fonction fetchData à chaque changement de page ou de catégorie
  useEffect(() => {
    fetchData();
    fetchDataCategory();
  }, [currentPage, search]); // Dépendances mises à jour pour inclure selectedCategory



  const isDataEmpty = !dataImages || dataImages.length <= 0;


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
      <Toaster />

      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>

        <div className="w-full py-20 lg:py-20">

          <div className="md:container md:mx-auto flex flex-col gap-14">

            <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">

              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold">
                NOS REALISATIONS
              </h4>

            </div>

            {/* Catégories dynamiques */}
            <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
              <button  onClick={() => handleCategoryClick(null)}  className={`p-2  rounded-full text-sm text-base font-medium px-5 py-2.5 text-center me-3 mb-3 ${selectedCategory === null ? 'bg-[#242078] text-white' : 'bg-gray-200'}`}              >
                Toutes les catégories
              </button>

              {categories.map((category) => (
                <button key={category.idcategories_gallery}  onClick={() => handleCategoryClick(category.idcategories_gallery)} className={`p-2 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 text-sm ${selectedCategory === category.idcategories_gallery  ? 'bg-[#242078] text-white' : 'bg-gray-200'}`} >

                  {selectedCategory === category.idcategories_gallery && loading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    category.libelle
                  )}
                    
                  {/* {category.libelle} */}
                </button>
              ))}
            </div>

              {isDataEmpty ? (

                <SkeletonDemo />

              ) : (

                <>

                  {/* Grid de produits */}
                  <div className="grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-6">
                    {dataImages.map((item, index) => (
                      <div key={index} className="cursor-pointer">
                        {/* Image en arrière-plan */}
                        <div className="bg-muted rounded-md aspect-video">
                          <Image src={`${getBaseUrlImg()}/${item.files_gallerie_images}`} alt="Tarafe"
                            width={500}
                            height={300}
                            className="object-cover h-auto max-w-full rounded-lg"
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
