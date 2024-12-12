"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { PhoneInput } from "@/components/ui/phone-input";
import dynamic from "next/dynamic";
import { CircleX, Pen, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const QuillEditor = dynamic(() => import("@/components/ui/QuillEditor"), { ssr: false });

// Mise à jour du schema sans `files`
const formSchema = z.object({
    texte: z.string().optional(),
    police: z.string().optional(),
    dimension: z.string().optional(),
    colors: z.string().optional(),
    NomPrenom: z.string().min(1, "Nom et prénom requis"),
    Entreprise: z.string().optional(),
    numero: z.string().optional(),
    email: z.string().email("Adresse e-mail invalide"),
    Description: z.string().optional(),
    position: z.string().min(1, "Sélectionnez l'emplacement de l'image"), // Ajout de validation pour la position
});

interface OrderSheetProps {
    productId: string;
    isOpen: boolean;
    onClose: () => void;
}

export function OrderSheet({ productId, isOpen, onClose }: OrderSheetProps) {
    const [phone, setPhone] = useState<string>("");
    const [description, setDescription] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Fichiers d'images de support principal
    const [otherFiles, setOtherFiles] = useState<File[]>([]); // Fichiers d'images de support supplémentaire

    const [previewText, setPreviewText] = useState<string>("");
    const [previewColor, setPreviewColor] = useState<string>("black");
    const [previewFont, setPreviewFont] = useState<string>("Arial");

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            NomPrenom: "",
            email: "",
            numero: "",
            Description: "",
            texte: "",
            police: "",
            dimension: "",
            colors: "",
            Entreprise: "",
            position: "",
        },
    });


    // Fonction pour mettre à jour les fichiers sélectionnés pour les images principales
    const onFilesChange = (files: File[]) => {
        setSelectedFiles(files);
    };

    // Fonction pour mettre à jour les fichiers sélectionnés pour le support supplémentaire
    const onOtherFilesChange = (files: File[]) => {
        setOtherFiles(files);
    };

    // Fonction pour envoyer la commande avec les fichiers
    const handleOrder = async (data: any) => {
        const formData = new FormData();
        alert('ok');
        console.log(data);
        // Ajout des données du formulaire
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        // Ajout des fichiers sélectionnés pour l'upload des images principales
        selectedFiles.forEach((file) => formData.append("files", file));
        // Ajout des fichiers sélectionnés pour l'upload du support supplémentaire
        otherFiles.forEach((file) => formData.append("otherFiles", file));

        try {
            const res = await fetch("/api/order", { // Remplacer "/api/order" par l'URL de ton API d'enregistrement de commande
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Erreur lors de l'enregistrement de la commande");
            }

            const result = await res.json();
            console.log("Commande enregistrée avec succès", result);
            toast.success("Commande passée avec succès");
            onClose(); // Ferme le formulaire après la commande
        } catch (error) {
            console.error("Erreur API :", error);
            toast.error("Erreur lors de l'enregistrement de la commande.");
        }
    };

    // Tableau d'options dynamiques pour l'emplacement de l'image
    const imagePositions = [
        { value: "En Haut", label: "En Haut" },
        { value: "A Gauche", label: "A Gauche" },
        { value: "Au Centre", label: "Au Centre" },
        { value: "En Bas", label: "En Bas" },
        { value: "A Droite", label: "A Droite" },
    ];

    // Tableau d'options dynamiques pour les couleurs principales
    const colorOptions = [
        { value: "red", label: "Rouge" },
        { value: "blue", label: "Bleu" },
        { value: "green", label: "Vert" },
        { value: "yellow", label: "Jaune" },
        { value: "orange", label: "Orange" },
        { value: "purple", label: "Violet" },
        { value: "pink", label: "Rose" },
        { value: "brown", label: "Marron" },
        { value: "black", label: "Noir" },
        { value: "white", label: "Blanc" },
        { value: "gray", label: "Gris" },
        { value: "cyan", label: "Cyan" },
        { value: "magenta", label: "Magenta" },
        { value: "teal", label: "Bleu-vert" },
        { value: "lime", label: "Citron vert" },
        { value: "indigo", label: "Indigo" },
        { value: "violet", label: "Violet clair" },
        { value: "gold", label: "Or" },
        { value: "silver", label: "Argent" },
        { value: "beige", label: "Beige" },
    ];

    // Tableau d'options dynamiques pour les polices
    const fontOptions = [
        { value: "Arial", label: "Arial" },
        { value: "Verdana", label: "Verdana" },
        { value: "Times New Roman", label: "Times New Roman" },
        { value: "Georgia", label: "Georgia" },
        { value: "Courier New", label: "Courier New" },
        { value: "Lucida Console", label: "Lucida Console" },
        { value: "Tahoma", label: "Tahoma" },
        { value: "Trebuchet MS", label: "Trebuchet MS" },
        { value: "Impact", label: "Impact" },
        { value: "Helvetica", label: "Helvetica" },
        { value: "Palatino", label: "Palatino" },
        { value: "Garamond", label: "Garamond" },
        { value: "Courier", label: "Courier" },
        { value: "Century Gothic", label: "Century Gothic" },
        { value: "Brush Script MT", label: "Brush Script MT" },
        { value: "Comic Sans MS", label: "Comic Sans MS" },
        { value: "Consolas", label: "Consolas" },
    ];


    // Utiliser useEffect pour mettre à jour l'aperçu à chaque changement de texte, couleur ou police
    useEffect(() => {
        const texte = getValues('texte');
        const couleur = getValues('colors');
        const police = getValues('police');
        setPreviewText(texte || "Votre texte ici...");
        setPreviewColor(couleur || "black");
        setPreviewFont(police || "Arial");
    }, [getValues('texte'), getValues('colors'), getValues('police')]);


    return (

        <Sheet open={isOpen}>
            <SheetContent className="flex flex-col h-full overflow-y-auto md:max-w-full w-full md:w-1/3">
                <SheetHeader className="relative flex mb-6">
                    <CircleX onClick={onClose} size={30} className="absolute right-0 cursor-pointer" />
                    <SheetTitle className="flex">
                        <Pen className="mr-2 h-5 w-5" />  Personnalisé le produit
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit(handleOrder)} className="w-full flex flex-col gap-4">
                    
                    {/* Champ texte */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="texte">Saisissez ici un texte (facultatif)</Label>
                        <Controller
                            name="texte"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} id="texte" />
                            )}
                        />
                    </div>


                   {/* Aperçu du texte */}
                    {/* <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Aperçu de votre texte</AlertTitle>
                        <AlertDescription className="font-bold" style={{  color: previewColor, fontFamily: previewFont, }}>
                            {previewText}
                        </AlertDescription>
                    </Alert> */}


                    {/* Sélection de la police d'écriture */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="police">Choisir la police d'écriture</Label>
                        <Select
                            onValueChange={value => setValue('police', value)}
                            defaultValue={getValues('police')}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner la police" />
                            </SelectTrigger>
                            <SelectContent>
                                {fontOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sélection de la couleur */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="colors">Choisir une couleur</Label>
                        <Select
                            onValueChange={value => setValue('colors', value)}
                            defaultValue={getValues('colors')}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une couleur" />
                            </SelectTrigger>
                            <SelectContent>
                                {colorOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    {/* Champ nom et prénom */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="NomPrenom">Nom & Prénom *</Label>
                        <Controller
                            name="NomPrenom"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} id="NomPrenom" />
                            )}
                        />
                        {errors.NomPrenom && <p className="text-red-500">{errors.NomPrenom.message}</p>}
                    </div>

                    {/* Champ entreprise */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="Entreprise">Entreprise (facultatif)</Label>
                        <Controller
                            name="Entreprise"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} id="Entreprise" />
                            )}
                        />
                    </div>

                    {/* Champ téléphone */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="numero">Téléphone *</Label>
                        <PhoneInput defaultCountry="CI" value={phone} onChange={setPhone} placeholder="Téléphone" />
                        {errors.numero && <p className="text-red-500">{errors.numero.message}</p>}
                    </div>

                     {/* Champ texte */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="texte">email</Label>
                        <Controller name="email" control={control} render={({ field }) => ( <Input {...field} id="email" /> )}
                        />
                    </div>

                    {/* Champ message */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="Description">Votre message</Label>
                        <QuillEditor value={description} onChange={setDescription} />
                    </div>

                    
                    {/* Champ télécharger fichiers principaux */}
                    <div className="grid w-full items-center gap-1">
                    <Label className="font-bold" htmlFor="otherFiles">Télecharger une image (png,jpg,jpeg) (facultatif)</Label>
                        <ImageUploader onFilesChange={onFilesChange} multiple={true} />
                    </div>

                    {/* Sélection de la position */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="position">Sélectionner l'emplacement de l'image</Label>
                        <Select
                            onValueChange={value => setValue('position', value)}
                            defaultValue={getValues('position')}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner la position" />
                            </SelectTrigger>
                            <SelectContent>
                                {imagePositions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Champ télécharger autre support */}
                    <div className="grid w-full items-center gap-1 mb-3">
                        <Label className="font-bold" htmlFor="otherFiles">Télécharger un autre support (png, jpg, jpeg) (facultatif)</Label>
                        <ImageUploader onFilesChange={onOtherFilesChange} multiple={true} />
                    </div>


                    <SheetFooter className="mt-auto">
                        <div className="flex justify-center space-x-2">
                            <Button onClick={onClose} type="button" className="text-sm px-4 py-2">Annuler</Button>
                            <Button type="submit" className="text-sm px-4 py-2 space-x-2">Passer la commande</Button>
                        </div>
                    </SheetFooter>
                </form>

            </SheetContent>
        </Sheet>


    );
}
