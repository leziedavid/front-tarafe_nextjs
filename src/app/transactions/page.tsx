// app/components/TransactionForm.tsx

'use client';

import { useEffect, useState } from 'react';
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


    const [reglage, setReglages] = useState<Reglage[]>([]);

    const [formData, setFormData] = useState({
        date: '',
        libelle: '',
        categorieTransactionsId: '',
        autreCategorie: '',
        sortie_caisse: '',
        sortie_banque: '',
        entree_caisse: '',
        entree_banque: '',
        type_operation: '',
        details: "Transaction du jour faite par Bénédicte"
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
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

        // Exemple d'envoi API
        // await fetch('/api/transactions', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(result.data),
        // });
    };


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
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleChange('date', e.target.value)}
                        />
                        <CalendarIcon className="absolute right-3 top-2.5 text-gray-400" size={20} />
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

                <div>
                    <label className="block text-sm font-medium mb-1">Catégorie</label>
                    <Select onValueChange={(value) => handleChange('categorieTransactionsId', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choisir une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                            {categorieOptions.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </SelectItem>
                            ))}
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

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Sortie caisse</label>
                        <Input
                            type="number"
                            value={formData.sortie_caisse}
                            onChange={(e) => handleChange('sortie_caisse', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Sortie banque</label>
                        <Input
                            type="number"
                            value={formData.sortie_banque}
                            onChange={(e) => handleChange('sortie_banque', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Entrée caisse</label>
                        <Input
                            type="number"
                            value={formData.entree_caisse}
                            onChange={(e) => handleChange('entree_caisse', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Entrée banque</label>
                        <Input
                            type="number"
                            value={formData.entree_banque}
                            onChange={(e) => handleChange('entree_banque', e.target.value)}
                        />
                    </div>
                </div>

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
        <WhatsappFloatButton />
        </>

    );
}
