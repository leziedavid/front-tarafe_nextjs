
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Suspense } from 'react';
import OrderListingPage from './_components/order-listing';

export const metadata = {  title: 'Dashboard: comnandes'};

export default function Page() {

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading title="Liste des commandes"  description="Gérer les commandes (fonctionnalités de la table côté serveur)." />
          <Link href="/dashboard/product/new" className="flex items-center whitespace-nowrap rounded-md uppercase font-bold text-primary md:text-sm">
            <Plus className="mr-1 h-4 w-4" /> Ajouter
          </Link>
        </div>

        <Separator />
        <OrderListingPage />
      </div>
    </PageContainer>
  );
}
