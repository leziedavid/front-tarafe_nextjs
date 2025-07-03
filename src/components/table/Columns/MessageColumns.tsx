'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { CircleUserRound, LibraryBig } from 'lucide-react';
import { OptionRealisation } from '@/interfaces/HomeInterface';

export const columns: ColumnDef<OptionRealisation>[] = [


    {
        accessorKey: 'newsletters_id', // ID de la newsletter
        header: 'Avatar',
        cell: () => (
            <Avatar>
                <AvatarFallback><CircleUserRound className='w-6 h-6 text-primary' /></AvatarFallback>
            </Avatar>
        )
    },
    {
        accessorKey: 'objets', // Objet de la newsletter
        header: 'Objet du message'
    },
    {
        accessorKey: 'nom_newsletters', // Nom de la newsletter
        header: 'Nom & Prénom'
    },
    {
        accessorKey: 'email_newsletters', // Email de la newsletter
        header: 'Email'
    },
    {
        accessorKey: 'contact_newsletters', // Contact de la newsletter
        header: 'Contact'
    },
    // {
    //   accessorKey: 'texte_newsletters', // Texte de la newsletter
    //   header: 'Texte'
    // },
    {
        accessorKey: 'status_newsletters', // Statut de la newsletter (1 = active, 0 = inactive)
        header: 'Statut',
        cell: ({ row }) => {
            const status = row.getValue('status_newsletters');
            return status === '1' ? 'Active' : 'Inactive'; // Affiche "Active" ou "Inactive" en fonction du statut
        }
    },
    {
        accessorKey: 'created_at', // Date de création de la newsletter
        header: 'Date de Création',
        cell: ({ row }) => {
            const formattedDate = formatDate(row.getValue('created_at'));
            return formattedDate; // Utilisation de la fonction de formatage de la date
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

