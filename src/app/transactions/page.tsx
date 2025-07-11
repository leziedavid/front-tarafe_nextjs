// app/components/TransactionForm.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CalendarIcon, HandCoins, PackagePlus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { transactionSchema } from '@/schemas/transactionSchema'; // ✅ IMPORT CORRIGÉ
import { z } from 'zod';
import Header from '../_components/Header';
import WhatsappFloatButton from '@/components/WhatsappFloatButton';
import Footer from '../_components/Footer';
import { Reglage } from '@/interfaces/HomeInterface';
import { CategorieTransaction } from '@/interfaces/AdminInterface';
import { DataTable as TransactionsTable } from '@/components/ui/table/data-table'; // Composant du tableau des commandes
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { fetchCategorieTransaction, submitTransaction } from '@/servives/AdminService';
import useAuth from '@/servives/useAuth';
import { useRouter } from 'next/navigation';

const categorieOptions = [
    { label: 'Alimentation', value: 'alimentation' },
    { label: 'Transport', value: 'transport' },
    { label: 'Loyer', value: 'loyer' },
    { label: 'Autre', value: 'autre' }
];

const typeOperationOptions = [
    'MOOV MONEY',
    'ORANGE MONEY',
    'MTN MONEY',
    'WAVE',
    'BANQUE',
    'NSP'
];

export default function TransactionForm() {

    const [listecategorie, seListecategorie] = useState<CategorieTransaction[]>([]); // Données des commandes
    const [reglage, setReglages] = useState<Reglage[]>([]);
    const token = useAuth();
    const inputDateRef = useRef<HTMLInputElement | null>(null); // ⬅️ référence à l'input
    const router = useRouter();
    const [categorieFilter, setCategorieFilter] = useState("");


    const [formData, setFormData] = useState({
        date: '',
        libelle: '',
        categorieTransactionsId: '',
        autreCategorie: '',
        typeTransaction: '', // ex: "entree_caisse"
        somme: '',           // ex: "50000"
        type_operation: '',
        details: "Transaction du jour faite par Bénédicte"
    });


    const [error, setError] = useState<string | null>(null);


    const chargerCategories = async (token: string | null) => {
        try {
            const result = await fetchCategorieTransaction(token); // Renomme ici si ton service a un nom différent
            if (result.statusCode !== 200) {
                toast.error(result.message);
            } else {
                seListecategorie(result.data); // Met à jour la liste des catégories
            }
        } catch (error) {
            toast.error("Erreur lors de la récupération des catégories.");
        }
    };


    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const dataToSave = {
            ...formData,
            categorieFinale:
                formData.categorieTransactionsId === 'autre'
                    ? formData.autreCategorie
                    : formData.categorieTransactionsId
        };

        // Validation avec Zod
        const result = transactionSchema.safeParse(dataToSave);

        if (!result.success) {
            const message = result.error.errors.map(err => err.message).join(', ');
            setError(message);
            console.error('Validation échouée :', message);
            return;
        }

        setError(null); // Réinitialiser l'erreur
        console.log('Données validées envoyées à la BD :', result.data);

        const response = await submitTransaction(token, result.data);


        if (response.statusCode === 201) {
            chargerCategories(token);
            toast.success(response.message || "Transaction enregistrée avec succès!");
        } else {
            toast.error(response.message || "Une erreur est survenue lors de l'enregistrement.");
        }
        // Réinitialiser le formulaire dans les deux cas
        const today = new Date().toISOString().split('T')[0];
        setFormData({
            date: today,
            libelle: '',
            categorieTransactionsId: '',
            autreCategorie: '',
            typeTransaction: '',
            somme: '',
            type_operation: '',
            details: 'Transaction du jour faite par Bénédicte'
        });

        router.push('/transactions');

    };


    useEffect(() => {
        chargerCategories(token);

        const today = new Date().toISOString().split('T')[0];
        setFormData((prev) => ({
            ...prev,
            date: today,
        }));

    },[]);


    return (

        <>
        
        <Header />

        <div className={`min-h-[calc(100vh_-_56px)] py-3 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
                {error && <p className="text-red-600 text-sm">{error}</p>}

                {/* Icône au centre et agrandie */}
                <div className="flex justify-center mb-4">
                    <HandCoins className="text-[#242078] w-24 h-24 " />
                </div>

                {/* Titre sous l'icône */}
                <h2 className="text-3xl font-bold text-center mb-6 uppercase">Enregistrement de Transaction</h2>


                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <div className="relative">
                            <Input
                                ref={inputDateRef} // ⬅️ lier la référence
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                            />
                            <CalendarIcon
                                className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                                size={20}
                                onClick={() => inputDateRef.current?.showPicker()} // ⬅️ déclenche l'ouverture du picker
                            />
                        </div>
                    </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Libellé</label>
                    <Input
                        value={formData.libelle}
                        onChange={(e) => handleChange('libelle', e.target.value)}
                        placeholder="Ex: Achat essence"
                    />
                </div>
                
                {/*
                <div>
                    <label className="block text-sm font-medium mb-1">Catégorie</label>
                    <Select onValueChange={(value) => handleChange('categorieTransactionsId', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choisir une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                            {listecategorie.map((cat) => (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div> */}


                    <div>
                        <label className="block text-sm font-medium mb-1">Catégorie</label>
                        <Select onValueChange={(value) => handleChange('categorieTransactionsId', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choisir une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Barre de recherche */}
                                <div className="p-2">
                                    <Input
                                        type="text"
                                        placeholder="Rechercher une catégorie..."
                                        value={categorieFilter}
                                        onChange={(e) => setCategorieFilter(e.target.value)}
                                        className="w-full px-2 py-1 border rounded text-sm"
                                    />
                                </div>

                                {/* Liste filtrée */}
                                {listecategorie
                                    .filter((cat) =>
                                        cat.label.toLowerCase().includes(categorieFilter.toLowerCase())
                                    )
                                    .map((cat) => (
                                        <SelectItem key={cat.id} value={String(cat.id)}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}

                                {/* Option "Autre" */}
                                <SelectItem value="autre">Autre</SelectItem>

                                {/* Aucun résultat */}
                                {listecategorie.filter((cat) =>
                                    cat.label.toLowerCase().includes(categorieFilter.toLowerCase())
                                ).length === 0 && (
                                        <div className="px-4 py-2 text-sm text-gray-500">Aucune catégorie trouvée</div>
                                    )}
                            </SelectContent>
                        </Select>
                    </div>

                    {formData.categorieTransactionsId === 'autre' && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Autre catégorie (optionnel)</label>
                            <Input
                                value={formData.autreCategorie}
                                onChange={(e) => handleChange('autreCategorie', e.target.value)}
                                placeholder="Nom de la catégorie"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">Type de transaction</label>
                        <Select onValueChange={(value) => handleChange('typeTransaction', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choisir un type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="entree_caisse">Entrée caisse</SelectItem>
                                <SelectItem value="entree_banque">Entrée banque</SelectItem>
                                <SelectItem value="sortie_caisse">Sortie caisse</SelectItem>
                                <SelectItem value="sortie_banque">Sortie banque</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {formData.typeTransaction && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-1">Montant</label>
                            <Input
                                type="number"
                                placeholder="Entrez le montant"
                                value={formData.somme}
                                onChange={(e) => handleChange('somme', e.target.value)}
                            />
                        </div>
                    )}


                <div>
                <label className="block text-sm font-medium mb-1">Type d&apos;opération</label>
                    <Select onValueChange={(value) => handleChange('type_operation', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            {typeOperationOptions.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Détails</label>
                    <Textarea
                        value={formData.details}
                        onChange={(e) => handleChange('details', e.target.value)}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Enregistrer la transaction
                </Button>
            </form>
        </div>

        <Toaster />
        <WhatsappFloatButton />
        </>

    );
}
