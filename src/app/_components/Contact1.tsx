"use client";

import {CalendarClock, Check, Mail, MapPin, MoveRight, Phone, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"


export const Contact1 = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        
        <div className=" px-4 px-5 w-full py-10 lg:py-0 mb-10">
            <div className="container max-w-6xl mx-auto">

                <div className="grid lg:grid-cols-2 gap-10">

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">

                            <div className="flex flex-col gap-2">
                                <h4 className="text-lg md:text-5xl tracking-tighter max-w-xl text-left font-bold">
                                    CONTACTEZ NOUS
                                </h4>
                                <p className="text-sm leading-relaxed tracking-tight text-muted-foreground max-w-sm text-left">Votre adresse électronique ne sera pas publiée. Les champs obligatoires sont marqués *
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start text-left">
                            <MapPin className="w-10 h-10 mt-0 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p className="font-bold">Adresse</p>
                                <p className="text-muted-foreground text-sm">
                                    Nous sommes basés à Abidjan en Côte d’Ivoire..
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start text-left">
                            
                            <Phone className="w-10 h-10 mt-0 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p className="font-bold">Contact</p>
                                <p className="text-muted-foreground text-sm"> +225 0747003450 - </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-6 items-start text-left">
                            
                            <Mail className="w-10 h-10 mt-0 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p className="font-bold">Mail</p>
                                <p className="text-muted-foreground text-sm">contact@tarafe.com </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-6 items-start text-left">
                            <CalendarClock className="w-10 h-10 mt-2 text-primary" />
                            <div className="flex flex-col gap-1">
                                <p className="font-bold">Heures d'ouverture</p>
                                <p className="text-muted-foreground text-sm">
                                    Nous sommes joignables de 9h à 20h (du lundi au samedi)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="justify-center flex items-center">

                        <div className="w-full rounded-md max-w-7xl flex flex-col border p-8 gap-4">

                            <div className="grid w-full  items-center gap-1">
                                <Label className="font-bold" htmlFor="firstname">Nom & Prénom</Label>
                                <Input id="firstname" type="text" />
                            </div>
                            <div className="grid w-full  items-center gap-1">
                                <Label className="font-bold" htmlFor="lastname">Email</Label>
                                <Input id="lastname" type="text" />
                            </div>
                            <div className="grid w-full  items-center gap-1">
                                <Label className="font-bold" htmlFor="picture">Votre message</Label>
                                <Textarea placeholder="Tapez votre message ici ..." />
                                <p className="font-bold text-sm text-muted-foreground">
                                    Votre message sera copié à l'équipe d'assistance.
                                </p>
                            </div>
                            

                            <Button className="gap-4 w-full">
                                Envoyer le message<MoveRight className="w-4 h-4" />
                            </Button>
                        </div>

                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Contact1;