"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";


import { toast } from "sonner"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Textarea } from "@/components/ui/textarea";
import { CircleX, MoveRight, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PhoneInput } from "@/components/ui/phone-input";

import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('@/components/ui/QuillEditor'), {ssr: false,});


interface OrderSheetProps {
    productId: string;
    isOpen: boolean;
    onClose: () => void;
}

const formSchema = z.object({
    texte: z.string(),
    police: z.string(),
    dimension: z.string(),
    colors: z.string(),
    NomPrenom: z.string(),
    Entreprise: z.string(),
    numero: z.string(),
    email: z.string(),
    files: z.string(),
    PositionsFiles: z.string(),
    Description: z.string()
});

export function OrderSheet({ productId, isOpen, onClose }: OrderSheetProps) {

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Fichiers sélectionnés
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // Fichiers téléchargés avec les URLs
    const [description, setDescription] = useState('');  // Assure-toi que l'état est défini ici

    const [phone, setPhone] = useState<string>('');
    const handlePhoneChange = (value: string | undefined) => {
        setPhone(value || '');
    };

    // Fonction pour mettre à jour les fichiers sélectionnés
    const onFilesChange = (files: File[]) => {
        setSelectedFiles(files); // Mise à jour des fichiers sélectionnés
    };

    // Fonction pour télécharger les fichiers via l'API
    const uploadFiles = async () => {
        if (selectedFiles.length === 0) return; // Si aucun fichier n'est sélectionné, on arrête

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append('files', file)); // Ajout des fichiers à FormData

        // try {
        //     const res = await fetch(apiUrl, { // Envoi des fichiers à l'API
        //         method: 'POST',
        //         body: formData,
        //     });

        //     if (!res.ok) {
        //         console.error('Erreur lors du téléchargement');
        //         return;
        //     }

        //     const data: { uploadedFiles: string[] } = await res.json(); // Traitement des fichiers téléchargés
        //     setUploadedFiles(data.uploadedFiles); // Mise à jour des fichiers téléchargés
        //     setSelectedFiles([]); // Réinitialisation des fichiers sélectionnés
        // } catch (error) {
        //     console.error('Erreur API :', error);
        // }

    };

    // Fonction pour réinitialiser les fichiers sélectionnés et téléchargés
    const clearFiles = () => {
        setSelectedFiles([]);
        setUploadedFiles([]);
    };

    const [quantity, setQuantity] = useState(1);

    const handleOrder = () => {
        console.log("Commande passée pour le produit ID:", productId, "Quantité:", quantity);
        onClose();
    };

    return (


        <Sheet open={isOpen}>

                <SheetContent className="flex flex-col h-full overflow-y-auto md:max-w-full  w-full md:w-1/3">
                <SheetHeader className="relative flex items-center">
                    <CircleX onClick={handleOrder} size={30} className="absolute right-0 cursor-pointer "/>
                    <SheetTitle>Commander le produit</SheetTitle>
                </SheetHeader>

                <div className="w-full flex flex-col gap-4 ">
                    <div className="grid w-full  items-center gap-1">
                        <Label className="font-bold" htmlFor="firstname">Saisissez ici un texte (facultatif)</Label>
                        <Input id="firstname" type="text" />
                    </div>
                    <div className="grid w-full  items-center gap-1">
                        <Label className="font-bold" htmlFor="firstname">Choisir la police d'écriture</Label>
                        <Input id="firstname" type="text" />
                    </div>

                    <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Aperçu de votre texte</AlertTitle>
                        <AlertDescription className="font-bold"> ... Tdllezie ...
                        </AlertDescription>
                    </Alert>


                    <div className="grid w-full  items-center gap-1">
                        <Label className="font-bold" htmlFor="firstname">Saisissez ici des dimensions (cm) ou une taille (S, M, L etc) (facultatif)</Label>
                        <Input id="firstname"  type="text" />
                    </div>
                    <div className="grid w-full  items-center gap-1">
                        <Label className="font-bold" htmlFor="firstname">Selectionner une couleur principale (facultatif)</Label>
                        <Input id="firstname" type="text" />
                    </div>

                    <div className="grid w-full  items-center gap-1">
                        <Label className="font-bold" htmlFor="firstname">Entreprise (facultatif)</Label>
                        <Input id="firstname" type="text" />
                    </div>

                    <div className="grid w-full  items-center gap-1">
                        <Label className="font-bold" htmlFor="firstname">Nom & Prénom *</Label>
                        <Input id="firstname" type="text" />
                    </div>

                    <div className="grid w-full  items-center gap-1">
                        <Label className="font-bold" htmlFor="firstname">Entreprise (facultatif)</Label>
                        <Input id="firstname" type="text" />
                    </div>

                    <div className="grid w-full  items-center gap-1">
                        <Label className="font-bold" htmlFor="lastname">Téléphone</Label>
                        <PhoneInput placeholder="Téléphone" defaultCountry="CI" value={phone} onChange={setPhone}/>
                    </div>
                    <div className="grid w-full  items-center gap-1">
                        <Label className="font-bold" htmlFor="picture">Votre message</Label>
                        <QuillEditor  value={description} onChange={setDescription} />
                        <p className="font-bold text-sm text-muted-foreground">
                            Votre message sera copié à l'équipe d'assistance. {description}
                        </p>
                    </div>
                </div>


                <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
                    <ImageUploader onFilesChange={onFilesChange} multiple={true} />
                </div>

                <SheetFooter className="mt-auto">
                    <div className="flex justify-center space-x-2">
                        <Button  onClick={handleOrder}  type="button" className="bd-red-700 text-sm px-4 py-2">
                            Annuler
                        </Button>
                        <Button  onClick={handleOrder}  type="submit" className="text-sm px-4 py-2 space-x-2">
                            Passer la commande
                            {/* <MoveRight className="w-4 h-4" /> */}
                        </Button>
                    </div>
                </SheetFooter>

            </SheetContent>
        </Sheet>

    );
}
