'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { Realisation } from '@/interfaces/HomeInterface';



export const columns: ColumnDef<Realisation>[] = [
  // {
  //   accessorKey: 'id_orders',
  //   header: 'Order ID'
  // },
  {
    accessorKey: 'transaction_id',
    header: 'Transaction ID'
  },
  {
    accessorKey: 'total',
    header: 'Total'
  },
  {
    accessorKey: 'date_orders',
    header: 'Date',
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue('date_orders'));
      return formattedDate;
    }
  },
  {
    accessorKey: 'heurs_orders',
    header: 'Time'
  },

  {
    accessorKey: 'contact_paiement',
    header: 'Contact'
  },
  {
    accessorKey: 'email_orders',
    header: 'Email'
  },
  {
    accessorKey: 'nomUsers_orders',
    header: 'Nom&Prenom'
  },
  {
    accessorKey: 'status_orders',
    header: 'Status'
  },

  {
    accessorKey: 'created_at',
    header: 'Created At',

    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue('created_at'));
      return formattedDate;
    }

  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

// Fonction de formatage de la date
function formatDate(dateString: string): string {
  const date = new Date(dateString); // Crée un objet Date à partir de la chaîne
  const day = String(date.getDate()).padStart(2, '0'); // Jour avec 2 chiffres
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois avec 2 chiffres (janvier est 0)
  const year = date.getFullYear(); // Année
  return `${day}-${month}-${year}`; // Retourne la date formatée
}

