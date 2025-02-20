"use client";

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Newsletter} from '@/interfaces/AdminInterface';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '@/servives/useAuth';
import { getdetailCommandes } from '@/servives/AdminService';
import { MessagesSheet } from '@/app/_components/MessagesSheet';


interface CellActionProps {
  data: Newsletter;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [Messages, setMessages] = useState<Newsletter | null>(null); // Stocker les détails de la commande
  // const [response, setResponse] = useState<TrajetResponse | null>(null);

  const router = useRouter();
  const token = useAuth();  // Récupérer le token à l'aide du hook

  // Fonction pour récupérer les détails de la commande et ouvrir le modal

  const openMessages = async (message: Newsletter) => {
    setLoading(true);
    setMessages(message);
    setOpens(true); // Ouvre le modal
  };

  const onConfirm = async () => {
    // Gérer la confirmation de suppression de la commande ici
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
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
          <DropdownMenuItem onClick={() => openMessages(data)}>
            <Edit className="mr-2 h-4 w-4" /> Détails
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Affichage du composant MessagesSheet dans un modal */}
      <MessagesSheet
        isOpens={opens}
        datas={Messages} // Passe les données de la commande ici
        onClose={() => setOpens(false)}
      />
    </>
  );
};
