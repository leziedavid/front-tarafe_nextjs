'use client';

import { useState } from 'react';
import Link from 'next/link';

import {PanelLeft,Home,ShoppingCart,CreditCard,Package,LayoutGrid,Image as ImageIcon,MessageCircle,Settings,KanbanSquare, PanelLeftClose, PanelLeftOpen,} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function MobileNav() {
    const [open, setOpen] = useState(false);

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
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden">
                    {open ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <nav className="flex flex-col gap-2 p-4">
                    {navItems.map((item) => (
                        <Link key={item.id} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary" onClick={() => setOpen(false)} >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
