import { ImageUploader } from '@/components/ui/ImageUploader';
import { useState } from 'react';

export function FileUploadPage({ apiUrl }: { apiUrl: string }) {
    
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Fichiers sélectionnés
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // Fichiers téléchargés avec les URLs

    // Fonction pour mettre à jour les fichiers sélectionnés
    const onFilesChange = (files: File[]) => {
        setSelectedFiles(files); // Mise à jour des fichiers sélectionnés
    };

    // Fonction pour télécharger les fichiers via l'API
    const uploadFiles = async () => {
        if (selectedFiles.length === 0) return; // Si aucun fichier n'est sélectionné, on arrête

        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append('files', file)); // Ajout des fichiers à FormData

        try {
            const res = await fetch(apiUrl, { // Envoi des fichiers à l'API
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                console.error('Erreur lors du téléchargement');
                return;
            }

            const data: { uploadedFiles: string[] } = await res.json(); // Traitement des fichiers téléchargés
            setUploadedFiles(data.uploadedFiles); // Mise à jour des fichiers téléchargés
            setSelectedFiles([]); // Réinitialisation des fichiers sélectionnés
        } catch (error) {
            console.error('Erreur API :', error);
        }
    };

    // Fonction pour réinitialiser les fichiers sélectionnés et téléchargés
    const clearFiles = () => {
        setSelectedFiles([]);
        setUploadedFiles([]);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Le composant ImageUploader avec la gestion des fichiers */}
            <ImageUploader onFilesChange={onFilesChange} multiple={true} /> {/* Changez `multiple` à false si vous voulez une seule image */}

            {selectedFiles.length > 0 && (
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={clearFiles}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                    >
                        Effacer
                    </button>
                    <button
                        onClick={uploadFiles}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                    >
                        Télécharger
                    </button>
                </div>
            )}

            {/* Affichage des fichiers téléchargés */}
            {uploadedFiles.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-700">Fichiers téléchargés :</h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        {uploadedFiles.map((file, idx) => (
                            <div key={idx} className="relative w-32 h-32 overflow-hidden rounded-lg">
                                <img src={file} alt={`Uploaded ${idx}`} className="object-cover w-full h-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
