'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import {Transaction } from '@/interfaces/AdminInterface';

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
        accessorKey: 'created_at',
        header: 'Date de création',
        cell: ({ row }) => {
            const formattedDate = formatDate(row.getValue('created_at'));
            return formattedDate;
        }

    },
];


function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

