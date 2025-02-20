"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import useAuth from '@/servives/useAuth';
import { getBaseUrlImg } from '@/servives/baseUrl';
import { formatDateFR } from "@/servives/DateUtils";
import {Avatar,AvatarFallback,AvatarImage,} from "@/components/ui/avatar"
import { CircleUserRound } from "lucide-react";
import { OptionRealisation } from "@/interfaces/HomeInterface";

interface MessagesSheetProps {
    isOpens: boolean;
    datas: OptionRealisation | null;  // Liste de commandes
    onClose: () => void;
}

export function MessagesSheet({ isOpens, onClose, datas }: MessagesSheetProps) {
    const token = useAuth();  // Récupérer le token à l'aide du hook


    if (!datas) return null; // Si aucune donnée n'est fournie, ne rien afficher

    return (
        <Sheet open={isOpens}>
            <SheetContent className="flex flex-col h-full overflow-y-auto md:max-w-full w-full md:w-1/2">
                <SheetHeader className="border p-4 rounded-lg shadow-lg bg-white">
                    <SheetTitle className="font-bold text-lg text-gray-800 flex items-center space-x-2">
                        <Avatar>
                            <AvatarFallback>
                                <CircleUserRound className='w-6 h-6 text-primary' />
                            </AvatarFallback>
                        </Avatar>
                        <span>Message envoyé par</span>
                    </SheetTitle>
                </SheetHeader>


                <SheetFooter className="mt-auto">
                    <div className="flex justify-center space-x-2">
                        <Button onClick={onClose} type="button" className="text-sm px-4 py-2">Annuler</Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
