'use client';


import { useState, useEffect, useTransition } from 'react';
import { DataTable as CategoriesTable } from '@/components/ui/table/data-table'; // Composant du tableau des commandes
import { toast,Toaster } from "sonner"
import { geAllCategorie } from "@/servives/AdminService";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import useAuth from '@/servives/useAuth';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { columns } from './oders-tables/columns';
import { OptionRealisation } from '@/interfaces/HomeInterface';
import CategoryUploadDialog from '@/components/Dialog/CategoryUploadDialog';

type CategorieListingPage = {
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void; // Prop pour gérer l'ouverture du dialog
};

export default function CategorieListingPage({isDialogOpen,onDialogOpenChange}: CategorieListingPage) {


  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const [totalItems, setTotalItems] = useState(0); // Nombre total d'éléments
  const [CategoriesData, setCategoriesData] = useState<OptionRealisation[]>([]); // Données des commandes
  const [search, setSearch] = useState(''); // Recherche
  const [isLoading, startTransition] = useTransition();
  const [etapes, setEtapes]  = useState(false);
  const token = useAuth();

  // Fonction pour récupérer les données avec les filtres
  const fetchData = async () => {

    const filters: Filters = {  page: currentPage, limit: 10, search: search || undefined, };

    const result = await geAllCategorie(token, filters);
    if (result.statusCode !== 200) {
      toast.error(result.message);

    } else {
      setCategoriesData(result.data.data);
      setTotalPages(result.data.last_page);
      setTotalItems(result.data.total);
    }
  };

  // Appeler la fonction fetchData chaque fois que la page courante ou la recherche change
  useEffect(() => {
     fetchData();
  }, [currentPage,search]); // Lors de la modification de la page ou de la recherche, les données seront récupérées à nouveau

  // Appeler la fonction fetchData chaque fois que la page courante ou la recherche change

  // Fonction pour changer la page
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Mettre à jour la page courante
  };
  const isDataEmpty = !CategoriesData || CategoriesData.length <= 0;


  return (
    <div>

      <Input placeholder="Search Category by code..." value={search} onChange={(e) => setSearch(e.target.value)}
        className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse', "mb-6")} />

      {isDataEmpty ? (
        <DataTableSkeleton columnCount={5} rowCount={10} />
      ) : (

        <CategoriesTable
          columns={columns}
          data={CategoriesData}
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}/>
        )}
        <CategoryUploadDialog open={isDialogOpen} onOpenChange={onDialogOpenChange} />
    <Toaster />
    </div>
  );

}
