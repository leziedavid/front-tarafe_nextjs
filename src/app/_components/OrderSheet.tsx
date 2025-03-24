"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { PhoneInput } from "@/components/ui/phone-input";
import dynamic from "next/dynamic";
import { CircleX, Pen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Realisation } from "@/interfaces/HomeInterface";
import { addOrders } from "@/servives/AdminService";
import useAuth from '@/servives/useAuth';


// Dynamically load Quill editor (without SSR)
const QuillEditor = dynamic(() => import("@/components/ui/QuillEditor"), { ssr: false });

// Mise à jour du schéma avec validation pour chaque champ
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
    // files: z.array(z.instanceof(File)).min(1, "Vous devez télécharger au moins un fichier") // Validation pour les fichiers
});

interface OrderSheetProps {
    productId: string;
    isOpen: boolean;
    datas: Realisation[];
    onClose: () => void;
}

export function OrderSheet({ productId, isOpen, onClose, datas }: OrderSheetProps) {
    const [phone, setPhone] = useState<string>("");
    const [description, setDescription] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Fichiers d'images de support principal
    const [otherFiles, setOtherFiles] = useState<File[]>([]); // Fichiers d'images de support supplémentaire
    const [isUploading, setIsUploading] = useState(false);

    const token = useAuth();  // Récupérer le token à l'aide du hook

    const [previewText, setPreviewText] = useState<string>("");
    const [previewColor, setPreviewColor] = useState<string>("black");
    const [previewFont, setPreviewFont] = useState<string>("Arial");

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            NomPrenom: "",
            email: "",
            numero: "",
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

    // Fonction de validation
    const validateForm = () => {
        const result = formSchema.safeParse({
            texte: getValues("texte"),
            police: getValues("police"),
            dimension: getValues("dimension"),
            colors: getValues("colors"),
            NomPrenom: getValues("NomPrenom"),
            Entreprise: getValues("Entreprise"),
            numero: getValues("numero"),
            email: getValues("email"),
            position: getValues("position"),
        });

        if (result.success) {

            return true; // Aucune erreur, tout est valide
        } else {
            // Si validation échoue, traiter les erreurs
            result.error.errors.forEach((error) => {
                // Ici, tu peux récupérer le nom du champ d'erreur à partir de error.path
                const fieldName = error.path[0]; // Le nom de l'input
                const errorMessage = `${fieldName} est requis`; // Message d'erreur avec nom du champ
    
                // Affiche l'erreur via le toast avec un message personnalisé
                toast.error(`Le champ ${fieldName} est requis. Erreur : ${error.message}`);
            });
            return false; // Validation échouée
        }
    };

    const handleOrder = async () => {
        // Validation des données
        if (!validateForm()) return;
    
        console.log(selectedFiles)
        // Créer FormData pour l'envoi des données
        const formData = new FormData();
        // Ajouter les fichiers d'images principales
        selectedFiles.forEach((file) => formData.append("imgLogosAchats", file)); // Ajoute les fichiers principaux
        // Ajouter les fichiers de support supplémentaire
        otherFiles.forEach((file) => formData.append("FileAchats", file)); // Ajoute les autres fichiers
        // Ajout d'un champ pour la taille des fichiers sélectionnés
        formData.append("codeAchat", datas[0].code_realisation);
        formData.append("remarques", description || "");
        formData.append("texteAchats", getValues("texte") || "");  // texte par défaut si pas précisé
        formData.append("couleursAchats", getValues("colors") || "");  // colors par défaut si pas précisé
        formData.append("PositionsFiles", getValues("position") || "");  // Position par défaut si pas précisé
        formData.append("NomPrenomAchats", getValues("NomPrenom") || "");
        formData.append("EntrepriseAchats", getValues("Entreprise") || "");
        formData.append("numeroAchats", getValues("numero") || "");
        formData.append("policeAchats", getValues("police") || "");
        formData.append("emailAchats", getValues("email") || "");
        // On ne prend plus en compte `id_realisations` ici, car il n'y a pas de mise à jour
        setIsUploading(true);  // Désactive l'interface pour indiquer que l'upload est en cours
    
        try {
            // Envoi des données pour créer une nouvelle commande
            const result = await addOrders(token, formData);  // Appel à la fonction pour créer une commande
            
            if (result.statusCode === 200) {
                toast.success("Commande passée avec succès !");
                onClose(); // Ferme le formulaire après succès
            } else {
                toast.error("Erreur lors de l'envoi des données.");
            }
    
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
            toast.error("Une erreur s'est produite pendant la soumission.");
        } finally {
            setIsUploading(false);  // Restaure l'état de l'interface une fois l'upload terminé
        }
    };
    
    // Options pour les sélections
    const imagePositions = [
        { value: "En Haut", label: "En Haut" },
        { value: "A Gauche", label: "A Gauche" },
        { value: "Au Centre", label: "Au Centre" },
        { value: "En Bas", label: "En Bas" },
        { value: "A Droite", label: "A Droite" },
    ];

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

    // Mise à jour de l'aperçu du texte
    useEffect(() => {
        setPreviewText(getValues("texte") || "");
        setPreviewColor(getValues("colors") || "black");
        setPreviewFont(getValues("police") || "Arial");
    }, [getValues]);

    return (
        <Sheet open={isOpen} >
            <SheetContent className="flex flex-col h-full overflow-y-auto md:max-w-full w-full md:w-1/3">
            <SheetHeader>
                    <SheetTitle>Personnalisez le produit</SheetTitle>
                    <p>{datas[0].libelle_realisations}</p>
                </SheetHeader>

                <div className="w-full flex flex-col gap-4">
                    {/* Champ texte */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="texte">Saisissez ici un texte (facultatif)</Label>
                        <Controller
                            name="texte"
                            control={control}
                            render={({ field }) => <Input {...field} id="texte" />}
                        />
                    </div>

                    {/* Sélection de la police d'écriture */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="police">{"Choisir la police d'écriture "}</Label>
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
                        <Select onValueChange={value => setValue('colors', value)} defaultValue={getValues('colors')}>
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

                    {/* Champ email */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="email">Email</Label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} id="email" />
                            )}
                        />
                    </div>

                    {/* Champ message */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="Description">Votre message</Label>
                        <QuillEditor value={description} onChange={setDescription} />
                    </div>

                    {/* Champ télécharger fichiers principaux */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="otherFiles">Télécharger une image (facultatif)</Label>
                        <ImageUploader onFilesChange={onFilesChange} multiple={false} />
                    </div>

                    {/* Sélection de la position */}
                    <div className="grid w-full items-center gap-1">
                        <Label className="font-bold" htmlFor="position">{"Sélectionner l'emplacement de l'image"}</Label>
                        <Select onValueChange={value => setValue('position', value)} defaultValue={getValues('position')}>
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
                    {/* <div className="grid w-full items-center gap-1 mb-3">
                        <Label className="font-bold" htmlFor="otherFiles">Télécharger un autre support (facultatif)</Label>
                        <ImageUploader onFilesChange={onOtherFilesChange} multiple={true} />
                    </div> */}

                    <SheetFooter className="mt-auto">
                        <div className="flex justify-center space-x-2">
                            <Button onClick={onClose} type="button" className="text-sm px-4 py-2">Annuler</Button>
                            <Button onClick={handleOrder} type="button" className="text-sm px-4 py-2 space-x-2">Passer la commande</Button>
                            {/* <Button onClick={handleSubmit(handleOrder)} type="button" className="text-sm px-4 py-2 space-x-2">Passer la commande</Button> */}
                        </div>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
}
