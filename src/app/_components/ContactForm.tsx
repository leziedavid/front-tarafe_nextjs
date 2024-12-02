"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarClock, Computer, Mail, MapPin, MoveRight, Phone, ScreenShare, Share, Smile } from "lucide-react";
import Image from "next/image";

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

const FormSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    job_title: z.string(),
    company_name: z.string(),
    help: z.enum(["Evaluate Bird for my company", "Learn More", "Get a Quote", "How to use Bird", "Other",
    ]),
    company_size: z.enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+",]), info: z.string(),
});

interface FormValues {
    first_name: string;
    last_name: string;
    email: string;
    job_title: string;
    company_name: string;
    help: | "Evaluate Bird for my company" | "Learn More" | "Get a Quote" | "How to use Bird" | "Other";
    company_size: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
    info: string;
    terms: boolean;
};

interface Props {
    data: Reglage[];
}

const ContactForm: React.FC<Props> = ({ data }) => {

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const isDataEmpty = data.length <= 0;

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            job_title: "",
            company_name: "",
            help: "Learn More",
            company_size: "1-10",
            info: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setLoading(true);
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Something went wrong");
            }

            setSubmitted(true);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    return (


        <>

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

                <div className="relative flex flex-col bg-[url('/hero.jpg')] bg-cover bg-center rounded-md p-4 lg:p-10 gap-8">
                    <div style={{ height: "100%", width: "100%", position: "relative", overflow: "hidden", }} className="md:flex bg-white justify-center pt-10 px-8">

                        <div>
                            <div className="font-bold text-4xl md:text-5xl tracking-tighter max-w-xl text-left font-bold mb-2">Contactez nous </div>
                            <div className="py-1 text-gray-500">Votre adresse électronique ne sera pas publiée.</div>
                            <div className="py-1 text-gray-500 font-bold text-sm">Les champs obligatoires sont marqués(*) </div>


                            <div className="bg-[#f6f5f4] md:w-4/5 space-y-6 p-4 rounded-lg my-4">
                                <div className="flex gap-4 border-b ">
                                    <MapPin className="w-8 h-8 mt-0 text-primary" />
                                    <div className="font-light pb-4 w-80">  {data[0]?.localisation_reglages} </div>
                                </div>

                                <div className="flex gap-4 border-b">
                                    <Phone className="w-8 h-8 mt-0 text-primary" />
                                    <div className=" font-light pb-4 w-80">{data[0]?.phone1_reglages}  {data[0]?.phone2_reglages} </div>
                                </div>

                                <div className="flex gap-4  ">
                                    <Mail className="w-8 h-8 mt-0 text-primary" />
                                    <div className=" font-light pb-4 w-80">{data[0]?.email_reglages}</div>
                                </div>

                                <div className="flex gap-4  ">
                                    <CalendarClock className="w-8 h-8 mt-2 text-primary" />
                                    <div className="font-light pb-4 w-80">{data[0]?.ouverture_reglages}</div>
                                </div>

                            </div>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-6" >

                                <FormField
                                    control={form.control} name="last_name"
                                    render={({ field }) => (
                                        <FormItem className="items-center justify-center  w-full">
                                            <FormLabel className="w-60 text-sm font-bold">Non & Prénon *</FormLabel>
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
                                        <FormItem className="items-center justify-center  w-full">
                                            <FormLabel className="text-sm font-bold">Email *
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="help"
                                    render={({ field }) => (
                                        <FormItem className="items-center justify-center  w-full">
                                            <FormLabel className="w-60 text-sm font-bold"> Comment pouvons-nous vous aider ? </FormLabel>
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
                                    name="info"
                                    render={({ field }) => (
                                        <FormItem className="items-center justify-center w-full">
                                            <FormLabel className="w-60 text-sm font-bold">Autre chose ? </FormLabel>
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
                                    <div className="text-xs font-light  md:w-3/4 mb-1">
                                        J'accepte que tarafé m&apos;envoie des communications marketing relatives à tarafé
                                    </div>
                                </div>

                                <Button className="gap-4 w-full" disabled={loading} onClick={() => form.handleSubmit(onSubmit)}>
                                    Envoyer le message <MoveRight className="w-4 h-4" />
                                </Button>

                            </form>
                        </Form>

                    </div>
                </div>


            )}

        </>
    );

};

export default ContactForm;