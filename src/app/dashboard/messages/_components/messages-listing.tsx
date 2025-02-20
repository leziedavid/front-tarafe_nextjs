'use client';


import { useState, useEffect, useTransition } from 'react';
import { Newsletter } from '@/interfaces/AdminInterface'; // Assurez-vous d'importer le type `Newsletter` si nécessaire
import { DataTable as MessagessTable } from '@/components/ui/table/data-table'; // Composant du tableau des commandes
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { geAllMessages } from "@/servives/AdminService";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import useAuth from '@/servives/useAuth';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { columns } from './oders-tables/columns';

type MessagesListingPage = {};

export default function MessagesListingPage({}: MessagesListingPage) {


  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const [totalItems, setTotalItems] = useState(0); // Nombre total d'éléments
  const [MessagessData, setMessagessData] = useState<Newsletter[]>([]); // Données des commandes
  const [search, setSearch] = useState(''); // Recherche
  const [isLoading, startTransition] = useTransition();
  const token = useAuth();

  // Fonction pour récupérer les données avec les filtres
  const fetchData = async () => {

    const filters: Filters = {  page: currentPage, limit: 10, search: search || undefined, };

    const result = await geAllMessages(token, filters);
    if (result.statusCode !== 200) {
      toast.error(result.message);
    } else {
      setMessagessData(result.data.data); // Mettre à jour les commandes
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
  const isDataEmpty = !MessagessData || MessagessData.length <= 0;


  return (
    <div>

      <Input placeholder="Search Messagess by code..." value={search} onChange={(e) => setSearch(e.target.value)}
        className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse', "mb-6")} />

      {isDataEmpty ? (

        <DataTableSkeleton columnCount={5} rowCount={10} />

      ) : (

        <MessagessTable
          columns={columns}
          data={MessagessData}
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

    </div>
  );

}
