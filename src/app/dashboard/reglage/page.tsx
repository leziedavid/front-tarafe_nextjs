// Ajoutez cette ligne en haut du fichier
'use client';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Suspense, useState } from 'react';
import ReglageListingPage from './_components/reglage-listing';

// export const metadata = { title: 'Dashboard: produits' };

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Cette fonction sera passée à reglageListingPage
  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  return (
    <PageContainer>
      <div className="space-y-4">

        <Separator />
        <Suspense fallback={<div>Loading...</div>}>
          <ReglageListingPage isDialogOpen={isDialogOpen} onDialogOpenChange={handleDialogOpenChange} /> {/* Passer la fonction ici */}
        </Suspense>
      </div>
    </PageContainer>
  );
}
