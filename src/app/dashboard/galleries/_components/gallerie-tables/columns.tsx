
'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { Realisation } from '@/interfaces/HomeInterface';
import { getBaseUrlImg } from '@/servives/baseUrl';
import { Badge } from '@/components/ui/badge';



export const columns: ColumnDef<Realisation>[] = [
  // {
  //   accessorKey: 'id_realisations',
  //   header: 'ID Realisation'
  // },

  {
    accessorKey: 'images_realisations',
    header: 'Images',
    cell: ({ row }) => {
      const imageUrl = row.getValue('images_realisations') as string | undefined; // Cast du type
      const imageAlt = row.getValue('libelle_realisations') as string;
      return (
        <div className="relative w-20 h-20"> {/* Taille de la miniature 24x24 (taille ajustable) */}
          {imageUrl ? (
            <img
              src={`${getBaseUrlImg()}/${imageUrl}`}
              alt={imageAlt}
              className="object-cover w-full h-full rounded-lg"
              style={{ objectFit: 'cover' }} // Assure la couverture sans déformation
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
    accessorKey: 'statut_realisations',
    header: 'Statut',
    cell: ({ row }) => {
      const statut = row.getValue('statut_realisations');
      return (
        <Badge
          variant={statut === 0 ? 'destructive' : 'outline'} // Badge rouge (destructive) si statut = 0, sinon "default"
          className="uppercase"
        >
          {statut === 0 ? 'Produit en attente' : 'Produit publié'}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive');
      return (
        <Badge
          variant={isActive === 1 ? 'secondary' : 'default'} // Badge secondaire (secondary) si isActive = 1, sinon "default"
          className="uppercase"
        >
          {isActive === 1 ? 'Produit en vedette' : 'Produit inactif'}
        </Badge>
      );
    }
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
    header: 'Actions',
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

