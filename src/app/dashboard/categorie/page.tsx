

'use client';

import { Searchs } from "@/components/layout2/dash/searchs";
import { DataTable } from "@/components/table/dataTable";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import { deleteCategory, geAllCategorie, getAllorders, getdetailCommandes } from "@/servives/AdminService";
import { useEffect, useState, useTransition } from "react";
import useAuth from '@/servives/useAuth';
import { toast, Toaster } from "sonner";
import { columns as CategorieColumns } from "@/components/table/Columns/CategorieColumns";
import OrderModal from "@/components/Modals/OrderModal";
import { OptionRealisation } from "@/interfaces/HomeInterface";
import CategoryUploadDialog from "@/components/Modals/CategoryUploadDialog";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/Modals/DeleteDialog";


export default function Page() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [search, setSearch] = useState(''); // Recherche
    const token = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
    const [CategoriesData, setCategoriesData] = useState<OptionRealisation[]>([]); // Données des commandes
    const [isLoading, startTransition] = useTransition();
    const [etapes, setEtapes] = useState(false);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [options, setOption] = useState<OptionRealisation | null>(null);
    
        // pour la supression
    const [deleteDialog, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    // Fonction pour récupérer les données avec les filtres
    const fetchData = async () => {

        const filters: Filters = { page: currentPage, limit: 10, search: search || undefined, };

        const result = await geAllCategorie(token, filters);

        if (result.statusCode !== 200) {
            toast.error(result.message);

        } else {
            setCategoriesData(result.data.data);
            setCurrentPage(result.data.last_page);
            setTotalItems(result.data.total);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [currentPage, search]);


    function handleUpdate(row: any) {
        setOption(row);
        setCategoryId(row.id_option_reaalisation);
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
    }

    const onDialogOpenChange = (open: boolean) => {
        setIsFormOpen(open);
        setOption(null);
    };

    // Gestion des actions (peut-être adapté selon ta logique)
    function handleChangeState(row: any, newStates: string[]) {
        alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
    }

    function handleDelete(row: any) {
        setSelectedId(row.id_option_reaalisation);
        setDialogOpen(true);
    }


    const handleDeleteClick = async (id: string): Promise<void> => {

        const result = await deleteCategory(token, Number(id));
        if (result.statusCode !== 200) {
            toast.error(result.message);
            fetchData();
        } else {
            toast.success("Produit supprimé avec succès !");
            fetchData();
        }
    };


    function handleNextPage() {
        if (currentPage < Math.ceil(totalItems / limit)) {
            setCurrentPage(currentPage + 1);
        } else {
            alert("Vous êtes déjà sur la dernière page.");
        }
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            alert("Vous êtes déjà sur la première page.");
        }
    }

    return (


        <div className="w-full overflow-x-auto">
            <>

                <div className="flex items-center gap-4 mb-4">
                    <Button variant="secondary" size="sm" onClick={() => onDialogOpenChange(true)} > ＋  Nouvelles catégorie </Button>
                </div>

                <Searchs search={search} setSearch={setSearch} />

                <DataTable
                    columns={CategorieColumns}
                    data={CategoriesData}
                    onChangeState={handleChangeState}
                    onUpdateData={handleUpdate}
                    onDeleteData={handleDelete}
                    onNextPage={handleNextPage}          // optionnel : gère la page suivante
                    onPreviousPage={handlePreviousPage}  // optionnel : gère la page précédente
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={limit}
                />

                <DeleteDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onConfirm={() => {  if (selectedId) handleDeleteClick(selectedId);}}/>
                <CategoryUploadDialog open={isFormOpen} onOpenChange={onDialogOpenChange} categoryId={categoryId} datas={options}  fetchData={fetchData} />
                <Toaster />

            {/* {isFormOpen && (
                <OrderModal isOpen={isFormOpen} onClose={closeForm} Data={CategoriesData} />
            )} */}

            </>
        </div>

    );
}