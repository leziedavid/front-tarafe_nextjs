'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Order } from '@/interfaces/AdminInterface';

export const columns: ColumnDef<Order>[] = [
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

