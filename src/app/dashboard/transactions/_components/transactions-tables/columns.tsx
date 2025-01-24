'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Transaction } from '@/interfaces/AdminInterface';

// Définition des colonnes en utilisant l'interface Transaction
export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id', // Transaction ID
    header: 'Transaction ID',
    cell: ({ row }) => {
      return `TRANS-${row.getValue('id')}`; // Ajouter "TRANS-" avant l'ID
    }
  },
  {
    accessorKey: 'libelle', // Libellé de la transaction
    header: 'Libellé',
    cell: ({ row }) => {
      const libelle = row.getValue('libelle');
      if (typeof libelle === 'string') {
        return libelle.length > 10 ? `${libelle.substring(0, 20)}...` : libelle;
      }
      return ''; // Ou retourner une valeur par défaut si ce n'est pas une chaîne
    }

  },
  {
    accessorKey: 'sortie_caisse', // Montant sorti de la caisse
    header: 'Sortie Caisse'
  },
  {
    accessorKey: 'sortie_banque', // Montant sorti de la banque
    header: 'Sortie Banque'
  },
  {
    accessorKey: 'entree_caisse', // Montant entré dans la caisse
    header: 'Entrée Caisse'
  },
  {
    accessorKey: 'entree_banque', // Montant entré dans la banque
    header: 'Entrée Banque'
  },
  {
    accessorKey: 'date', // Date de la transaction
    header: 'Date',
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue('date'));
      return formattedDate;
    }
  },
  {
    accessorKey: 'type_operation', // Type d'opération
    header: 'Type d\'Opération'
  },
  {
    accessorKey: 'created_at', // Date de création
    header: 'Created At',
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue('created_at'));
      return formattedDate;
    }
  },
  {
    accessorKey: 'updated_at', // Date de mise à jour
    header: 'Updated At',
    cell: ({ row }) => {
      const formattedDate = row.getValue('updated_at') ? formatDate(row.getValue('updated_at')) : 'Non mis à jour';
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
