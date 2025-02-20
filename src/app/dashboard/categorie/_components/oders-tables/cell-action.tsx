"use client";

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '@/servives/useAuth';
import { OptionRealisation } from '@/interfaces/HomeInterface';
import CategoryUploadDialog from '@/components/Dialog/CategoryUploadDialog';


interface CellActionProps {
  data: OptionRealisation;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [options, setOption] = useState<OptionRealisation | null>(null); // Stocker les détails de la commande
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  
  const token = useAuth();  // Récupérer le token à l'aide du hook
  // Fonction pour récupérer les détails de la commande et ouvrir le modal

  const openOrderDetails = async (data: OptionRealisation) => {
    setLoading(true);
    setOption(data); // Stocker les données de la commande
    onDialogOpenChange(true); // Ouvre le modal
  };

  const onDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const onConfirm = async () => {
    // Gérer la confirmation de suppression de la commande ici
  };


  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
        <CategoryUploadDialog
          open={isDialogOpen}
          onOpenChange={onDialogOpenChange}
          categoryId={data?.id_option_reaalisation}
          datas={options}
        />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* Lien pour voir les détails de la commande */}
          <DropdownMenuItem onClick={() => openOrderDetails(data)}>
            <Edit className="mr-2 h-4 w-4" /> Détails
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  );
};
