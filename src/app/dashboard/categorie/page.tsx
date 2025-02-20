
'use client';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import CategorieListingPage from './_components/categorie-listing';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// export const metadata = {  title: 'Dashboard: Categorie'};

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
          <Heading title="Liste des categories"  description="Gérer les Categories (fonctionnalités de la table côté serveur)." />
          <Button variant="secondary" size="sm" onClick={() => handleDialogOpenChange(true)} >
            ＋ Add New Category
          </Button>

        </div>

        <Separator />
        <CategorieListingPage isDialogOpen={isDialogOpen} onDialogOpenChange={handleDialogOpenChange}  />
      </div>
    </PageContainer>
  );
}
