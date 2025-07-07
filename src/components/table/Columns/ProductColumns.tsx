'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { getBaseUrlImg } from '@/servives/baseUrl';
import { updateRealisationsActived, updateRealisationsStatus } from '@/servives/AdminService';
import { Realisation } from '@/interfaces/HomeInterface';


// ✅ Composant pour le switch de statut
const StatutCell: React.FC<{ row: any }> = ({ row }) => {
    const id = row.original.id_realisations;
    const [checked, setChecked] = useState(Number(row.original.statut_realisations) === 1);

    const handleToggle = (value: boolean) => {
        setChecked(value);
        updateRealisationsStatus(id, value ? "1" : "0");
        console.log(`Nouveau statut pour l'id ${id} : ${value ? "Publié" : "En attente"}`);
    };

    return (
        <div className="flex items-center space-x-2">
            <Switch checked={checked} onCheckedChange={handleToggle} id={`statut-${id}`} />
            <Label htmlFor={`statut-${id}`} className="text-xs">
                {checked ? "Publié" : "En attente"}
            </Label>
        </div>
    );
};

// ✅ Composant pour le switch vedette
const VedetteCell: React.FC<{ row: any }> = ({ row }) => {
    const id = row.original.id_realisations;
    const [checked, setChecked] = useState(row.original.isActive === 1);

    const handleToggle = (value: boolean) => {
        setChecked(value);
        updateRealisationsActived(id, value ? "1" : "0");
        console.log(`Nouveau statut vedette pour l'id ${id} : ${value}`);
    };

    return (
        <div className="flex items-center space-x-2">
            <Switch checked={checked} onCheckedChange={handleToggle} id={`vedette-${id}`} />
            <Label htmlFor={`vedette-${id}`} className="text-xs">
                {checked ? "En vedette" : "Non en vedette"}
            </Label>
        </div>
    );
};

// ✅ Déclaration des colonnes
export const columns: ColumnDef<Realisation>[] = [
    {
        accessorKey: 'images_realisations',
        header: 'Images',
        cell: ({ row }) => {
            const imageUrl = row.getValue('images_realisations') as string | undefined;
            const imageAlt = row.getValue('libelle_realisations') as string;

            return (
                <div className="relative w-20 h-20">
                    {imageUrl ? (
                        <Image
                            src={`${getBaseUrlImg()}/${imageUrl}`}
                            alt={imageAlt}
                            className="object-cover w-full h-full rounded-lg"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                            No image
                        </div>
                    )}
                </div>
            );
        }
    },
    {
        accessorKey: 'code_realisation',
        header: 'Code',
        cell: ({ row }) => (
            <span className="uppercase">{row.getValue('code_realisation')}</span>
        )
    },
    {
        accessorKey: 'libelle_realisations',
        header: 'Libellé'
    },
    {
        id: "switch-statut",
        header: "Statut",
        cell: ({ row }) => <StatutCell row={row} />
    },
    {
        id: "switch-vedette",
        header: "Vedette",
        cell: ({ row }) => <VedetteCell row={row} />
    },
    {
        accessorKey: 'created_at',
        header: 'Date de création',
        cell: ({ row }) => formatDate(row.getValue('created_at'))
    },
];


// ✅ Utilitaire pour formater la date
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
