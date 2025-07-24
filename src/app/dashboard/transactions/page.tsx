

'use client';

import { Searchs } from "@/components/layout2/dash/searchs";
import { DataTable } from "@/components/table/dataTable";
import { Order, OrderDetails } from "@/interfaces/AdminInterface";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import { deleteTransaction, getAllorders, getdetailCommandes } from "@/servives/AdminService";
import useAuth from '@/servives/useAuth';
import { toast } from "sonner";
import { columns as TransactionColumns } from "@/components/table/Columns/TransactionColumns";
import OrderModal from "@/components/Modals/OrderModal";

import { useState, useEffect, useTransition } from 'react';
import { CategorieTransaction, TotalTransaction, Transaction, GraphData } from '@/interfaces/AdminInterface'; // Assurez-vous d'importer le type `Order` si nécessaire
import { DataTable as TransactionsTable } from '@/components/ui/table/data-table'; // Composant du tableau des commandes
import { Toaster } from "@/components/ui/sonner";
import { DownloadFiles, getAlltransactions, getAllTransactionTotals, fetchCategorieTransaction, getTransactionDataGraphe } from "@/servives/AdminService";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import ImportData from '@/components/Modals/ImportData';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Label } from '@/components/ui/label';
import { ComboboxSingleSelect } from '@/components/Select2/ComboboxSingleSelect';
import PageContainer from '@/components/layout/page-container';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Download, FileDown } from 'lucide-react';
import { BarGraph } from './bar-graph';
import { AreaGraph } from './area-graph';
import { PieGraph } from './pie-graph';
import CategorieModal from "@/components/Modals/CategorieModal";
import DeleteDialog from "@/components/Modals/DeleteDialog";
import TransacModal from "@/components/Modals/TransacModal";

export default function Page() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);
    const [search, setSearch] = useState(''); // Recherche
    const token = useAuth();
    const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
    // Pour gérer l'ouverture du formulaire en création ou modification
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
    const [donnees, setTransaction] = useState<Transaction[]>([]); // Données des commandes
    const [listecategorie, seListecategorie] = useState<CategorieTransaction[]>([]); // Données des commandes
    const [total, setTotal] = useState<TotalTransaction | null>(null); // Initialiser avec null pour indiquer qu'il n'y a pas encore de données
    const [isLoading, startTransition] = useTransition();

    // Corriger les initialisations des états
    const [category, setCategory] = useState<string | null>(null);
    const [payment, setPayment] = useState<string | null>(null);
    const [selectedYears, setSelectedYears] = useState<string | null>(null);
    const [selectedCategorie, setSelectedCategorie] = useState<string | null>(null);

    const [barGraphByDate, setBarGraphByDate] = useState<GraphData[]>([]);
    const [barGraphByTypeOperation, setBarGraphByTypeOperation] = useState<GraphData[]>([]);
    const [barGraphByCategorieTransactions, setBarGraphByCategorieTransactions] = useState<GraphData[]>([]);

    const [pieGraphByDate, setPieGraphByDate] = useState<GraphData[]>([]);
    const [pieGraphByTypeOperation, setPieGraphByTypeOperation] = useState<GraphData[]>([]);
    const [pieGraphByCategorieTransactions, setPieGraphByCategorieTransactions] = useState<GraphData[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isFormUpdateOpen, setIsUpdateFormOpen] = useState(false);
    const [isAssignFormOpen, setIsAssignFormOpen] = useState(false);
    const [initialValues, setInitialValues] = useState<Transaction>();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);


    // Fonction pour générer les années depuis 2010 jusqu'à l'année actuelle
    const getYears = (): string[] => {
        const currentYear = new Date().getFullYear();
        const years: string[] = []; // Déclare le tableau des années
        for (let year = 2010; year <= currentYear; year++) {
            years.push(year.toString());
        }
        return years;
    };

    // Types de transactions possibles
    const transactionTypes = [
        { value: 'sortie_caisse', label: 'Sortie Caisse' },
        { value: 'sortie_banque', label: 'Sortie Banque' },
        { value: 'entree_caisse', label: 'Entrée Caisse' },
        { value: 'entree_banque', label: 'Entrée Banque' }
    ];

    // Types de paiement possibles
    const paymentTypes = [
        { value: 'wave', label: 'Wave' },
        { value: 'orange Money', label: 'Orange money' },
        { value: 'moov Money', label: 'Moov money' },
        { value: 'espèces', label: 'Espèces' },
        { value: 'chèque', label: 'Chèque' },
        { value: 'virement', label: 'Virement' }
    ];


    const handleCategoryChange = (selected: string | null) => {
        setCategory(selected);
    };

    const handlePaymentChange = (selected: string | null) => {
        setPayment(selected);
    };

    const handleCategorieChange = (selected: string | null) => {
        setSelectedCategorie(selected);
    };

    const handleYearChange = (selected: string | null) => {
        setSelectedYears(selected);
    };
    
    
      // Fonction pour récupérer les données avec les filtres
    const fetchData = async () => { const filters: Filters = {  page: currentPage, limit: 10, search: search || undefined, };
    
        const result = await getAlltransactions(token, filters, category, payment, selectedYears, selectedCategorie);
    
        if (result.statusCode !== 200) {
            toast.error(result.message);
        } else {
          setTransaction(result.data.data); // Mettre à jour les commandes
          setTotalPages(result.data.last_page); // Mettre à jour le nombre total de pages
          setTotalItems(result.data.total); // Mettre à jour le total des commandes
        }
        };

    const handleDialogOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
    };
    
        // Fonction pour récupérer les données des graphiques
    const fetchGraphData = async () => { const filters: Filters = {  page: currentPage, limit: 10, search: search || undefined, // Ajouter la recherche si elle est définie
        };
        try {
            const result = await getTransactionDataGraphe(token, filters, category, payment, selectedYears, selectedCategorie);
            if (result.statusCode === 200) {
                setBarGraphByDate(result.data.BarGraphByDate);
                setBarGraphByTypeOperation(result.data.BarGraphByTypeOperation);
                setBarGraphByCategorieTransactions(result.data.BarGraphByCategorieTransactions);

                setPieGraphByDate(result.data.PieGraphByDate);
                setPieGraphByTypeOperation(result.data.PieGraphByTypeOperation);
                setPieGraphByCategorieTransactions(result.data.PieGraphByCategorieTransactions);
    
            } else {
              toast.error(result.message); // Afficher une erreur si le statut n'est pas 200
            }
            } catch (error) {
                toast.error('Erreur lors de la récupération des données des graphiques.');
            }
        };
    
    const chargerCategories = async (token: string | null) => {
        try {
            const result = await fetchCategorieTransaction(token); // Renomme ici si ton service a un nom différent
            if (result.statusCode !== 200) {
                toast.error(result.message);
            } else {
                seListecategorie(result.data); // Met à jour la liste des catégories
            }
        } catch (error) {
            toast.error("Erreur lors de la récupération des catégories.");
        }
    };

    
    const getTransactionTotal = async () => {
        const filters: Filters = {
            page: currentPage, limit: 10, search: search || undefined, // Ajouter la recherche si elle est définie
        };

        const result = await getAllTransactionTotals(token, filters, category, payment, selectedYears);
        if (result.statusCode !== 200) {
            toast.error(result.message);
        } else {
            setTotal(result.data.totals); // Mettre à jour les commandes
        }
    };

    const Downloads = async () => {
        const filters: Filters = {
            page: currentPage, limit: 10, search: search || undefined, // Ajouter la recherche si elle est définie
        };
    
        const result = await DownloadFiles(token, filters, category, payment, selectedYears);

        if (result && result.statusCode !== 200) {
            toast.error(result.message);

        } else if (result) {
            toast.success("Fichier téléchargé avec succès !");
            window.open(result.data.url, '_blank');
        }
    };


    const isDataEmpty = !donnees || donnees.length <= 0;

    // Callback pour mettre à jour `search` avec la plage de dates sélectionnée
    const handleDateRangeChange = (formattedDateRange: string) => {
        setSearch(formattedDateRange);
    };

    useEffect(() => {
        fetchData();
        fetchGraphData();
        getTransactionTotal();
        chargerCategories(token);
    }, [currentPage, search,category,payment,selectedYears,selectedCategorie]);

    const openOrderDetails = async (orderId: number) => {
        try {
            const details = await getdetailCommandes(token, orderId);
            setOrderDetails(details.data);

        } catch (error) {

        }

    };


    const FormOpens = () => {
        setIsFormOpen(true);
    };

    function closeForm() {
        setIsFormOpen(false);
    }

    // Gestion des actions (peut-être adapté selon ta logique)
    function handleChangeState(row: any, newStates: string[]) {
        alert(`Change state of ${row.id} to ${newStates.join(", ")}`);
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


    function handleUpdate(row:any) {
        setIsUpdateFormOpen(true);
        setInitialValues(row)
    }

    function closehandleUpdate() {
        setIsUpdateFormOpen(false);
    }
    async function handleDelete(row: any) {
        setSelectedId(row.id);
        setDialogOpen(true);
    }


        const handleDeleteClick = async (id: string): Promise<void> => {

            const result = await deleteTransaction(token, Number(id));
            if (result.statusCode !== 200) {
                toast.error(result.message);
                fetchData();
            } else {
                toast.success("Transaction supprimé avec succès !");
                fetchData();
            }
        };

    return (


        <div className="w-full overflow-x-auto">
            <>


                <div className="flex items-center gap-4">

                    <Button variant="secondary" size="sm" onClick={() => FormOpens()}>
                        Gérer les catégories de transactions
                    </Button>

                    <Button variant="secondary" size="sm" onClick={() => handleDialogOpenChange(true)}>
                        <FileDown className="w-4 h-4 mr-2" />
                        Importer en (excel, csv..)
                    </Button>
                </div>

                <div className="grid w-full gap-4 mt-4">

                    {/* Section des critères avec grille responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        <div>
                            <Label className="font-bold mt-4" htmlFor="years">Par années</Label>
                            <ComboboxSingleSelect
                                options={getYears().map(year => ({ value: year, label: year }))}
                                selectedItem={selectedYears}  // Utilisation de selectedItem (singulier)
                                onSelectionChange={handleYearChange}  // gère la sélection d'un seul item
                                labelExtractor={(item) => item.label}
                                valueExtractor={(item) => item.value}
                                placeholder="Sélectionner une année"
                            />
                        </div>

                        {/* Sélecteur de types de transaction */}
                        <div>
                            <Label className="font-bold mt-4" htmlFor="category">Types de transaction</Label>
                            <ComboboxSingleSelect
                                options={transactionTypes}
                                selectedItem={category}  // Utilisation de selectedItem (singulier)
                                onSelectionChange={handleCategoryChange}  // gère la sélection d'un seul item
                                labelExtractor={(item) => item.label}
                                valueExtractor={(item) => item.value}
                                placeholder="Sélectionner un type de transaction"
                            />
                        </div>

                        <div>
                            <Label className="font-bold mt-4" htmlFor="payment">Moyen de paiement</Label>
                            <ComboboxSingleSelect
                                options={paymentTypes}
                                selectedItem={payment}  // Utilisation de selectedItem (singulier)
                                onSelectionChange={handlePaymentChange}  // gère la sélection d'un seul item
                                labelExtractor={(item) => item.label}
                                valueExtractor={(item) => item.value}
                                placeholder="Sélectionner un type de paiement"
                            />
                        </div>


                        <div>
                            <Label className="font-bold mt-4" htmlFor="categorie">Catégorie de transaction</Label>
                            <ComboboxSingleSelect
                                options={listecategorie.map(cat => ({ value: cat.id, label: cat.label }))}
                                selectedItem={selectedCategorie}
                                onSelectionChange={handleCategorieChange}
                                labelExtractor={(item) => item.label}
                                valueExtractor={(item) => item.label}
                                placeholder="Sélectionner une catégorie"
                            />
                        </div>


                        <div>
                            <Label className="font-bold mt-4" htmlFor="payment">Par tranche de date</Label>
                            <CalendarDateRangePicker className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse', 'mb-4')} onDateChange={handleDateRangeChange} />
                        </div>

                    </div>

                </div>

                <div className="space-y-2 mt-4 mb-2">

                    <Tabs defaultValue="overview" className="space-y-4">

                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card className="bg-green-700 text-white">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Solde Caisse
                                        </CardTitle>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{total ? total.total_general.toLocaleString() : 0} FCFA</div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium"> Total Entrée Caisse</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">  {total ? total.total_entree_caisse.toLocaleString() : 0}  FCFA</div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Sortie Caisse
                                        </CardTitle>

                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{total ? total.total_sortie_caisse.toLocaleString() : 0} FCFA</div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Sortie Banque
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold"> {total ? total.total_sortie_banque.toLocaleString() : 0}  FCFA</div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Entrée Banque
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold"> {total ? total.total_entree_banque.toLocaleString() : 0}  FCFA</div>
                                    </CardContent>
                                </Card>

                            </div>
                        </TabsContent>

                    </Tabs>


                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        {barGraphByDate?.length > 0 ? (
                            <BarGraph data={barGraphByDate} title="Graphique par date" types="date" />
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Skeleton className="bg-muted rounded-md aspect-square" />
                            </div>
                        )}

                        {barGraphByTypeOperation?.length > 0 ? (
                            <BarGraph data={barGraphByTypeOperation} title="Graphique par type d'opération" types="operation" />
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Skeleton className="bg-muted rounded-md aspect-square" />
                            </div>
                        )}

                        {barGraphByCategorieTransactions?.length > 0 ? (
                            <BarGraph data={barGraphByCategorieTransactions} title="Graphique par catégories" types="categories" />
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Skeleton className="bg-muted rounded-md aspect-square" />
                            </div>
                        )}

                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {pieGraphByDate?.length > 0 ? (
                            <PieGraph data={pieGraphByDate} title="Graphique à secteurs par date" />
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Skeleton className="bg-muted rounded-md aspect-square" />
                            </div>
                        )}

                        {pieGraphByTypeOperation?.length > 0 ? (
                            <PieGraph data={pieGraphByTypeOperation} title="Graphique à secteurs par type d'opération" />
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Skeleton className="bg-muted rounded-md aspect-square" />
                            </div>
                        )}

                        {pieGraphByCategorieTransactions?.length > 0 ? (
                            <PieGraph data={pieGraphByCategorieTransactions} title="Graphique à secteurs par catégories" />
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Skeleton className="bg-muted rounded-md aspect-square" />
                            </div>
                        )}
                    </div>


                    <div className="flex items-center justify-between">
                        <Heading title="Exporter le tableau en excel" description="" />
                        <Button onClick={Downloads} variant="secondary" size="sm" > <Download className='w-4 h-4' /> Exporter</Button>
                    </div>

                </div>


                {isDataEmpty ? (

                    <DataTableSkeleton columnCount={5} rowCount={10} />

                ) : (

                    <DataTable columns={TransactionColumns}
                        data={donnees}
                        onChangeState={handleChangeState}
                        onUpdateData={handleUpdate}
                        onDeleteData={handleDelete}
                        onNextPage={handleNextPage}          // optionnel : gère la page suivante
                        onPreviousPage={handlePreviousPage}  // optionnel : gère la page précédente
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={limit} />
                )}

                {isFormOpen && (
                    <CategorieModal isOpen={isFormOpen} onClose={closeForm} />
                )}

                {isFormUpdateOpen && (
                    <TransacModal isOpen={isFormUpdateOpen} onClose={closehandleUpdate} fetchData={fetchData} initialValues={initialValues} />
                )}
                
                {isDialogOpen && (
                    <ImportData open={isDialogOpen} onOpenChange={handleDialogOpenChange} />
                )}

                <DeleteDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onConfirm={() => {  if (selectedId) handleDeleteClick(selectedId);}}/>
                
                <Toaster />

            </>
        </div>

    );
}