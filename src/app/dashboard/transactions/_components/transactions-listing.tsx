'use client';


import { useState, useEffect, useTransition } from 'react';
import { Transaction } from '@/interfaces/AdminInterface'; // Assurez-vous d'importer le type `Order` si nécessaire
import { DataTable as TransactionsTable } from '@/components/ui/table/data-table'; // Composant du tableau des commandes
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { getAlltransactions } from "@/servives/AdminService";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import useAuth from '@/servives/useAuth';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { columns } from './transactions-tables/columns';
import ImportData from '@/components/Dialog/ImportData';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Label } from '@/components/ui/label';
import { ComboboxSingleSelect } from '@/components/Select2/ComboboxSingleSelect';
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TransactionslistePage = {
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void; // Prop pour gérer l'ouverture du dialog
};


export default function TransactionslistePage({isDialogOpen,onDialogOpenChange}: TransactionslistePage) {


  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const [totalItems, setTotalItems] = useState(0); // Nombre total d'éléments
  const [donnees, setTransaction] = useState<Transaction[]>([]); // Données des commandes
  const [search, setSearch] = useState(''); // Recherche
  const [isLoading, startTransition] = useTransition();
  const token = useAuth();

// Corriger les initialisations des états
const [category, setCategory] = useState<string | null>(null);
const [payment, setPayment] = useState<string | null>(null);
const [selectedYears, setSelectedYears] = useState<string | null>(null);

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
  { value: 'Orange Money', label: 'Orange Money' },
  { value: 'Moov Money', label: 'Moov Money' }
];


const handleCategoryChange = (selected: string | null) => {
  setCategory(selected);
};

const handlePaymentChange = (selected: string | null) => {
  setPayment(selected);
};

const handleYearChange = (selected: string | null) => {
  setSelectedYears(selected);
};


  // Fonction pour récupérer les données avec les filtres
  const fetchData = async () => {
    const filters: Filters = {  page: currentPage, limit: 10, search: search || undefined, // Ajouter la recherche si elle est définie
    };

    const result = await getAlltransactions(token, filters);
    if (result.statusCode !== 200) {
      toast.error(result.statusMessage);
    } else {
      setTransaction(result.data.data); // Mettre à jour les commandes
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
  const isDataEmpty = !donnees || donnees.length <= 0;

  // Callback pour mettre à jour `search` avec la plage de dates sélectionnée
  const handleDateRangeChange = (formattedDateRange: string) => {

    setSearch(formattedDateRange);
  };


  return (
    <div>


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
            <Label className="font-bold mt-4" htmlFor="payment">Types de paiement</Label>
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
            <Label className="font-bold mt-4" htmlFor="payment">Par tranche de date</Label>
            <CalendarDateRangePicker className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse', 'mb-6')} onDateChange={handleDateRangeChange} />
          </div>

        </div>

    </div>

      <div className="space-y-2 mt-4 mb-4">
        <Tabs defaultValue="overview" className="space-y-4">

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Sortie Caisse
                  </CardTitle>

                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,231.89 FCFA</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                  Total Sortie Banque
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold"> 2350 FCFA</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium"> Total Entrée Caisse</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold"> 12,234 FCFA</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                  Total Entrée Banque
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573 FCFA</div>
                </CardContent>
              </Card>
            </div>

          </TabsContent>

        </Tabs>
      </div>

      {isDataEmpty ? (

        <DataTableSkeleton columnCount={5} rowCount={10} />

      ) : (

        <TransactionsTable
          columns={columns}
          data={donnees}
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

    <ImportData open={isDialogOpen} onOpenChange={onDialogOpenChange} />

    </div>
  );

}
