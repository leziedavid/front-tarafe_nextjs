'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { getBaseUrlImg } from '@/servives/baseUrl';
import { Checkbox } from '@/components/ui/checkbox';
import { Realisation } from '@/interfaces/HomeInterface';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useState } from 'react';
import { updateRealisationsActived, updateRealisationsStatus } from '@/servives/AdminService';



const StatutCell: React.FC<{ row: any }> = ({ row }) => {
    const initialStatut = Number(row.original.statut_realisations) === 1;
    const id = row.original.id_realisations;

    const [checked, setChecked] = useState(initialStatut);

    const handleToggleStatut = (value: boolean) => {
        setChecked(value);
        console.log("Nouveau statut pour l'id", id, ":", value ? "Publié" : "En attente");
        updateRealisationsStatus(id, value ? "1" : "0");
    };

    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={checked}
                onCheckedChange={handleToggleStatut}
                id={`statut-${id}`}
            />
            <Label htmlFor={`statut-${id}`} className="text-xs">
                {checked ? "Publié" : "En attente"}
            </Label>
        </div>
    );
};

const VedetteCell: React.FC<{ row: any }> = ({ row }) => {
    const initialVedette = row.original.isActive === 1;
    const id = row.original.id_realisations;

    const [checked, setChecked] = useState(initialVedette);

    const handleToggleVedette = (value: boolean) => {
        setChecked(value);
        console.log("Nouveau statut vedette pour l'id", id, ":", value);
        updateRealisationsActived(id, value ? "1" : "0");
    };

    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={checked}
                onCheckedChange={handleToggleVedette}
                id={`vedette-${id}`}
            />
            <Label htmlFor={`vedette-${id}`} className="text-xs">
                {checked ? "En vedette" : "Non en vedette"}
            </Label>
        </div>
    );
};


export const columns: ColumnDef<Realisation>[] = [


    {
        accessorKey: 'images_realisations',
        header: 'Images',
        cell: ({ row }) => {
            const imageUrl = row.getValue('images_realisations') as string | undefined; // Cast du type
            const imageAlt = row.getValue('libelle_realisations') as string;
            return (
                <div className="relative w-20 h-20"> {/* Taille de la miniature 24x24 (taille ajustable) */}
                    {imageUrl ? (
                        <Image src={`${getBaseUrlImg()}/${imageUrl}`}
                            alt={imageAlt}
                            className="object-cover w-full h-full rounded-lg"
                            style={{ objectFit: 'cover' }} // Assure la couverture sans déformation
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

    // ✅ Switch pour publier/annuler
    {
        id: "switch-statut",
        header: "Statut",
        cell: ({ row }) => <StatutCell row={row} />, // ✅ c’est maintenant un composant React

        // cell: ({ row }) => {

        //     const initialStatut = Number(row.original.statut_realisations) === 1;
        //     const id = row.original.id_realisations;

        //     const [checked, setChecked] = useState(initialStatut);

        //     const handleToggleStatut = (value: boolean) => {
        //         setChecked(value); // 👈 Change localement l’état du Switch
        //         console.log("Nouveau statut pour l'id", id, ":", value ? "Publié" : "En attente");
        //         // Optionnel : appel API ici
        //         updateRealisationsStatus(id, value ? "1" : "0");
        //     };

        //     return (
        //         <div className="flex items-center space-x-2">
        //             <Switch
        //                 checked={checked}
        //                 onCheckedChange={handleToggleStatut}
        //                 id={`statut-${id}`}
        //             />
        //             <Label htmlFor={`statut-${id}`} className="text-xs">
        //                 {checked ? "Publié" : "En attente"}
        //             </Label>
        //         </div>
        //     );
        // },
    },

    // ✅ Switch pour vedette ou non
    {
        id: "switch-vedette",
        header: "Vedette",
        cell: ({ row }) => <VedetteCell row={row} />, // ✅ aussi un composant React

        // cell: ({ row }) => {
        //     const initialVedette = row.original.isActive === 1;
        //     const id = row.original.id_realisations;

        //     const [checked, setChecked] = useState(initialVedette);

        //     const handleToggleVedette = (value: boolean) => {
        //         setChecked(value);
        //         console.log("Nouveau statut vedette pour l'id", id, ":", value);
        //         // Optionnel : appel API ici
        //         updateRealisationsActived(id, value ? "1" : "0");

        //     };

        //     return (
        //         <div className="flex items-center space-x-2">
        //             <Switch
        //                 checked={checked}
        //                 onCheckedChange={handleToggleVedette}
        //                 id={`vedette-${id}`}
        //             />
        //             <Label htmlFor={`vedette-${id}`} className="text-xs">
        //                 {checked ? "En vedette" : "Non en vedette"}
        //             </Label>
        //         </div>
        //     );
        // },
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

