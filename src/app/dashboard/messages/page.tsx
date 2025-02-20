
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import MessagesListingPage from './_components/messages-listing';

export const metadata = {  title: 'Dashboard: Messages'};

export default function Page() {

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading title="Liste des Messages"  description="Gérer les Messages (fonctionnalités de la table côté serveur)." />
        </div>

        <Separator />
        <MessagesListingPage />
      </div>
    </PageContainer>
  );
}
