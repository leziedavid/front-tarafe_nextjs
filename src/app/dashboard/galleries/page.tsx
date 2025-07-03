

'use client';

import { Searchs } from "@/components/layout2/dash/searchs";
import { DataTable } from "@/components/table/dataTable";
import { GalleryCategory, Order, OrderDetails } from "@/interfaces/AdminInterface";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import { deleteGalleryImage, fetchGalleryCategory, getAllorders, getdetailCommandes, updateImageCategories } from "@/servives/AdminService";
import { useEffect, useState, useTransition } from "react";
import useAuth from '@/servives/useAuth';
import { toast, Toaster } from "sonner";
import { columns as OrderColumns } from "@/components/table/Columns/OrderColumns";
import OrderModal from "@/components/Modals/OrderModal";
import { GallerieImage, GallerieImagesResponse } from "@/interfaces/HomeInterface";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { MultiSelect } from "@/components/Select2/MultiSelect";
import { Skeleton } from "@/components/ui/skeleton";
import { getBaseUrlImg } from "@/servives/baseUrl";
import { ChevronLeft, ChevronRight, Eye, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { getAllImagesGallery } from "@/servives/HomeService";
import ImageUploadDialog from "@/components/Modals/ImageUploadDialog";
import ImagePreviewDialog from "@/components/Modals/ImagePreviewDialog";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteDialog from "@/components/Modals/DeleteDialog";


export default function Page() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(50);
    const itemsPerPage = limit; // pour affichage dans l’UI

    const [ordersData, setOrdersData] = useState<Order[]>([]);
    const [search, setSearch] = useState(''); // Recherche
    const token = useAuth();
    const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);


    const [isLoading, startTransition] = useTransition();
    const [dataImages, setImage] = useState<GallerieImage[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [imageLink, setImageLink] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<GalleryCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<Map<string, { id: string; libelle: string }[]>>(new Map());
    const [selectedSkills, setSelectedSkills] = useState<{ id: string; libelle: string }[]>([]);
    const [selectOptions, setSelectOptions] = useState<{ id: string; libelle: string }[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [deleteDialog, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const onDialogOpenChange = (open : boolean) => {
        setIsDialogOpen(open);
    };

    const fetchData = async () => {
        const filters: Filters = { page: currentPage, limit: 10, search: search || undefined, };
        const result: ApiResponse<GallerieImagesResponse> = await getAllImagesGallery(token, filters);

        if (result.statusCode !== 200) {
            toast.error(result.message);
        } else {
            setImage(result.data.data.data);
            setTotalPages(result.data.data.last_page);
            setTotalItems(result.data.data.total); // Mettre à jour le total des commandes
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

    useEffect(() => {
        fetchData();
        fetchDataCategory();
    }, [currentPage, search]);

    const handleOpenSelect = () => {
        setIsSelectOpen(prevState => !prevState);
    };

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

            if (result.statusCode == 201) {
                setSelectedImages(new Map());
                setSelectedSkills([]); // Vider les catégories sélectionnées
                setSelectOptions([]); // Vider les options de sélection
                setIsSelectOpen(false); // Fermer la zone de sélection
                fetchData();
                fetchDataCategory();
                toast.success("Catégories mises à jour avec succès !");

            } else {
                toast.error(result.message || "Erreur lors de la mise à jour.");
            }
        } catch (error) {
            console.error("Erreur dans handleValidateCategory:", error);
            toast.error("Une erreur inattendue est survenue.");
        }
    };

    function handleUpdate(row: any) {
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
    }

    // Gestion des actions (peut-être adapté selon ta logique)
    function handleChangeState(row: any, newStates: string[]) {
        alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
    }

    async function handleDelete(id: string) {
        const result = await deleteGalleryImage(token, Number(id));
        if (result.statusCode !== 200) {
            toast.error(result.message);
                fetchData();
                fetchDataCategory();
        } else {
            toast.success("Image supprimée avec succès !");
            fetchData();
        }
    }

    function handleValidate(row: any, val: string | number) {
        alert(`Validate ${row.id} with value: ${val}`);
    }

    function onPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }

    function onNextPage() {
        if (currentPage < Math.ceil(totalItems / limit)) {
            setCurrentPage((prev) => prev + 1);
        }
    }

    return (

        <div className="w-full overflow-x-auto">
            <>

                <div className="flex items-center gap-4">
                    <Button variant="secondary" size="sm" onClick={() => onDialogOpenChange(true)} > ＋  Ajouter de nouvelles images </Button>
                    <Button onClick={handleOpenSelect} className="">Catégoriser la galerie</Button>
                </div>

                <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 w-full">
                    <div className="w-full md:max-w-sm">
                        <CalendarDateRangePicker className="w-full" onDateChange={handleDateRangeChange} />
                    </div>
                </div>

                {/* Section inférieure affichée seulement si isSelectOpen */}
                {isSelectOpen && (
                    <div className=" mt-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 w-full">
                        {/* MultiSelect */}
                        <div className="flex-1 w-full">
                            <MultiSelect options={selectOptions} selected={selectedSkills} onChange={setSelectedSkills} />
                        </div>

                        {/* Bouton Valider */}
                        {selectedImages.size > 0 && (
                            <Button onClick={handleValidateCategory} className="w-full md:w-auto shrink-0">
                                Valider
                            </Button>
                        )}
                    </div>
                )}

                <div className="mt-10">

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
                                                className="object-cover rounded-md cursor-pointer" />

                                            {/* Overlay visible si l’image est sélectionnée */}
                                            {selectedImages.has(item.id_gallerie_images) && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md z-0 transition-opacity duration-300" />
                                            )}

                                            {/* Overlay pour les actions au hover */}
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center space-x-2 z-0">
                                                <button  onClick={() => { setSelectedId(item.id_gallerie_images); setDialogOpen(true); }} className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105 flex items-center space-x-2">
                                                    <Trash size={16} />
                                                </button>

                                                <button onClick={() => handleImageClick(`${getBaseUrlImg()}/${item.files_gallerie_images}`)}
                                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105 flex items-center space-x-2">
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

                                {/* Pagination */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 py-4">
                                    <div className="text-muted-foreground text-xs sm:text-sm text-center sm:text-left">
                                        Page {currentPage} sur {Math.ceil(totalItems / itemsPerPage)}
                                    </div>
                                    <div className="flex justify-center sm:justify-end space-x-2">
                                        <Button variant="outline" size="sm" onClick={onPreviousPage} disabled={currentPage <= 1} className="text-xs sm:text-sm" >
                                            <ChevronLeft className="h-4 w-4 sm:mr-1" />
                                            <span className="hidden sm:inline">Précédent</span>
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={onNextPage} disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)} className="text-xs sm:text-sm" >
                                            <span className="hidden sm:inline">Suivant</span>
                                            <ChevronRight className="h-4 w-4 sm:ml-1" />
                                        </Button>
                                    </div>
                                </div>


                        </div>
                    )}
            </div>

                {isFormOpen && (
                    <OrderModal isOpen={isFormOpen} onClose={closeForm} Data={orderDetails} />
                )}

                <ImageUploadDialog open={isDialogOpen} onOpenChange={onDialogOpenChange} fetchData={fetchData} />
                <ImagePreviewDialog imageUrl={imageLink} open={dialogOpen} onOpenChange={handleCloseDialog} />
                <DeleteDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onConfirm={() => {  if (selectedId) handleDelete(selectedId);}}/>
                <Toaster />

            </>
        </div>

    );
}

function fetchDataCategory() {
    throw new Error("Function not implemented.");
}
