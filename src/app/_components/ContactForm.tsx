"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    CalendarClock,
    Mail,
    MapPin,
    Phone,
    MoveRight,
} from "lucide-react";
import { PhoneInput, getPhoneData } from "@/components/phone-input";
import useAuth from "@/servives/useAuth";
import { toast } from "sonner";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Reglage } from "@/interfaces/HomeInterface";
import { addContacts } from "@/servives/HomeService";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ Skeleton shadcn

const FormSchema = z.object({
    phone: z.string(),
    nomPrenom: z.string(),
    email: z.string().email(),
    job_title: z.string(),
    company_name: z.string(),
    objets: z.enum([
        "Evaluate Bird for my company",
        "Learn More",
        "Get a Quote",
        "How to use Bird",
        "Other",
    ]),
    company_size: z.enum([
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1000+",
    ]),
    contents: z.string(),
});

interface FormValues {
    phone: string;
    nomPrenom: string;
    email: string;
    job_title: string;
    company_name: string;
    objets:
    | "Evaluate Bird for my company"
    | "Learn More"
    | "Get a Quote"
    | "How to use Bird"
    | "Other";
    company_size:
    | "1-10"
    | "11-50"
    | "51-200"
    | "201-500"
    | "501-1000"
    | "1000+";
    contents: string;
    terms: boolean;
}

interface Props {
    data: Reglage[];
}

const ContactForm: React.FC<Props> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const isDataEmpty = data.length <= 0;
    const token = useAuth();

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            phone: "",
            nomPrenom: "",
            email: "",
            job_title: "",
            company_name: "",
            objets: "Learn More",
            company_size: "1-10",
            contents: "",
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            const phoneData = getPhoneData(values.phone);
            if (!phoneData.isValid) {
                form.setError("phone", {
                    type: "manual",
                    message: "Invalid phone number",
                });
                return;
            }

            setLoading(true);
            const result = await addContacts(token, JSON.stringify(values));
            if (result.statusCode !== 200) {
                toast.error(result.message);
            } else {
                toast.success("Votre message a bien été envoyé !");
            }
            setSubmitted(true);
        } catch (error) {
            toast.error("Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {isDataEmpty ? (
                // ✅ Skeleton Loader
                <div className="w-full py-10 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Skeleton */}
                        <div className="bg-white rounded-lg px-4 py-6">
                            <div className="bg-gray-100 w-full h-full rounded-xl p-6 md:p-12 flex flex-col gap-6">
                                <Skeleton className="h-8 w-2/3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <div className="flex gap-4 mt-4">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-6 w-2/3" />
                                </div>
                                <div className="flex gap-4">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-6 w-2/3" />
                                </div>
                                <div className="flex gap-4">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-6 w-2/3" />
                                </div>
                            </div>
                        </div>

                        {/* Right Skeleton (form) */}
                        <div className="bg-white rounded-lg px-4 py-6">
                            <div className="bg-gray-100 w-full h-full rounded-xl p-6 md:p-12 flex flex-col gap-4">
                                <Skeleton className="h-8 w-1/2" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-10 w-full mt-4" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-10 w-1/3 mt-4" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // ✅ Form réel
                <div className="w-full py-10 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left - Infos */}
                        <div className="flex flex-col gap-4 cursor-pointer">
                            <div className="bg-white rounded-lg px-4 py-6">
                                <div className="bg-gray-100 w-full h-full rounded-xl p-6 md:p-12">
                                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">
                                        Contactez-nous
                                    </h2>
                                    <p className="text-gray-600">
                                        Votre adresse électronique ne sera pas publiée.
                                    </p>
                                    <p className="text-gray-600 font-bold text-sm">
                                        Les champs obligatoires sont marqués (*)
                                    </p>

                                    <div className="bg-gray-50 md:w-4/5 space-y-6 p-4 rounded-lg mt-4 shadow-sm">
                                        <div className="flex gap-4 border-b">
                                            <MapPin className="w-8 h-8 text-orange-500" />
                                            <div className="font-extrabold font-title pb-4 w-80">
                                                {data[0]?.localisation_reglages}
                                            </div>
                                        </div>
                                        <div className="flex gap-4 border-b">
                                            <Phone className="w-8 h-8 text-orange-500" />
                                            <div className="font-extrabold font-title pb-4 w-80">
                                                {data[0]?.phone1_reglages} {data[0]?.phone2_reglages}
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Mail className="w-8 h-8 text-orange-500" />
                                            <div className="font-extrabold font-title pb-4 w-80">
                                                {data[0]?.email_reglages}
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <CalendarClock className="w-8 h-8 text-orange-500" />
                                            <div className="font-extrabold font-title pb-4 w-80">
                                                {data[0]?.ouverture_reglages}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Form */}
                        <div className="flex flex-col gap-4 cursor-pointer">
                            <div className="bg-white rounded-lg px-4 py-6">
                                <div className="bg-gray-100 w-full h-full rounded-xl p-6 md:p-12">
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(onSubmit)}
                                            className="space-y-4 mb-6"
                                        >
                                            <div className="flex flex-col lg:flex-row gap-4 w-full">
                                                <FormField
                                                    control={form.control}
                                                    name="nomPrenom"
                                                    render={({ field }) => (
                                                        <FormItem className="w-full lg:w-1/2">
                                                            <FormLabel>Nom & Prénom *</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem className="w-full lg:w-1/2">
                                                            <FormLabel>Email *</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Téléphone</FormLabel>
                                                        <FormControl>
                                                            <PhoneInput {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Entrez un numéro de téléphone valide avec le pays
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="objets"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Comment pouvons-nous vous aider ?
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Sélectionnez une option" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Personnalisation produit pour particulier">
                                                                    Je souhaite personnaliser un produit
                                                                    (particulier)
                                                                </SelectItem>
                                                                <SelectItem value="Commande en gros pour entreprise">
                                                                    Je veux passer une commande en gros pour mon
                                                                    entreprise
                                                                </SelectItem>
                                                                <SelectItem value="Demande de devis">
                                                                    J’aimerais obtenir un devis
                                                                </SelectItem>
                                                                <SelectItem value="Création sur-mesure avec tissus locaux">
                                                                    Je veux créer un produit sur-mesure avec des
                                                                    tissus africains
                                                                </SelectItem>
                                                                <SelectItem value="Collaboration ou partenariat">
                                                                    Je suis intéressé(e) par un partenariat ou une
                                                                    collaboration
                                                                </SelectItem>
                                                                <SelectItem value="Plus d’informations sur Tarafé">
                                                                    Je veux en savoir plus sur Tarafé
                                                                </SelectItem>
                                                                <SelectItem value="Autre">
                                                                    Autre demande
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="contents"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Autre chose ?</FormLabel>
                                                        <FormControl>
                                                            <Textarea style={{ height: "100px" }} {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="flex gap-4 items-center">
                                                <Checkbox />
                                                <div className="text-xs font-extrabold font-title md:w-3/4">
                                                    {`J'accepte que tarafé m'envoie des communications marketing relatives à tarafé`}
                                                </div>
                                            </div>

                                            <Button
                                                className="gap-4 w-full"
                                                disabled={loading}
                                                type="submit"
                                            >
                                                Envoyer le message <MoveRight className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactForm;
