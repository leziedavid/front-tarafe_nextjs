// Ajoutez cette ligne en haut du fichier
'use client';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Suspense, useState } from 'react';
import GallerieListingPage from './_components/gallerie-listing';
import CategorieGalleryModal from '@/components/modal/categorieGalleryModal';

// export const metadata = { title: 'Dashboard: produits' };

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Cette fonction sera passée à GallerieListingPage
  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading title="Gallerie" description="Gérer la gallerie (fonctionnalités de la table côté serveur)." />
          <Button variant="secondary" size="sm" onClick={() => handleDialogOpenChange(true)} > ＋  Ajouter de nouvelles images </Button>
        </div>

        <CategorieGalleryModal />
        <Separator />
        <Suspense fallback={<div>Loading...</div>}>
          <GallerieListingPage isDialogOpen={isDialogOpen} onDialogOpenChange={handleDialogOpenChange} /> {/* Passer la fonction ici */}
        </Suspense>
      </div>
    </PageContainer>
  );
}
