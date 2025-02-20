'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { CircleUserRound, LibraryBig } from 'lucide-react';
import { OptionRealisation } from '@/interfaces/HomeInterface';

// Liste des colonnes pour le tableau de données des options de réalisation
export const columns: ColumnDef<OptionRealisation>[] = [
  {
    accessorKey: 'id_option_reaalisation', // ID de l'option de réalisation
    header: 'Icon',
    cell: () => (
      <Avatar>
        <AvatarFallback>
          <LibraryBig className="w-6 h-6 text-primary" />
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: 'libelleOption_reaalisation', // Libellé de l'option de réalisation
    header: 'Libellé',
  },
  {
    accessorKey: 'stateOption_reaalisation', // Etat de l'option de réalisation
    header: 'Etat',
    cell: ({ row }) => {
      const state = row.getValue('stateOption_reaalisation');
      return state === 1 ? 'Active' : 'Inactive'; // Affiche "Active" ou "Inactive"
    },
  },
  {
    accessorKey: 'created_at', // Date de création de l'option
    header: 'Date de Création',
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue('created_at'));
      return formattedDate; // Formatage de la date
    },
  },
  {
    id: 'actions', // Colonne pour les actions sur chaque ligne
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

// Fonction de formatage de la date
function formatDate(dateString: string): string {
  const date = new Date(dateString); // Crée un objet Date à partir de la chaîne
  const day = String(date.getDate()).padStart(2, '0'); // Jour avec 2 chiffres
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois avec 2 chiffres
  const year = date.getFullYear(); // Année
  return `${day}-${month}-${year}`; // Retourne la date formatée
}
