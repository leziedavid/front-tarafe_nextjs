'use client';

import AddImageDialog from '@/components/Dialog/AddImageDialog';
import FormDialog from '@/components/Dialog/FormDialog';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Realisation } from '@/interfaces/HomeInterface';
import { Edit, MoreHorizontal, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SetStateAction, useState } from 'react';

interface CellActionProps {
  data: Realisation;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [code, setCode] = useState("");
  const [editData, setEditData] = useState<Realisation | null>(null); // Corrigé le nom de la variable
  const router = useRouter();
  const [isDialogImgOpen, setIsDialogImgOpen] = useState(false);

  const [isActive, setIsActive] = useState(data.statut_realisations === "1");  // Convertir en booléen (true/false)

  // Fonction pour gérer le changement de statut
  const handleSwitchToggle = (newState: boolean) => {
    setIsActive(newState);
    // Convertir le statut en string avant de l'envoyer
    const updatedStatus = newState ? "1" : "0";  // Convertir true/false en "1"/"0"
    handleSwitchChange(data.id_realisations, updatedStatus);
  };

  // Fonction pour envoyer l'état mis à jour au backend
  const handleSwitchChange = (id: number, newStatus: string) => {
    // Exemple d'appel API pour mettre à jour le statut
    fetch(`/api/update-status/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ statut_realisations: newStatus }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Statut mis à jour:', data);
      })
      .catch(error => {
        console.error('Erreur de mise à jour du statut:', error);
      });
  };


  const onDialogImgOpenChange = (open: boolean) => {
    setIsDialogImgOpen(open);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Cette fonction sera passée à GallerieListingPage
  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };


  const DialogOpenChange = (open: boolean,data: Realisation) => {
    setEditData(data);
    handleDialogOpenChange(open);
  };

  const DialogOpenImges = (open: boolean,id: number,codes:string) => {
    setId(id);
    setCode(codes);
    onDialogImgOpenChange(open);
  };

  
  const onConfirm = async () => {};

  return (
    
    <>

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

    <FormDialog open={isDialogOpen} onOpenChange={handleDialogOpenChange} datas={editData} />

    <AddImageDialog open={isDialogImgOpen} id={id} code={code} onOpenChange={onDialogImgOpenChange} />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* onClick={() => router.push(`/dashboard/product/${data.id_realisations}`)}/ */}

          {/* Option pour activer/désactiver */}
          <DropdownMenuItem>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isActive}  // Lier au statut (true ou false)
                onCheckedChange={handleSwitchToggle}  // Appeler la fonction de gestion du changement
                className={`${isActive ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className={`${isActive ? 'translate-x-5' : 'translate-x-0'} inline-block h-4 w-4 transform rounded-full bg-white transition`}/>
              </Switch>
              <Label htmlFor="airplane-mode" className='font-medium'>{isActive ? 'Produit en ligne' : ' Produit désactiver'}</Label>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem  onClick={() => DialogOpenImges(true,data.id_realisations,data.code_realisation)}>
            <Plus className="mr-2 h-4 w-4" /> Images sur le produit
          </DropdownMenuItem>

          <DropdownMenuItem  onClick={() => DialogOpenChange(true,data)}>
            <Edit className="mr-2 h-4 w-4" /> Update le produit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete le produit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  );
};
