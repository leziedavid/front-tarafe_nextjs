'use client';

import React, { useState, useEffect } from 'react';
import { AlertModal } from './alert-modal';
import { Button } from '../ui/button';
import {
    fetchAllCategorieTransaction,
    createCategoryTransaction,
    updateCategoryTransaction,
    deleteCategoryTransaction
} from '@/servives/AdminService'; // 🔁 à adapter selon ton chemin
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CategorieTransaction } from '@/interfaces/AdminInterface';
import { CirclePlus, CircleX, Pencil, Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';


const CategorieModal = () => {
    
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState<CategorieTransaction[]>([]);
    const [inputs, setInputs] = useState([{ label: '', defautPrice: '' }]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedIndexToDelete, setSelectedIndexToDelete] = useState<number | null>(null);
    const token = 'votre_token'; // Remplace ceci par ton système d'auth

    const loadCategories = async () => {

        try {
            const result = await fetchAllCategorieTransaction(token);
            setCategories(result.data);

        } catch (error) {
            toast.error('Erreur lors du chargement des catégories');
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleAddInput = () => {
        setInputs([...inputs, { label: '', defautPrice: '' }]);
    };

    const handleRemoveInput = (index: number) => {
        const updated = [...inputs];
        updated.splice(index, 1);
        setInputs(updated);
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const updated = [...inputs];
        updated[index][field as 'label' | 'defautPrice'] = value;
        setInputs(updated);
    };

    const handleSubmit = async () => {
        try {
            if (editingIndex !== null) {
                const cat = categories[editingIndex];
                const data = {
                    id: cat.id,
                    label: inputs[0].label,
                    defautPrice: inputs[0].defautPrice,
                };
                const result = await updateCategoryTransaction(token, cat.id, data);
                if (result.statusCode !== 200) {
                    toast.error(result.message);
                } else {
                    toast.success('Catégorie mise à jour');
                    loadCategories();
                }
            } else {
                const payload = inputs.map((input) => ({
                    label: input.label,
                    defautPrice: input.defautPrice,
                }));
                const result = await createCategoryTransaction(token, payload);
                if (result.statusCode !== 200) {
                    toast.error(result.message);
                } else {
                    toast.success('Catégories créées');
                    loadCategories();
                }
            }

            setInputs([{ label: '', defautPrice: '' }]);
            setEditingIndex(null);
            setShowModal(false);
        } catch (err) {
            toast.error('Erreur lors de la soumission');
        }
    };

    const handleEdit = (index: number) => {
        const cat = categories[index];
        setInputs([{ label: cat.label, defautPrice: cat.defautPrice }]);
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
                const result = await deleteCategoryTransaction(token, cat.id);
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
            <Button  variant={'secondary'} className="w-full md:w-auto" onClick={() => setShowModal(true)}>
                Gérer les catégories de transactions
            </Button>

            {showModal && (
                <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-y-auto h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative w-full max-w-7xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-2xl md:text-2xl tracking-tighter max-w-xl font-bold">
                                    {editingIndex !== null ? 'Modifier' : 'Créer'} Catégorie(s)
                                </h3>
                                <Button variant="secondary" size="sm" onClick={() => { setShowModal(false); setInputs([{ label: '', defautPrice: '' }]); setEditingIndex(null); }} className="text-gray-400 hover:text-gray-900">
                                    <CircleX />
                                </Button>
                            </div>

                            <div className="p-4 md:p-5 space-y-4">
                                {inputs.map((input, index) => (
                                    <div key={index} className="flex space-x-2 items-center">
                                        <button
                                            onClick={() => handleRemoveInput(index)}
                                            disabled={inputs.length === 1}
                                            className="text-red-600  font-bold px-2"
                                        >
                                            <CircleX className='w-4 h-4' />
                                        </button>
                                        <Input
                                            type="text"
                                            placeholder="Nom de la catégorie"
                                            value={input.label}
                                            onChange={(e) => handleInputChange(index, 'label', e.target.value)}
                                            className="border rounded px-3 py-2 w-1/2"
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Prix par défaut"
                                            value={input.defautPrice}
                                            onChange={(e) => handleInputChange(index, 'defautPrice', e.target.value)}
                                            className="border rounded px-3 py-2 w-1/2"
                                        />
                                    </div>
                                ))}
                                {editingIndex === null && (
                                    <button onClick={handleAddInput} className=" text-font-bold flex items-center">
                                        <CirclePlus className='w-4 h-4 mr-1' />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center p-4 md:p-5 border-t dark:border-gray-600">
                                <Button className="w-full md:w-auto text-white px-5 py-2 rounded mr-2" onClick={handleSubmit}>
                                    {editingIndex !== null ? 'Mettre à jour' : 'Créer'}
                                </Button>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setInputs([{ label: '', defautPrice: '' }]);
                                        setEditingIndex(null);
                                    }}
                                    className="bg-gray-200 px-5 py-2 rounded"
                                >
                                    Annuler
                                </button>
                            </div>

                            <div className="p-4 md:p-5 space-y-4  z-50">
                                <h2 className="ttext-2xl md:text-2xl tracking-tighter max-w-xl font-bold">Catégories existantes</h2>
                                <table className="min-w-full table-auto ">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 border">ID</th>
                                            <th className="p-2 border">Nom</th>
                                            <th className="p-2 border">Prix</th>
                                            <th className="p-2 border">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.length > 0 ? (
                                            categories.map((cat, index) => (
                                                <tr key={cat.id} className="">
                                                    <td className="border p-2 ">{index}</td>
                                                    <td className="border p-2 ">{cat.label}</td>
                                                    <td className="border p-2 ">{cat.defautPrice} FCFA</td>

                                                    <td className="border p-2 space-x-2 text-center">
                                                        <Button variant="secondary" size="sm" onClick={() => handleEdit(index)} className="text-gray-400 hover:text-gray-900" >
                                                            <Pencil className="w-3 h-3" />
                                                        </Button>
                                                        <Button variant="secondary" size="sm" onClick={() => handleDeleteClick(index)} className="text-gray-400 hover:text-gray-900">
                                                            <Trash2 className="w-3 h-3 " />
                                                        </Button>
                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="text-center py-4 text-gray-500">
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

export default CategorieModal;
