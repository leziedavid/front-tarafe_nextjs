
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Suspense } from 'react';
import GallerieListingPage from './_components/gallerie-listing';
import { Button } from '@/components/ui/button';

export const metadata = {  title: 'Dashboard: produits'};

export default function Page() {

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading title="Gallerie"  description="Gérer la gallerie (fonctionnalités de la table côté serveur)." />
          <Button variant="secondary" size="sm">
              ＋ Add New Todo
        </Button>
        </div>

        <Separator />
        <GallerieListingPage />
      </div>
    </PageContainer>
  );
}
