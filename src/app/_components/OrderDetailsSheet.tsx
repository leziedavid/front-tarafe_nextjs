"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import useAuth from '@/servives/useAuth';
import { OrderDetails } from "@/interfaces/AdminInterface";
import { getBaseUrlImg } from '@/servives/baseUrl';
import { formatDateFR } from "@/servives/DateUtils";

interface OrderDetailsSheetProps {
    isOpens: boolean;
    datas: OrderDetails[];  // Liste de commandes
    onClose: () => void;
}

export function OrderDetailsSheet({ isOpens, onClose, datas }: OrderDetailsSheetProps) {
    const token = useAuth();  // Récupérer le token à l'aide du hook


    // Fonction pour télécharger l'image
    const handleDownload = (src: string, filename: string) => {
        const link = document.createElement('a');
        link.href = src;
        link.download = filename; // Le nom du fichier téléchargé
        link.click();
    };

    if (!datas || datas.length === 0) return null; // Si aucune donnée n'est fournie, ne rien afficher

    return (
        <Sheet open={isOpens}>
            <SheetContent className="flex flex-col h-full overflow-y-auto md:max-w-full w-full md:w-1/2">
                <SheetHeader className="border p-4 rounded-lg shadow-lg bg-white">
                    <SheetTitle className="font-bold text-lg text-gray-800">
                        Details de la commande n° {datas[0].transaction_id}
                    </SheetTitle>
                </SheetHeader>

                <div className="py-6">
                    {/* Affichage des informations principales de la commande */}
                    <div className="space-y-6">
                        {datas.map((order, index) => (
                            <div key={index}>
                                {/* Affichage des informations de la commande */}
                                <div className="flex justify-between mb-6">
                                    <div>
                                        <p className="text-lg tracking-tight font-bold">Produit commandé</p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="font-semibold text-xl text-gray-800">{formatDateFR(order.date_orders)}</p>
                                    </div>
                                </div>

                                {/* Détails des articles */}
                                <div className="space-y-6 mb-4">

                                    <div className="flex justify-between items-center border-b pb-4">
                                        <div className="flex items-center space-x-4">
                                            <img className="w-30 h-40 object-cover" src={`${getBaseUrlImg()}/${order.images_realisations}`} alt={order.libelle_realisations} />
                                            <div>
                                                <p className="font-semibold text-gray-800 mb-2">{order.libelle_realisations}</p>

                                                    <p className="text-lg font-bold text-red-600">Option demander par le client :</p>
                                                    <p className="text-sm font-bold text-gray-800">Police d'écriture : {order.policeAchats}</p>
                                                    <p className="text-sm font-bold text-gray-800"> Couleur : {order.couleursAchats}</p>
                                                    <p className="text-sm font-bold text-gray-800">Position du logo: {order.PositionsFiles}</p>

                                            </div>
                                            
                                        </div>
                                        {/* <div className="text-right">
                                            <p className="font-semibold text-gray-800">${order.total}</p>
                                        </div> */}
                                    </div>

                                </div>


                                <div className="flex space-x-4">
                                    {/* Image 1 */}
                                    <div className="flex flex-col items-center">
                                        <img className="w-30 h-40 object-cover" src={`${getBaseUrlImg()}/${order.images_realisations}`} alt={order.libelle_realisations} />
                                        <p className="text-sm mt-2font-bold   text-center text-gray-800">Logo</p>
                                    </div>

                                    {/* Image 2 */}
                                    <div className="flex flex-col items-center">
                                        <img className="w-30 h-40 object-cover" src={`${getBaseUrlImg()}/${order.images_realisations}`} alt={order.libelle_realisations} />
                                        <p className="text-sm mt-2 font-bold  text-center text-gray-800">Support d'impression : </p>
                                    </div>
                                </div>


                                {/* Résumé de la commande */}
                                <div className="mt-6 space-y-4">
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">Nom du client</p>
                                        <p className="font-semibold text-gray-800">{order.NomPrenomAchats}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">Contact</p>
                                        <p className="text-sm text-gray-600">{order.numeroAchats}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-semibold text-gray-800">{order.emailAchats}</p>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <p className="font-semibold text-lg">Adresse de facturation</p>
                                        <p className="font-semibold text-lg text-gray-800">{ order.adresse_paiement  ? order.adresse_paiement : 'ABIDJAN -CI '}</p>
                                    </div>
                                </div>

                                {/* Informations de livraison */}
                                <div className="mt-6 space-y-4">
                                    <p className="text-lg font-semibold">Remarque du client</p>
                                    <p className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: order  ? order.remarques : '' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <SheetFooter className="mt-auto">
                    <div className="flex justify-center space-x-2">
                        <Button onClick={onClose} type="button" className="text-sm px-4 py-2">Annuler</Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
