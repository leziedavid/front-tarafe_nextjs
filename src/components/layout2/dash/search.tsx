'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Store, Bell } from 'lucide-react';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,} from '@/components/ui/dialog';

export function SearchInput() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<string[]>([
        "Votre commande a été expédiée",
        "Nouvelle promo sur les vêtements",
        "Mise à jour de votre abonnement",
    ]);

    function searchAction(formData: FormData) {
        let value = formData.get('q') as string;
        let params = new URLSearchParams({ q: value });
        startTransition(() => {
            router.replace(`/?${params.toString()}`);
        });
    }


    return (
        <div className="ml-auto flex items-center gap-4 md:grow-0">

            {/* Notifications avec Modal */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="relative ">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Notifications</DialogTitle>
                    </DialogHeader>
                    <ul className="space-y-2 text-sm cursor-pointer">
                        {notifications.map((notif, index) => (
                            <li key={index} className="text-muted-foreground"> • {notif}   </li>
                        ))}
                    </ul>
                </DialogContent>
            </Dialog>

            {/* Texte + Icone Boutique */}
            <div className="flex items-center gap-2 cursor-pointer">
                <Store className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-semibold text-muted-foreground cursor-pointer">Boutique</p>
            </div>
        </div>
    );
}
