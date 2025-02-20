'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react"; // Assurez-vous d'importer le bon icône pour le terminal
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Toaster } from 'sonner';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
// Chargement dynamique de l'éditeur Quill
const QuillEditor = dynamic(() => import("@/components/ui/QuillEditor"), { ssr: false });
import { Label } from "@/components/ui/label";


// Définir le schéma Zod pour valider les données
const productSchema = z.object({
    name: z.string().min(1, "Le nom du produit est requis"),
    slug: z.string().min(1, "Le slug du produit est requis").regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des lettres minuscules, des chiffres et des tirets"),
    description: z.string().optional(),
    price: z.number().min(0.01, "Le prix doit être supérieur à 0"),
    pricePromo: z.number().min(0.01, "Le prix promo doit être supérieur à 0").optional(),
    stockStatus: z.enum(['En stock', 'Rupture de stock', 'En réapprovisionnement']),
    mainImage: z.string().min(1, "Une image principale est requise"),
    otherImages: z.array(z.string()).min(1, "Au moins une image supplémentaire est requise"),
    weight: z.number().min(0.01, "Le poids doit être supérieur à 0"),
    dimensions: z.object({
        length: z.number().min(0.01, "La longueur doit être supérieure à 0"),
        width: z.number().min(0.01, "La largeur doit être supérieure à 0"),
        height: z.number().min(0.01, "La hauteur doit être supérieure à 0")
    }),
    tvaId: z.number().optional(),
    tvaClassId: z.string().optional(),
    state: z.string().optional(),
    isIndividualSale: z.boolean(),
    purchaseLimit: z.number().optional(),
    modePay: z.string().optional(),
    payMethod: z.string().optional()
});

// Données d'exemple pour les catégories, sous-catégories, TVA, mode de paiement
const dataSousCategorie = [
    { id: '1', name: 'Sous-catégorie 1' },
    { id: '2', name: 'Sous-catégorie 2' },
    { id: '3', name: 'Sous-catégorie 3' },
];

const dataCategorie = [
    { id: '1', name: 'Catégorie A' },
    { id: '2', name: 'Catégorie B' },
    { id: '3', name: 'Catégorie C' },
];

const dataTvaClassId = [
    { id: '1', name: 'TVA 5%' },
    { id: '2', name: 'TVA 10%' },
    { id: '3', name: 'TVA 20%' },
];

const dataTvaId = [
    { id: '1', name: 'TVA standard' },
    { id: '2', name: 'TVA réduite' },
];

const dataModePay = [
    { id: '1', name: 'Carte bancaire' },
    { id: '2', name: 'Virement bancaire' },
    { id: '3', name: 'PayPal' },
];

const dataPayMethod = [
    { id: '1', name: 'Paiement en ligne' },
    { id: '2', name: 'Paiement à la livraison' },
];

// Fonction pour gérer la soumission du formulaire
const ProductCreatePage = () => {
    const [productData, setProductData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        pricePromo: '',
        stockStatus: 'En stock',
        mainImage: '',
        otherImages: [],
        weight: '',
        dimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        tvaId: '',
        tvaClassId: '',
        state: '',
        isIndividualSale: false,
        purchaseLimit: '',
        modePay: '',
        payMethod: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
            setProductData(prevData => ({
                ...prevData,
                [name]: fileArray
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation via Zod
        try {
            productSchema.parse(productData);
            // Si la validation passe, simuler la soumission du formulaire
            alert('Produit créé avec succès!');
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors: { [key: string]: string } = {};
                err.errors.forEach(error => {
                    newErrors[error.path[0]] = error.message;
                });
                setErrors(newErrors);
            }
        }
    };

    return (

      <PageContainer>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading title="Ajouter un nouveau produit"  description="." />
          <Button variant="secondary" size="sm" >  ok </Button>
        </div>
        <Toaster />

        <Separator />


        <form onSubmit={handleSubmit}>
                {/* Informations sur le produit */}
                <section className="mb-8">

                    <Alert className="mb-4">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Informations sur le produit</AlertTitle>
                        <AlertDescription>
                            Remplissez les informations de base concernant le produit, telles que le nom, le slug et le prix.
                        </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <Label htmlFor="name" className="block text-sm font-semibold">Nom du produit</Label>
                            <Input
                                id="name"
                                name="name"
                                value={productData.name}
                                onChange={handleChange}
                                placeholder="Nom du produit"
                                className="mt-1 w-full"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="slug" className="block text-sm font-semibold">Slug</Label>
                            <Input
                                id="slug"
                                name="slug"
                                value={productData.slug}
                                onChange={handleChange}
                                placeholder="Slug"
                                className="mt-1 w-full"
                            />
                            {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
                        </div>

                        <div>
                            <Label htmlFor="price" className="block text-sm font-semibold">Prix</Label>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                placeholder="Prix"
                                className="mt-1 w-full"
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                        </div>

                        <div>
                            <Label htmlFor="price" className="block text-sm font-semibold">Prix Promo</Label>
                            <Input
                                type="number"
                                id="pricePromo"
                                name="pricePromo"
                                value={productData.pricePromo}
                                onChange={handleChange}
                                placeholder="Prix"
                                className="mt-1 w-full"
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.pricePromo}</p>}
                        </div>

                    </div>

                    <div>
                  <Label htmlFor="description" className="block text-sm font-semibold">Description</Label>
                  <QuillEditor
                    value={productData.description}
                    // Passer directement la valeur au lieu d'utiliser handleChange
                    onChange={(value) => setProductData(prevData => ({
                      ...prevData,
                      description: value
                    }))}
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                </section>

            <section className="mb-8">
              <Alert className="mb-4">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Sélection des options</AlertTitle>
                <AlertDescription>
                  Choisissez des options supplémentaires, comme la catégorie et la méthode de paiement.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Categorie */}
                <div className="mb-4">
                  <Label htmlFor="category" className="block text-sm font-semibold">Catégorie</Label>
                  <Select  value={productData.tvaClassId}
                    onValueChange={(value) => setProductData({ ...productData, tvaClassId: value })} >
                    <SelectTrigger className="w-full"> {/* Remplacement de w-[180px] par w-full */}
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataCategorie.map((item) => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sous-Catégorie */}
                <div className="mb-4">
                  <Label htmlFor="subCategory" className="block text-sm font-semibold">Sous-Catégorie</Label>
                  <Select
                    value={productData.tvaId}
                    onValueChange={(value) => setProductData({ ...productData, tvaId: value })}
                  >
                    <SelectTrigger className="w-full"> {/* Remplacement de w-[180px] par w-full */}
                      <SelectValue placeholder="Choisir une sous-catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataSousCategorie.map((item) => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* TVA Class */}
                <div className="mb-4">
                  <Label htmlFor="tvaClass" className="block text-sm font-semibold">Classe TVA</Label>
                  <Select
                    value={productData.tvaClassId}
                    onValueChange={(value) => setProductData({ ...productData, tvaClassId: value })}
                  >
                    <SelectTrigger className="w-full"> {/* Remplacement de w-[180px] par w-full */}
                      <SelectValue placeholder="Choisir une classe TVA" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataTvaClassId.map((item) => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mode de paiement */}
                <div className="mb-4">
                  <Label htmlFor="modePay" className="block text-sm font-semibold">Mode de paiement</Label>
                  <Select
                    value={productData.modePay}
                    onValueChange={(value) => setProductData({ ...productData, modePay: value })}
                  >
                    <SelectTrigger className="w-full"> {/* Remplacement de w-[180px] par w-full */}
                      <SelectValue placeholder="Choisir un mode de paiement" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataModePay.map((item) => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Méthode de paiement */}
                <div className="mb-4">
                  <Label htmlFor="payMethod" className="block text-sm font-semibold">Méthode de paiement</Label>
                  <Select
                    value={productData.payMethod}
                    onValueChange={(value) => setProductData({ ...productData, payMethod: value })}
                  >
                    <SelectTrigger className="w-full"> {/* Remplacement de w-[180px] par w-full */}
                      <SelectValue placeholder="Choisir une méthode" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataPayMethod.map((item) => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

            </section>


                {/* Images du produit */}
                <section>
                  <Alert className="mb-4">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Images du produit</AlertTitle>
                        <AlertDescription>
                            Ajoutez les images principales et supplémentaires pour le produit.
                        </AlertDescription>
                    </Alert>
                    <div>
                        <Label htmlFor="mainImage" className="block text-sm font-semibold">Image principale</Label>
                        <Input
                            id="mainImage"
                            name="mainImage"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 w-full"
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="otherImages" className="block text-sm font-semibold">Autres images</Label>
                        <Input
                            id="otherImages"
                            name="otherImages"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="mt-1 w-full"
                        />
                    </div>
                </section>

                {/* Bouton de soumission */}
                <div className="mt-8 ">
                    <Button className="text-white" type="submit">Créer le produit</Button>
                </div>
        </form>



      </div>
    </PageContainer>

    );
};

export default ProductCreatePage;
