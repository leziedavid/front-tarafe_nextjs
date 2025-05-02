'use client';

import { useState, useEffect, useTransition } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Filters } from '@/interfaces/Filters'; 
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
import { GalleryCategory } from '@/interfaces/AdminInterface';
import { fetchGalleryCategory, updateImageCategories } from '@/servives/AdminService';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ComboboxMultiSelect } from '@/components/Select2/ComboboxMultiSelect';
import { MultiSelect } from '@/components/Select2/MultiSelect';

type GallerieListingPage = {
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
};

export default function GallerieListingPage({isDialogOpen,onDialogOpenChange}: GallerieListingPage) {

  const [isLoading, startTransition] = useTransition();
  const token = useAuth();  // Récupérer le token à l'aide du hook
  const [dataImages, setImage] = useState<GallerieImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState(''); 
  const [imageLink, setImageLink] = useState<string>(''); 
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Map<string, { id: string; libelle: string }[]>>(new Map());
  const [selectedSkills, setSelectedSkills] = useState<{ id: string; libelle: string }[]>([]);
  const [selectOptions, setSelectOptions] = useState<{ id: string; libelle: string }[]>([]);

  const fetchData = async () => {
    const filters: Filters = { page: currentPage, limit: 10, search: search || undefined, };
    const result: ApiResponse<GallerieImagesResponse> = await getAllImagesGallery(token, filters);

    if (result.statusCode !== 200) {
      toast.error(result.message);
    } else {
      setImage(result.data.data.data);
      setTotalPages(result.data.data.last_page);
    }
  };

  const fetchDataCategory = async () => {
    const result = await fetchGalleryCategory(token);
    if (result.statusCode !== 200) {
      toast.error(result.message);
    } else {
      toast.success("Catégories récupérées avec succès !");
      setCategories(result.data);

      // ✅ Transformation directe ici
      const options = result.data.map((cat: GalleryCategory) => ({
        id: String(cat.idcategories_gallery),
        libelle: cat.libelle,
      }));

      // Utilise setOptions si tu stockes ces options dans un autre state
      setSelectOptions(options);

    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenSelect = () => {
    setIsSelectOpen(prevState => !prevState);
  };

  useEffect(() => {
    fetchData();
    fetchDataCategory();
  }, [currentPage, search]);

  const isDataEmpty = !dataImages || dataImages.length <= 0;

  const handleDateRangeChange = (formattedDateRange: string) => {
    setSearch(formattedDateRange);
  };

  const handleImageClick = (url: string) => {
    setImageLink(url);
    setDialogOpen(true);
  };

  const handleCloseDialog = (open: boolean) => {
    setDialogOpen(open);
    setImageLink('');
  };

  const handleCheckboxChange = (imageId: string) => {
    setSelectedImages(prevState => {
      const newSelectedImages = new Map(prevState);
  
      if (newSelectedImages.has(imageId)) {
        newSelectedImages.delete(imageId); // Désélectionner
      } else {
        newSelectedImages.set(imageId, selectedSkills); // Associer à toutes les catégories sélectionnées
      }
  
      return newSelectedImages;
    });
  };
  
  
  

  const handleValidateCategory = async () => {
    try {
      
      const categoryAssignments = Array.from(selectedImages.entries()).map(
        ([imageId, categories]) => ({
          id_image: Number(imageId),
          categories: categories.map(cat => Number(cat.id)), // convertit les id en nombres
        })
      );
  
      const result = await updateImageCategories(token, categoryAssignments);
  
      if (result.statusCode !== 200) {
        toast.error(result.message || "Erreur lors de la mise à jour.");
      } else {

      // ✅ Réinitialiser toutes les sélections et recharger les données
      setSelectedImages(new Map());
      setSelectedSkills([]); // Vider les catégories sélectionnées
      setSelectOptions([]); // Vider les options de sélection
      setIsSelectOpen(false); // Fermer la zone de sélection
      fetchData();
      fetchDataCategory();
        toast.success("Catégories mises à jour avec succès !");
      }
    } catch (error) {
      console.error("Erreur dans handleValidateCategory:", error);
      toast.error("Une erreur inattendue est survenue.");
    }
  };

  // const handleValidateCategory = async () => {
  //   try {
  //     const categoryAssignments = Array.from(selectedImages.entries()).map(([imageId, categoryId]) => ({
  //       id_image: Number(imageId),
  //       categories: [categoryId], // mettre le nombre dans un tableau
  //     }));
      

  //     console.log('Catégories à valider:', categoryAssignments);
  //     const result = await updateImageCategories(token, categoryAssignments);
      
  //     if (result.statusCode !== 200) {
  //       toast.error(result.message || "Erreur lors de la mise à jour.");
  //     } else {
  //       toast.success("Catégories mises à jour avec succès !");
  //       setCategories(result.data); // seulement si result.data contient les nouvelles catégories
  //     }
  //   } catch (error) {
  //     console.error("Erreur dans handleValidateCategory:", error);
  //     toast.error("Une erreur inattendue est survenue.");
  //   }
  // };
  

  return (
    <div>

      <div className="space-y-4 mb-6">
        {/* Ligne supérieure */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 w-full">
          {/* Bouton de gauche */}
          <Button onClick={handleOpenSelect} className="w-full md:w-lg">Catégoriser la galerie</Button>
          {/* Date picker */}
          <div className="w-full md:max-w-sm">
            <CalendarDateRangePicker className="w-full" onDateChange={handleDateRangeChange} />
          </div>
        </div>

        {/* Section inférieure affichée seulement si isSelectOpen */}
        {isSelectOpen && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 w-full">
            {/* MultiSelect */}
            <div className="flex-1 w-full">
              <MultiSelect options={selectOptions}
                selected={selectedSkills}
                onChange={setSelectedSkills}
                placeholder="Select skills..."
              />
            </div>

            {/* Bouton Valider */}
            {selectedImages.size > 0 && (
              <Button onClick={handleValidateCategory} className="w-full md:w-auto shrink-0">
                Valider
              </Button>
            )}
          </div>
        )}
      </div>


      {isDataEmpty ? (

        <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-auto">
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>

      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-6">
            {dataImages.map((item, index) => (
              <div key={index} className="relative flex flex-col gap-4">

                <div className="bg-muted rounded-md aspect-video mb-0 relative group transition duration-300">
                  <img src={`${getBaseUrlImg()}/${item.files_gallerie_images}`} alt="image" width={500} height={300}
                    className="object-cover rounded-md cursor-pointer"/>

                  {/* Overlay visible si l’image est sélectionnée */}
                  {selectedImages.has(item.id_gallerie_images) && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md z-0 transition-opacity duration-300" />
                  )}

                  {/* Overlay pour les actions au hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center space-x-2 z-0">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105 flex items-center space-x-2">
                      <Trash size={16} />
                    </button>

                    <button
                      onClick={() => handleImageClick(`${getBaseUrlImg()}/${item.files_gallerie_images}`)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105 flex items-center space-x-2"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {selectedSkills.length > 0 && (
                  <div className="flex items-center mt-2">
                    <Checkbox checked={selectedImages.has(item.id_gallerie_images)} onCheckedChange={() => handleCheckboxChange(item.id_gallerie_images)} />
                    <Label className="ml-2">Sélectionner</Label>
                  </div>
                )}

              </div>
            ))}
          </div>

          <PaginationComponent
            currentPage={currentPage}
            lastPage={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <ImageUploadDialog open={isDialogOpen} onOpenChange={onDialogOpenChange} fetchData={fetchData} />
      <ImagePreviewDialog imageUrl={imageLink} open={dialogOpen} onOpenChange={handleCloseDialog} />
      <Toaster />
    </div>
  );
}
