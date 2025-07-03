

'use client';

import { Searchs } from "@/components/layout2/dash/searchs";
import { DataTable } from "@/components/table/dataTable";
import { Order, OrderDetails } from "@/interfaces/AdminInterface";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import { deleteRealisation, getAllorders, getAllRealisations, getdetailCommandes } from "@/servives/AdminService";
import { use, useEffect, useState, useTransition } from "react";
import useAuth from '@/servives/useAuth';
import { toast, Toaster } from "sonner";
import { columns as ProductColumns } from "@/components/table/Columns/ProductColumns";
import OrderModal from "@/components/Modals/OrderModal";
import { Realisation } from "@/interfaces/HomeInterface";
import { VisibilityState } from "@tanstack/react-table";
import ProductModal from "@/components/Modals/ProductModal";
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
    const [realisationData, setRealisationsData] = useState<Realisation[]>([]); // Données des commandes
    const [isLoading, startTransition] = useTransition();
    const [editData, setEditData] = useState<Realisation | null>(null); // Corrigé le nom de la variable
    const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // pour la supression
    const [deleteDialog, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    // Fonction pour récupérer les données avec les filtres
    const fetchData = async () => {

        const filters: Filters = {
            page: currentPage, limit: 10, search: search || undefined, // Ajouter la recherche si elle est définie
        };

        const result = await getAllRealisations(token, filters);
        if (result.statusCode !== 200) {
            toast.error(result.message);
        } else {
            setRealisationsData(result.data.data); // Mettre à jour les commandes
            setTotalPages(result.data.last_page); // Mettre à jour le nombre total de pages
            setTotalItems(result.data.total); // Mettre à jour le total des commandes
        }

    };

    // Appeler la fonction fetchData chaque fois que la page courante ou la recherche change
    useEffect(() => {
        fetchData();
    }, [currentPage, search]); // Lors de la modification de la page ou de la recherche, les données seront récupérées à nouveau


    // Fonction pour changer la page
    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Mettre à jour la page courante
    };
    const isDataEmpty = !realisationData || realisationData.length <= 0;

    const onDialogOpenChange = (open: boolean) => {
        setIsFormOpen(open);
        setEditData(null)
    }

    function handleUpdate(row: any) {
        setEditData(row)
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
    }

    // Gestion des actions (peut-être adapté selon ta logique)
    function handleChangeState(row: any, newStates: string[]) {
        alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
    }

    function handleDelete(row: any) {
        setSelectedId(row.id_realisations);
        setDialogOpen(true);
    }

    const handleDeleteClick = async (id: string): Promise<void> => {

        const result = await deleteRealisation(token, Number(id));
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
            
                <div className="mt-10 mb-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 w-full">
                    <div className="w-full md:max-w-sm">
                        <Button variant="secondary" size="sm"    onClick={() => onDialogOpenChange(true)} >＋ Produits</Button>
                    </div>
                </div>
                <Searchs search={search} setSearch={setSearch} />

                <DataTable
                    columns={ProductColumns}
                    data={realisationData}
                    onChangeState={handleChangeState}
                    onUpdateData={handleUpdate}
                    onDeleteData={handleDelete}
                    onNextPage={handleNextPage}          // optionnel : gère la page suivante
                    onPreviousPage={handlePreviousPage}  // optionnel : gère la page précédente
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={limit}
                />

                {isFormOpen && (
                    <ProductModal isOpen={isFormOpen} onClose={closeForm} Data={editData ? editData : null} fetchData={fetchData} />
                )}
                <DeleteDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onConfirm={() => {  if (selectedId) handleDeleteClick(selectedId);}}/>
                
                <Toaster />
            </>
        </div>

    );
}