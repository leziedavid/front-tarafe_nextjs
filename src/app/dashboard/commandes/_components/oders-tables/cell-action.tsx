"use client";

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ApiDataOders, Order ,OrderDetails} from '@/interfaces/AdminInterface';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '@/servives/useAuth';
import { getdetailCommandes } from '@/servives/AdminService';
import { OrderDetailsSheet } from '@/app/_components/OrderDetailsSheet';

interface CellActionProps {
  data: Order;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]); // Stocker les détails de la commande
  // const [response, setResponse] = useState<TrajetResponse | null>(null);

  const router = useRouter();
  const token = useAuth();  // Récupérer le token à l'aide du hook

  // Fonction pour récupérer les détails de la commande et ouvrir le modal

  const openOrderDetails = async (orderId: number) => {
    setLoading(true);
    try {
      const details = await getdetailCommandes(token, orderId);
      // Extraire la propriété 'data' de la réponse de l'API avant de la stocker
      setOrderDetails(details.data); // Maintenant, tu passes un tableau (details.data.data)@
      setOpens(true); // Ouvre le modal
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de la commande:", error);
    } finally {
      setLoading(false);
    }
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
          <DropdownMenuItem onClick={() => openOrderDetails(data.id_orders)}>
            <Edit className="mr-2 h-4 w-4" /> Voir Détails
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Affichage du composant OrderDetailsSheet dans un modal */}
      <OrderDetailsSheet
        isOpens={opens}
        datas={orderDetails} // Passe les données de la commande ici
        onClose={() => setOpens(false)}
      />
    </>
  );
};
