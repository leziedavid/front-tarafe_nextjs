
// Ajoutez cette ligne en haut du fichier
'use client';


import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Suspense, useState } from 'react';
import ProductListingPage from './_components/product-listing';
import { Button } from '@/components/ui/button';

// export const metadata = {  title: 'Dashboard: produits'};

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
          <Heading title="Liste des produits"  description="Gérer les produits (fonctionnalités de la table côté serveur)." />
          <Button variant="secondary" size="sm"    onClick={() => handleDialogOpenChange(true)} >＋ Produits</Button>
        </div>

        <Separator />
        <ProductListingPage  isDialogOpen={isDialogOpen} onDialogOpenChange={handleDialogOpenChange}/>
      </div>
    </PageContainer>
  );
}
