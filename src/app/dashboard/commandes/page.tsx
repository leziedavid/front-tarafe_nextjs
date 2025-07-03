

'use client';

import { Searchs } from "@/components/layout2/dash/searchs";
import { DataTable } from "@/components/table/dataTable";
import { Order, OrderDetails } from "@/interfaces/AdminInterface";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import { getAllorders, getdetailCommandes } from "@/servives/AdminService";
import { useEffect, useState } from "react";
import useAuth from '@/servives/useAuth';
import { toast } from "sonner";
import { columns as OrderColumns } from "@/components/table/Columns/OrderColumns";
import OrderModal from "@/components/Modals/OrderModal";


export default function Page() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [ordersData, setOrdersData] = useState<Order[]>([]);
    const [search, setSearch] = useState(''); // Recherche
    const token = useAuth();
    const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
    // Pour gérer l'ouverture du formulaire en création ou modification
    const [isFormOpen, setIsFormOpen] = useState(false);


    // Fonction pour récupérer les données avec les filtres
    const fetchData = async () => {

        const filters: Filters = {
            page: currentPage, limit: 10, search: search || undefined, // Ajouter la recherche si elle est définie
        };

        const result = await getAllorders(token, filters);
        if (result.statusCode !== 200) {
            toast.error(result.message);
        } else {
            setOrdersData(result.data.data);
            setCurrentPage(result.data.last_page);
            setTotalItems(result.data.total);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, search]);

    const openOrderDetails = async (orderId: number) => {
        try {
            const details = await getdetailCommandes(token, orderId);
            setOrderDetails(details.data);

        } catch (error) {

        }

    };

    function handleUpdate(row: any) {
        // Ouvre le formulaire en mode édition
        openOrderDetails(row.id_orders);
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
        alert(`Delete ${row.id}`);
    }

    function handleValidate(row: any, val: string | number) {
        alert(`Validate ${row.id} with value: ${val}`);
    }

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

                <Searchs search={search} setSearch={setSearch} />

                <DataTable
                    columns={OrderColumns}
                    data={ordersData}
                    onChangeState={handleChangeState}
                    // onUpdateData={handleUpdate}
                    // onDeleteData={handleDelete}
                    // onValidateData={handleValidate}
                    stateOptions={["pending", "processing", "success", "failed"]}
                    onNextPage={handleNextPage}          // optionnel : gère la page suivante
                    onPreviousPage={handlePreviousPage}  // optionnel : gère la page précédente
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={limit}
                />

            {isFormOpen && (
                <OrderModal isOpen={isFormOpen} onClose={closeForm} Data={orderDetails} />
            )}

            </>
        </div>

    );
}