'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CalendarIcon, HandCoins, X } from 'lucide-react';
import WhatsappFloatButton from '@/components/WhatsappFloatButton';
import { fetchCategorieTransaction, submitTransaction, updateTransaction } from '@/servives/AdminService';
import { transactionSchema } from '@/schemas/transactionSchema';
import { CategorieTransaction, Transaction } from '@/interfaces/AdminInterface';
import useAuth from '@/servives/useAuth';

type TransacProps = {
    initialValues?: Transaction;
    isOpen: boolean;
    onClose: () => void;
    fetchData: () => void;
};

export default function TransacModal({ initialValues, isOpen, onClose, fetchData }: TransacProps) {
    const token = useAuth();
    const router = useRouter();
    const [listecategorie, setListecategorie] = useState<CategorieTransaction[]>([]);
    const inputDateRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchCategorie, setSearchCategorie] = useState("");

    const [formData, setFormData] = useState({
        id: initialValues?.id || undefined,
        date: initialValues?.date || '',
        libelle: initialValues?.libelle || '',
        categorieTransactionsId: (initialValues as any)?.categorieTransactionsId?.toString() || '',
        autreCategorie: '',
        typeTransaction: determineType(initialValues),
        somme: initialValues ? determineSum(initialValues) : '',
        type_operation: initialValues?.type_operation || '',
        details: initialValues?.details || '',
    });

    function determineType(tr?: Transaction) {
        if (!tr) return '';
        if (tr.entree_caisse && +tr.entree_caisse > 0) return 'entree_caisse';
        if (tr.entree_banque && +tr.entree_banque > 0) return 'entree_banque';
        if (tr.sortie_caisse && +tr.sortie_caisse > 0) return 'sortie_caisse';
        if (tr.sortie_banque && +tr.sortie_banque > 0) return 'sortie_banque';
        return '';
    }
    type TransactionTypeKey = 'entree_caisse' | 'entree_banque' | 'sortie_caisse' | 'sortie_banque';

    function determineSum(tr: Transaction) {
        const type = determineType(tr) as TransactionTypeKey | '';
        if (type && ['entree_caisse', 'entree_banque', 'sortie_caisse', 'sortie_banque'].includes(type)) {
            return tr[type as keyof Pick<Transaction, TransactionTypeKey>] ?? '';
        }
        return '';
    }

    useEffect(() => {
        if (initialValues) {
            setFormData(f => ({
                ...f,
                id: initialValues.id,
                date: initialValues.date,
                libelle: initialValues.libelle,
                categorieTransactionsId: (initialValues as any)?.categorieTransactionsId?.toString() || '',
                typeTransaction: determineType(initialValues),
                somme: determineSum(initialValues),
                type_operation: initialValues.type_operation ?? '',
                details: initialValues.details ?? ''
            }));
        }
    }, [initialValues]);

    useEffect(() => {
        async function load() {
            const res = await fetchCategorieTransaction(token);
            if (res.statusCode === 200) setListecategorie(res.data);
            else toast.error(res.message);
        }
        load();
    }, []);

    const handleChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            somme: formData.somme,
            categorieFinale: formData.categorieTransactionsId === 'autre' ? formData.autreCategorie : formData.categorieTransactionsId
        };

        const parsed = transactionSchema.safeParse(payload);
        if (!parsed.success) {
            setError(parsed.error.errors.map(e => e.message).join(', '));
            setIsSubmitting(false);
            return;
        }

        try {
            let res;
            if (formData.id) {
                res = await updateTransaction(token, formData.id, parsed.data);
            } else {
                res = await submitTransaction(token, parsed.data);
            }

            if (res.statusCode === 200 || res.statusCode === 201) {
                toast.success(res.message);
                fetchData();
                onClose();
            } else toast.error(res.message);

        } catch (err) {
            toast.error("Erreur serveur");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`fixed inset-0 bg-black/50 z-50 ${!isOpen && 'hidden'}`}>
            <div className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0 w-full md:w-1/2' : 'translate-x-full'} bg-white shadow-xl`}>
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-semibold uppercase">
                        {formData.id ? 'Modifier la transaction' : 'Nouvelle transaction'}
                    </h5>
                    <Button variant="ghost" onClick={onClose}><X /></Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-600">{error}</p>}

                    {/* Date */}
                    <div>
                        <Input type="date" ref={inputDateRef} value={formData.date} onChange={e => handleChange('date', e.target.value)} />
                        {/* <CalendarIcon className="absolute right-3 top-2.5 cursor-pointer" onClick={() => inputDateRef.current?.showPicker()} /> */}
                    </div>

                    {/* Libellé */}
                    <Input placeholder="Libellé" value={formData.libelle} onChange={e => handleChange('libelle', e.target.value)} />

                    {/* Catégorie */}

                    {/* <Select value={formData.categorieTransactionsId} onValueChange={v => handleChange('categorieTransactionsId', v)}>
                        <SelectTrigger><SelectValue placeholder="Catégorie" /></SelectTrigger>
                        <SelectContent>
                            {listecategorie.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.label}</SelectItem>)}
                            <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                    </Select> */}

                    <Select value={formData.categorieTransactionsId} onValueChange={v => handleChange('categorieTransactionsId', v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <div className="p-2">
                                <Input type="text" placeholder="Rechercher..." value={searchCategorie} onChange={(e) => setSearchCategorie(e.target.value)} className="w-full px-2 py-1 border rounded text-sm" />
                            </div>

                            {listecategorie
                                .filter((c) => c.label.toLowerCase().includes(searchCategorie.toLowerCase()))
                                .map((c) => (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                        {c.label}
                                    </SelectItem>
                                ))
                            }

                            <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                    </Select>

                    {formData.categorieTransactionsId === 'autre' && <Input placeholder="Autre catégorie" value={formData.autreCategorie} onChange={e => handleChange('autreCategorie', e.target.value)} />}

                    {/* Type transaction */}
                    <Select value={formData.typeTransaction} onValueChange={v => handleChange('typeTransaction', v)}>
                        <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="entree_caisse">Entrée caisse</SelectItem>
                            <SelectItem value="entree_banque">Entrée banque</SelectItem>
                            <SelectItem value="sortie_caisse">Sortie caisse</SelectItem>
                            <SelectItem value="sortie_banque">Sortie banque</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Montant */}
                    {formData.typeTransaction && (
                        <Input type="number" placeholder="Montant" value={formData.somme} onChange={e => handleChange('somme', e.target.value)} />
                    )}

                    {/* Type d'opération */}
                    <Select value={formData.type_operation} onValueChange={v => handleChange('type_operation', v)}>
                        <SelectTrigger><SelectValue placeholder="Opération" /></SelectTrigger>
                        <SelectContent>
                            {['MOOV MONEY', 'ORANGE MONEY', 'MTN MONEY', 'WAVE', 'BANQUE', 'NSP'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    {/* Détails */}
                    <Textarea placeholder="Détails" value={formData.details} onChange={e => handleChange('details', e.target.value)} />

                    <div className="flex justify-end gap-2">
                        <Button type="button" onClick={onClose}>Annuler</Button>
                        <Button type="submit" disabled={isSubmitting}>{formData.id ? 'Mettre à jour' : 'Créer'}</Button>
                    </div>
                </form>

                <Toaster />
            </div>
        </div>
    );
}
