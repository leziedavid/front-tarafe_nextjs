
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { z } from "zod";  // Importation de Zod pour la validation
import { toast } from "sonner";  // Pour les notifications de succès ou d'erreur
import { ImageUploader } from '../ui/ImageUploader';
import { Button } from '../ui/button';
import { Toaster } from "@/components/ui/sonner";
import { addGallery } from '@/servives/AdminService';
import useAuth from '@/servives/useAuth';

// Définir la validation Zod pour plusieurs fichiers (max 5 fichiers et format png/jpg/jpeg)
const filesValidationSchema = z.array(
    z.instanceof(File).refine((file) => ['image/png', 'image/jpeg'].includes(file.type), {
        message: 'Les fichiers doivent être des images de type PNG ou JPEG.',
    }).refine((file) => file.size <= 5 * 1024 * 1024, {  // Taille max : 5 Mo
        message: 'Chaque fichier ne doit pas dépasser 5 Mo.',
    })
).refine((files) => files.length > 0, {
    message: 'Veuillez télécharger au moins une image.',
});

interface ImageUploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    fetchData: () => void;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({ open, onOpenChange }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const token = useAuth();  // Récupérer le token à l'aide du hook
    const onFilesChange = (files: File[]) => {
        setSelectedFiles(files); // Mise à jour des fichiers sélectionnés
    };

    const handleSubmit = async () => {
        // Validation des fichiers avec Zod
        try {
            filesValidationSchema.parse(selectedFiles);  // Si la validation échoue, une erreur sera levée

        } catch (error) {
            if (error instanceof z.ZodError) {

                toast.error(error.errors[0].message);  // Afficher l'erreur de validation
                return;
            }
        }

        // Préparer les fichiers à envoyer dans le FormData
        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("files", file));
        setIsUploading(true);

        try {
            // Envoi des données pour créer une nouvelle commande
            const result = await addGallery(token, formData);  // Appel à la fonction pour créer une commande

            if (result.statusCode === 200) {
                toast.success("Images téléchargées avec succès !");
                onOpenChange(false);  // Fermer le dialog après le succès
            } else {
                toast.error("Erreur lors de la soumission des images.");
            }

        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
            toast.error("Une erreur s'est produite pendant la soumission.");
        } finally {
            setIsUploading(false);  // Restaure l'état de l'interface une fois l'upload terminé
        }

        // try {
        //     const res = await fetch("/api/images", {
        //         method: "POST",
        //         body: formData,
        //     });

        //     if (res.ok) {
        //         toast.success("Images téléchargées avec succès !");
        //         onOpenChange(false);  // Fermer le dialog après le succès
        //     } else {
        //         toast.error("Erreur lors du téléchargement des images.");
        //     }
        // } catch (error) {
        //     toast.error("Erreur lors de la soumission des images.");
        // } finally {
        //     setIsUploading(false);
        // }

    };

    return (
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg"
                style={{ maxHeight: '80vh', overflowY: 'auto' }}  // Ajout de scroll
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl md:text-3xl tracking-tighter max-w-xl font-bold">
                        Télécharger des images
                    </DialogTitle>
                    <DialogDescription>
                        Sélectionnez plusieurs images (PNG, JPG, JPEG) à télécharger.
                    </DialogDescription>
                </DialogHeader>

                {/* Section de téléchargement des fichiers */}
                <div className="grid w-full items-center gap-1">
                    <Label className="font-bold" htmlFor="otherFiles">Télécharger une ou plusieurs images (png, jpg, jpeg)</Label>
                    <ImageUploader onFilesChange={onFilesChange} multiple={true} />  {/* Permet de sélectionner plusieurs fichiers */}
                </div>

                {/* Boutons d'action */}
                <div className="mt-4 flex justify-end gap-2">
                    <Button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="text-sm px-4 py-2 rounded-md"
                    >
                        Annuler
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isUploading || selectedFiles.length === 0}
                        className={`text-sm px-4 py-2 rounded-md ${isUploading ? 'opacity-50' : ''}`}
                    >
                        {isUploading ? "Téléchargement..." : "Soumettre"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
        
        </>
    );
};

export default ImageUploadDialog;
