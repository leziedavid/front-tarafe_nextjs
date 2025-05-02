'use client';

import React, { useState, useEffect } from 'react';
import { AlertModal } from './alert-modal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Toaster } from "@/components/ui/sonner";
import { CirclePlus, CircleX, Pencil, Trash2 } from 'lucide-react';

import {
    fetchAllGalleryCategory,
    createGalleryCategory,
    updateGalleryCategory,
    deleteGalleryCategory
} from '@/servives/AdminService'; // 🔁 adapte ce chemin selon ton projet

import { GalleryCategory } from '@/interfaces/AdminInterface';

const CategorieGalleryModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState<GalleryCategory[]>([]);
    const [inputs, setInputs] = useState([{ libelle: '' }]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedIndexToDelete, setSelectedIndexToDelete] = useState<number | null>(null);
    const token = 'votre_token'; // à remplacer selon ton système d'auth

    const loadCategories = async () => {
        try {
            const result = await fetchAllGalleryCategory(token);
            setCategories(result.data);
        } catch (error) {
            toast.error('Erreur lors du chargement des catégories de galerie');
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleAddInput = () => {
        setInputs([...inputs, { libelle: '' }]);
    };

    const handleRemoveInput = (index: number) => {
        const updated = [...inputs];
        updated.splice(index, 1);
        setInputs(updated);
    };

    const handleInputChange = (index: number, value: string) => {
        const updated = [...inputs];
        updated[index].libelle = value;
        setInputs(updated);
    };

    const handleSubmit = async () => {
        try {
            if (editingIndex !== null) {
                const cat = categories[editingIndex];
                const data = { id: cat.idcategories_gallery, libelle: inputs[0].libelle };
                const result = await updateGalleryCategory(token, cat.idcategories_gallery, data);
                if (result.statusCode !== 200) {
                    toast.error(result.message);
                } else {
                    toast.success('Catégorie mise à jour');
                    loadCategories();
                }
            } else {
                const payload = inputs.map((input) => ({ libelle: input.libelle }));
                const result = await createGalleryCategory(token, payload);
                if (result.statusCode !== 200) {
                    toast.error(result.message);
                } else {
                    toast.success('Catégories créées');
                    loadCategories();
                }
            }

            setInputs([{ libelle: '' }]);
            setEditingIndex(null);
            setShowModal(false);
        } catch (err) {
            toast.error('Erreur lors de la soumission');
        }
    };

    const handleEdit = (index: number) => {
        const cat = categories[index];
        setInputs([{ libelle: cat.libelle }]);
        setEditingIndex(index);
        setShowModal(true);
    };

    const handleDeleteClick = (index: number) => {
        setSelectedIndexToDelete(index);
        setShowAlert(true);
    };

    const confirmDelete = async () => {
        try {
            if (selectedIndexToDelete !== null) {
                const cat = categories[selectedIndexToDelete];
                const result = await deleteGalleryCategory(token, cat.idcategories_gallery);
                if (result.statusCode !== 200) {
                    toast.error(result.message);
                } else {
                    toast.success('Catégorie supprimée');
                    loadCategories();
                }
            }
            setShowAlert(false);
            setSelectedIndexToDelete(null);
        } catch (err) {
            toast.error('Erreur lors de la suppression');
        }
    };

    return (
        <div>
            <Button variant={'secondary'} className="w-full md:w-auto" onClick={() => setShowModal(true)}>
                Gérer les catégories de galerie
            </Button>

            {showModal && (
                <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-y-auto h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="relative w-full max-w-4xl max-h-full">
                        <div className="bg-white rounded-lg shadow dark:bg-gray-700">

                            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                                <h3 className="text-2xl md:text-2xl tracking-tighter max-w-xl font-bold">
                                    {editingIndex !== null ? 'Modifier' : 'Créer'} Catégorie(s)
                                </h3>
                                <Button variant="secondary" size="sm" onClick={() => { setShowModal(false); setInputs([{ libelle: '' }]); setEditingIndex(null); }}>
                                    <CircleX />
                                </Button>
                            </div>

                            <div className="p-4 space-y-4">
                                {inputs.map((input, index) => (
                                    <div key={index} className="flex space-x-2 items-center">
                                        <button
                                            onClick={() => handleRemoveInput(index)}
                                            disabled={inputs.length === 1}
                                            className="text-red-600"
                                        >
                                            <CircleX className='w-4 h-4' />
                                        </button>
                                        <Input
                                            type="text"
                                            placeholder="Nom de la catégorie"
                                            value={input.libelle}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            className="border rounded px-3 py-2 w-full"
                                        />
                                    </div>
                                ))}
                                {editingIndex === null && (
                                    <button onClick={handleAddInput} className="text-lg text-font-bold flex items-center">
                                        <CirclePlus className='w-4 h-4 mr-1' />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center p-4 border-t dark:border-gray-600">
                                <Button className="w-full md:w-auto text-white px-5 py-2 mr-2" onClick={handleSubmit}>
                                    {editingIndex !== null ? 'Mettre à jour' : 'Créer'}
                                </Button>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setInputs([{ libelle: '' }]);
                                        setEditingIndex(null);
                                    }}
                                    className="bg-gray-200 px-5 py-2 rounded"
                                >
                                    Annuler
                                </button>
                            </div>

                            <div className="p-4 space-y-4">
                                <h2 className="text-2xl md:text-2xl tracking-tighter max-w-xl font-bold">Catégories existantes</h2>
                                <table className="min-w-full table-auto text-sm">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 border">ID</th>
                                            <th className="p-2 border">Nom</th>
                                            <th className="p-2 border">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.length > 0 ? (
                                            categories.map((cat, index) => (
                                                <tr key={cat.idcategories_gallery}>
                                                    <td className="border p-2">{cat.idcategories_gallery}</td>
                                                    <td className="border p-2">{cat.libelle}</td>
                                                    <td className="border p-2 space-x-2 text-center">
                                                        <Button variant="secondary" size="sm" onClick={() => handleEdit(index)}>
                                                            <Pencil className="w-3 h-3" />
                                                        </Button>
                                                        <Button variant="secondary" size="sm" onClick={() => handleDeleteClick(index)}>
                                                            <Trash2 className="w-3 h-3" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="text-center py-4 text-gray-500">
                                                    Aucune catégorie
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <AlertModal
                isOpen={showAlert}
                onClose={() => { setShowAlert(false); setSelectedIndexToDelete(null); }}
                onConfirm={confirmDelete}
                loading={false}
            />
        </div>
    );
};

export default CategorieGalleryModal;
