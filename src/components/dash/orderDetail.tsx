"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { CircleX, Pen, Terminal } from "lucide-react";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { ApiDataOders, OrderDetails } from "@/interfaces/AdminInterface";
import { getdetailCommandes } from "@/servives/AdminService";
import useAuth from "@/servives/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from 'next/image';


interface OrderDetailProps {
    id: number;
    data: OrderDetails[];
    isOpen: boolean;
    onClose: () => void;
}

export function OrderDetail({ data, isOpen, onClose }: OrderDetailProps) {
    const token = useAuth();
    const [phone, setPhone] = useState<string>("");
    const [description, setDescription] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [otherFiles, setOtherFiles] = useState<File[]>([]);
    const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);

    // Vérifiez si data est défini et contient des éléments
    if (!data || data.length === 0) {

        return (
            <Sheet open={isOpen}>
                <SheetContent className="flex flex-col h-full overflow-y-auto md:max-w-full w-full md:w-1/2">
                    <SheetHeader className="relative flex mb-6">
                        <CircleX onClick={onClose} size={30} className="absolute right-0 cursor-pointer" />
                        <SheetTitle className="flex">
                            <Pen className="mr-2 h-5 w-5" /> Personnalisé le produit
                        </SheetTitle>
                    </SheetHeader>

                    <div className="container mx-auto p-8">
                        <h1 className="text-3xl font-bold mb-6">Aucune donnée disponible</h1>
                    </div>
                </SheetContent>
            </Sheet>
        );
    }


    return (

        <Sheet open={isOpen}>
            <SheetContent className="flex flex-col h-full overflow-y-auto md:max-w-full w-full md:w-1/2">
                <SheetHeader className="relative flex mb-6">
                    <CircleX onClick={onClose} size={30} className="absolute right-0 cursor-pointer" />
                    <SheetTitle className="flex">
                        <Pen className="mr-2 h-5 w-5" /> Personnalisé le produit
                    </SheetTitle>
                </SheetHeader>

                <div className="container mx-auto p-8">
                    <h1 className="text-3xl font-bold mb-6">Détails de la commande</h1>

                    <Card className="mb-8 shadow-lg">
                        <CardHeader className="bg-[#242078] text-white">
                            <CardTitle>{"Informations sur l'utilisateur"}</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                <p><strong>Nom :</strong> {data[0]?.nomUsers_orders}</p>
                                <p><strong>Email :</strong> {data[0]?.email_orders}</p>
                                <p><strong>Contact :</strong> {data[0]?.contact_paiement}</p>
                                <p><strong>Mode de paiement :</strong> {data[0]?.Mode_paiement}</p>
                                <p><strong>Date de la commande :</strong> {data[0]?.date_orders} à {data[0]?.heurs_orders}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardHeader className="bg-[#242078] text-white">
                            <CardTitle>Détails de la commande</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p><strong>ID Commande :</strong> {data[0]?.id_orders}</p>
                                <p><strong>Transaction ID :</strong> {data[0]?.transaction_id}</p>
                                <p><strong>Status de la commande :</strong> {data[0]?.status_orders === 0 ? 'Non traité' : 'Traité'}</p>
                                <p><strong>Remarques :</strong> {data[0]?.notes_orders || "Aucune remarque"}</p>

                                <p><strong>{"Nom de l'entreprise"} :</strong> {data[0]?.EntrepriseAchats}</p>
                                <p><strong>Facture :</strong> <a href={data[0]?.factures} target="_blank" className="text-blue-600">Voir la facture</a></p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SheetContent>
        </Sheet>
    );

}
