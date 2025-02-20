'use client';


import { useState, useEffect, useTransition } from 'react';
import { DataTable as RealisationTable } from '@/components/ui/table/data-table'; // Composant du tableau des commandes
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { getAllRealisations } from "@/servives/AdminService";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import useAuth from '@/servives/useAuth';
import { columns } from './product-tables/columns';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { Realisation } from '@/interfaces/HomeInterface';
import FormDialog from '@/components/Dialog/FormDialog';


type RealisationListingPage = {
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void; // Prop pour gérer l'ouverture du dialog
};

export default function RealisationListingPage({isDialogOpen,onDialogOpenChange}: RealisationListingPage) {


  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const [totalItems, setTotalItems] = useState(0); // Nombre total d'éléments
  const [realisationData, setRealisationsData] = useState<Realisation[]>([]); // Données des commandes
  const [search, setSearch] = useState(''); // Recherche
  const [isLoading, startTransition] = useTransition();

  const token = useAuth();

  // Fonction pour récupérer les données avec les filtres
  const fetchData = async () => {

    const filters: Filters = {  page: currentPage, limit: 10, search: search || undefined, // Ajouter la recherche si elle est définie
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


  return (
    <div>

      <Input placeholder="Search Produit ..." value={search} onChange={(e) => setSearch(e.target.value)}
        className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse', "mb-6")} />

      {isDataEmpty ? (

        <DataTableSkeleton columnCount={5} rowCount={10} />

      ) : (

        <RealisationTable
          columns={columns}
          data={realisationData}
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <FormDialog open={isDialogOpen} onOpenChange={onDialogOpenChange} datas={null} />
      <Toaster />

    </div>


  );

}
