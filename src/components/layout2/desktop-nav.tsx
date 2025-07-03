'use client';

import Link from 'next/link';
import Image from 'next/image';
import {PanelLeft,Home,ShoppingCart,CreditCard,Package,LayoutGrid,Image as ImageIcon,MessageCircle,Settings,KanbanSquare,} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { NavItem } from './dash/nav-item';

export default function DesktopNav({
    collapsed,
    setCollapsed,
}: {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}) {
    // Définition du menu ici directement
    const navItems = [
        {
            id: 'orders',
            label: 'Commandes',
            href: '/dashboard/commandes',
            icon: ShoppingCart,
        },
        {
            id: 'transactions',
            label: 'Transactions',
            href: '/dashboard/transactions',
            icon: CreditCard,
        },
        {
            id: 'products',
            label: 'Produits',
            href: '/dashboard/product',
            icon: Package,
        },
        {
            id: 'categories',
            label: 'Catégories',
            href: '/dashboard/categorie',
            icon: LayoutGrid,
        },
        {
            id: 'galleries',
            label: 'Galleries',
            href: '/dashboard/galleries',
            icon: ImageIcon,
        },
        {
            id: 'messages',
            label: 'Messages',
            href: '/dashboard/messages',
            icon: MessageCircle,
        },
        {
            id: 'settings',
            label: 'Réglages',
            href: '/dashboard/reglage',
            icon: Settings,
        },
    ];

    return (
        <aside className={`fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'} sm:flex`} >
            <div className="flex justify-between p-2">
                <Link href="/" className="flex h-10 w-10 justify-center rounded-full bg-primary text-primary-foreground" >
                    <Image src="/logo/Logo-Tarafé-slogan-principal.png" width={36} height={36} alt="Logo" className="overflow-hidden rounded-full object-cover" />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground" >
                    <PanelLeft className="h-5 w-5" />
                </Button>
            </div>

            <nav className="flex flex-col gap-4 px-2 sm:py-5">
                {/* Item fixe pour le dashboard */}
                <NavItem href="/dashboard/compte" label="Dashboard" collapsed={collapsed}>
                    <Home className="h-5 w-5" />
                </NavItem>

                {/* Items dynamiques */}
                {navItems.map((item) => (
                    <NavItem key={item.id} href={item.href} label={item.label} collapsed={collapsed}>
                        <item.icon className="h-5 w-5" />
                    </NavItem>
                ))}
            </nav>
            
        </aside>
    );
}
