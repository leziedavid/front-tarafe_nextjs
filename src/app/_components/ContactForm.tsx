"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Badge, CalendarClock, Computer, Mail, MapPin, MoveDownLeft, MoveRight, MoveUpRight, Phone, ScreenShare, Share, Smile } from "lucide-react";
import Image from "next/image";
import { PhoneInput, getPhoneData } from "@/components/phone-input";
import useAuth from '@/servives/useAuth';
import { Toaster } from '@/components/ui/sonner';

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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PiCheckLight } from "react-icons/pi";
import { Reglage } from "@/interfaces/HomeInterface";
import Skeleton from "react-loading-skeleton";
import { toast } from "sonner";
import { addContacts } from "@/servives/HomeService";

const FormSchema = z.object({
    phone: z.string(),
    nomPrenom: z.string(),
    email: z.string().email(),
    job_title: z.string(),
    company_name: z.string(),
    objets: z.enum(["Evaluate Bird for my company", "Learn More", "Get a Quote", "How to use Bird", "Other",
    ]),
    company_size: z.enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+",]), contents: z.string(),
});

interface FormValues {
    phone: string;
    nomPrenom: string;
    email: string;
    job_title: string;
    company_name: string;
    objets: | "Evaluate Bird for my company" | "Learn More" | "Get a Quote" | "How to use Bird" | "Other";
    company_size: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
    contents: string;
    terms: boolean;
};

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

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {

            const phoneData = getPhoneData(data.phone);
            if (!phoneData.isValid) {
                form.setError("phone", {
                    type: "manual",
                    message: "Invalid phone number",
                });
                return;
            }
            // toast.success("Phone number is valid");

            setLoading(true);
            const result = await addContacts(token, JSON.stringify(data));
            if (result.statusCode !== 200) {
                toast.error(result.message);
            } else {
                toast.error("Votre messages a bien été envoyé avec succès !");
            }

            setSubmitted(true);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    return (


        <>

            {/* <Toaster /> */}

            {isDataEmpty ? (

                <div className="w-full py-1 md:py-1 lg:py-1">
                    <div className="">
                        <div className=" w-full flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center">
                            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                        </div>
                    </div>
                </div>
            ) : (

                <>

                    <div className="w-full py-10 lg:py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-4 cursor-pointer">
                                <div className="bg-white rounded-lg px-4 py-6">
                                    <div className="bg-gray-100 w-full h-full rounded-xl p-6 md:p-12">
                                        <div>
                                            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">Contactez-nous</h2>
                                            <p className="text-gray-600">Votre adresse électronique ne sera pas publiée.</p>
                                            <p className="text-gray-600 font-bold text-sm">Les champs obligatoires sont marqués (*)</p>
                                            <div className="bg-gray-50 md:w-4/5 space-y-6 p-4 rounded-lg mt-4 shadow-sm">
                                                
                                                    <div className="flex gap-4 border-b ">
                                                        <MapPin className="w-8 h-8 mt-0 text-primary" />
                                                        <div className="font-extrabold font-title pb-4 w-80">  {data[0]?.localisation_reglages} </div>
                                                    </div>

                                                    <div className="flex gap-4 border-b">
                                                        <Phone className="w-8 h-8 mt-0 text-primary" />
                                                        <div className=" font-extrabold font-title pb-4 w-80">{data[0]?.phone1_reglages}  {data[0]?.phone2_reglages} </div>
                                                    </div>

                                                    <div className="flex gap-4  ">
                                                        <Mail className="w-8 h-8 mt-0 text-primary" />
                                                        <div className=" font-extrabold font-title pb-4 w-80">{data[0]?.email_reglages}</div>
                                                    </div>

                                                    <div className="flex gap-4  ">
                                                        <CalendarClock className="w-8 h-8 mt-2 text-primary" />
                                                        <div className="font-extrabold font-title pb-4 w-80">{data[0]?.ouverture_reglages}</div>
                                                    </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 cursor-pointer">
                                <div className="bg-white rounded-lg px-4 py-6">
                                    <div className="bg-gray-100 w-full h-full rounded-xl p-6 md:p-12">
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-6" >

                                                <div className="flex flex-col lg:flex-row gap-4 w-full">
                                                    {/* FormField pour le Nom et Prénom */}
                                                    <FormField
                                                        control={form.control}
                                                        name="nomPrenom"
                                                        render={({ field }) => (
                                                            <FormItem className="w-full lg:w-1/2">
                                                                <FormLabel className="text-sm font-extrabold font-title">Non & Prénom *</FormLabel>
                                                                <FormControl>
                                                                    <Input {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {/* FormField pour l'Email */}
                                                    <FormField
                                                        control={form.control}
                                                        name="email"
                                                        render={({ field }) => (
                                                            <FormItem className="w-full lg:w-1/2">
                                                                <FormLabel className="text-sm font-extrabold font-title">Email *</FormLabel>
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
                                                            <FormLabel>Phone</FormLabel>
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
                                                        <FormItem className="items-center justify-center  w-full">
                                                            <FormLabel className="w-60 text-sm font-extrabold font-title"> Comment pouvons-nous vous aider ? </FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select an option" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <div className="flex gap-4">
                                                                        <SelectItem value="Evaluate Bird for my company">
                                                                            Evaluate Bird for my company
                                                                        </SelectItem>
                                                                    </div>
                                                                    <SelectItem value="Learn More">Learn More</SelectItem>
                                                                    <SelectItem value="Get a Quote">Get a Quote</SelectItem>
                                                                    <SelectItem value="How to use Bird">
                                                                        How to use Bird
                                                                    </SelectItem>
                                                                    <SelectItem value="Other">Other</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="contents"
                                                    render={({ field }) => (
                                                        <FormItem className="items-center justify-center w-full">
                                                            <FormLabel className="w-60 text-sm font-extrabold font-title">Autre chose ? </FormLabel>
                                                            <FormControl>
                                                                <Textarea style={{ height: "100px" }} {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="flex gap-4 items-center">
                                                    <div>
                                                        <Checkbox className="text-[#6c6684]" />
                                                    </div>
                                                    <div className="text-xs font-extrabold font-title  md:w-3/4 mb-1">
                                                        {"J'accepte que tarafé m'envoie des communications marketing relatives à tarafé"}
                                                    </div>
                                                </div>

                                                <Button className="gap-4 w-full" disabled={loading} onClick={() => form.handleSubmit(onSubmit)}>
                                                    Envoyer le message <MoveRight className="w-4 h-4" />
                                                </Button>

                                            </form>
                                        </Form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </>
            )}

        </>
    );

};

export default ContactForm;