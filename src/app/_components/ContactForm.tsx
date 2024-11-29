"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

import { CalendarClock, Computer, Mail, MapPin, MoveRight, Phone, ScreenShare, Share, Smile } from "lucide-react";

import Image from "next/image";

import { Checkbox } from "@/components/ui/Checkbox";

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

// import { useToast } from "@/components/ui/use-toast";

import { Textarea } from "@/components/ui/textarea";
import { PiCheckLight } from "react-icons/pi";

const FormSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    job_title: z.string(),
    company_name: z.string(),
    help: z.enum(["Evaluate Bird for my company","Learn More","Get a Quote","How to use Bird","Other",
    ]),
    company_size: z.enum(["1-10","11-50","51-200","201-500","501-1000","1000+",]),info: z.string(),
});

interface FormValues {
    first_name: string;
    last_name: string;
    email: string;
    job_title: string;
    company_name: string;
    help:| "Evaluate Bird for my company"| "Learn More"| "Get a Quote"| "How to use Bird"| "Other";
    company_size: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
    info: string;
    terms: boolean;
};

export default function ContactForm() {

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    // const { toast } = useToast();

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
            // toast({
            //     title: "Error",
            //     description: "Something went wrong",
            // });
        } finally {
            setLoading(false);
        }
    }

    return (

        <div style={{  height: "100%", width: "100%",position: "relative", overflow: "hidden", }} className="md:flex  justify-center pt-20 px-8">
            
            <div>
                <div className="font-bold text-lg text-4xl tracking-tighter max-w-xl text-left font-bold"> Contactez notre équipe de vente </div>
                <div className="py-2 text-gray-500 w-2/3">Votre adresse électronique ne sera pas publiée. Les champs obligatoires sont marqués * </div>

                <div className="bg-[#f6f5f4] md:w-4/5 space-y-6 p-4 rounded-lg my-4">
                    <div className="flex gap-4 border-b ">
                        <MapPin className="w-8 h-8 mt-0 text-primary" />
                        <div className=" font-normal pb-4 w-80"> Nous sommes basés à Abidjan en Côte d’Ivoire.. </div>
                    </div>

                    <div className="flex gap-4 border-b">
                        <Phone className="w-8 h-8 mt-0 text-primary" />
                        <div className=" font-normal pb-4 w-80"> +225 0747003450 -</div>
                    </div>

                    <div className="flex gap-4  ">
                        <Mail className="w-8 h-8 mt-0 text-primary"/>
                        <div className=" font-normal pb-4 w-80">contact@tarafe.com </div>
                    </div>

                    <div className="flex gap-4  ">
                        <CalendarClock className="w-8 h-8 mt-2 text-primary" />
                        <div className=" font-normal pb-4 w-80">  Nous sommes joignables de 9h à 20h (du lundi au samedi)</div>
                    </div>

                </div>
            </div>

            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >

                        {/* <div className="md:flex items-center gap-6 ">
                            
                            <FormField control={form.control} name="first_name"
                                render={({ field }) => (
                                    <FormItem className="items-center justify-center  w-full">
                                        <FormLabel className="text-sm ">
                                           Nom & prenom *</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control} name="last_name"
                                render={({ field }) => (
                                    <FormItem className="items-center justify-center  w-full">
                                        <FormLabel className="w-60 text-sm ">Last name *</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div> */}

                        <FormField
                                control={form.control} name="last_name"
                                render={({ field }) => (
                                    <FormItem className="items-center justify-center  w-full">
                                        <FormLabel className="w-60 text-sm ">Last name *</FormLabel>
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
                                    <FormLabel className=" text-sm">Email *
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* <FormField
                            control={form.control}
                            name="company_name"
                            render={({ field }) => (
                                <FormItem className="items-center justify-center  w-full">
                                    <FormLabel className="w-60 text-sm">
                                        Company name *
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        /> */}


                        {/* <FormField
                            control={form.control}
                            name="company_size"
                            render={({ field }) => (
                                <FormItem className="items-center justify-center w-full">
                                    <FormLabel className="w-60 text-sm ">
                                        Company size*
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <div className="flex gap-4">
                                                <SelectItem value="1-10">1-10</SelectItem>
                                            </div>
                                            <SelectItem value="11-50">11-50</SelectItem>
                                            <SelectItem value="51-200">51-200</SelectItem>
                                            <SelectItem value="501-1000">501-1000</SelectItem>
                                            <SelectItem value="1000+">1000+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        /> */}

                        <FormField
                            control={form.control}
                            name="help"
                            render={({ field }) => (
                                <FormItem className="items-center justify-center  w-full">
                                    <FormLabel className="w-60 text-sm   ">
                                    Comment pouvons-nous vous aider ?
                                    </FormLabel>
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
                                    <FormLabel className="w-60 text-sm   ">
                                        Autre chose ?
                                    </FormLabel>
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
    );
}