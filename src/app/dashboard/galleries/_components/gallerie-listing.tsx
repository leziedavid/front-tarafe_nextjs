'use client';


import { useState, useEffect, useTransition } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import useAuth from '@/servives/useAuth';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { GallerieImage, GallerieImagesResponse, Realisation } from '@/interfaces/HomeInterface';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllImagesGallery } from '@/servives/HomeService';
import { getBaseUrlImg } from '@/servives/baseUrl';
import PaginationComponent from '@/components/pagination/paginationComponent';
import { Edit, Eye, Trash } from 'lucide-react';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import ImagePreviewDialog from '@/components/Dialog/ImagePreviewDialog';
import ImageUploadDialog from '@/components/Dialog/ImageUploadDialog';

type GallerieListingPage = {
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void; // Prop pour gérer l'ouverture du dialog
};


export default function GallerieListingPage({isDialogOpen,onDialogOpenChange}: GallerieListingPage) {

  const [isLoading, startTransition] = useTransition();

  const token = useAuth();  // Récupérer le token à l'aide du hook

  const [dataImages, setImage] = useState<GallerieImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState(''); // Recherche

  const [imageLink, setImageLink] = useState<string>(''); // Etat pour l'URL de l'image
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Etat pour contrôler l'ouverture du Dialog
  // const [isDialogOpen, setIsDialogOpen] = useState(false);


  const fetchData = async () => { const filters: Filters = {  page: currentPage, limit: 10, search: search || undefined,};

    const result: ApiResponse<GallerieImagesResponse> = await getAllImagesGallery(token, filters);


    if (result.statusCode !== 200) {
      toast.error(result.statusMessage);
    } else {
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
  }, [currentPage,search]); // Dépendances mises à jour pour inclure selectedCategory


  const isDataEmpty = !dataImages || dataImages.length <= 0;

    // Callback pour mettre à jour `search` avec la plage de dates sélectionnée
    const handleDateRangeChange = (formattedDateRange: string) => {
      setSearch(formattedDateRange);
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
    <div>
      

      {/* <Input placeholder="Search Produit ..." value={search} onChange={(e) => setSearch(e.target.value)} className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse', "mb-6")} /> */}
      <div className="flex items-center justify-between space-y-2">
      <h2 className="text-2xl font-bold tracking-tight"> </h2>
      <div className="items-center space-x-2 md:flex">
          <CalendarDateRangePicker className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse', 'mb-6')} onDateChange={handleDateRangeChange}/>
      </div>
      </div>
      {isDataEmpty ? (

        <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-auto">
          {/* Carte 1 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 2 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 3 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 4 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 5 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 6 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 7 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 8 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>

      ) : (

        
        <>

        <div className="space-y-4">

                  <div className="grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-6">
                    {dataImages.map((item, index) => (
                      <div key={index} className="relative flex flex-col gap-4">

                        {/* Container de l'image avec un fond sombre au survol */}
                        <div className="bg-muted rounded-md aspect-video mb-0 relative group">
                          <img
                            src={`${getBaseUrlImg()}/${item.files_gallerie_images}`}
                            alt="logo"
                            width={500}
                            height={300}
                            className="object-cover rounded-md cursor-pointer"
                          />

                          {/* Effet sombre lors du survol */}
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center space-x-2">
                            {/* Boutons de suppression avec icône */}
                            <button className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105 flex items-center space-x-2">
                              <Trash size={16} />
                            </button>

                            {/* Bouton d'édition avec icône */}
                            <button  onClick={() => handleImageClick(`${getBaseUrlImg()}/${item.files_gallerie_images}`)} className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105 flex items-center space-x-2">
                              <Eye size={16} />
                            </button>
                          </div>

                        </div>

                      </div>
                    ))}
                  </div>

                  <PaginationComponent
                    currentPage={currentPage}
                    lastPage={totalPages}
                    onPageChange={handlePageChange}
                  />
        </div>

        <ImageUploadDialog open={isDialogOpen} onOpenChange={onDialogOpenChange} />
        <ImagePreviewDialog imageUrl={imageLink}  open={dialogOpen}  onOpenChange={handleCloseDialog} />

          
        </>

      )}

    </div>
  );

}
