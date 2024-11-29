"use client";

import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CarouselComponent from "./CarouselComponent";


const CARROUSSEL_BANNER = [
    {
        image: "/hero.jpg",
        config: { point: true },
        content: ["Pagne tisser a la mains"],
    },
    {
        image: "/hero.jpg",
        config: {},
        content: ["Pagne tisser a la mains"],
    },
];


export const Hero3 = () => (
    <div className="w-full  py-20 lg:py-2">
        
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
                <div className="flex gap-4 flex-col">

                    <div className="flex gap-4 flex-col">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-7xl">
                        Commandez vos packagings, pour un effet wahou !
                        </h1>
                        <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                            à personnaliser avec votre logo
                        </p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Button size="lg" className="gap-4">
                            Commander <MoveRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="">
                    <CarouselComponent CARROUSSEL_BANNER={CARROUSSEL_BANNER} />
                </div>

            </div>

        </div>
    </div>
);

export default Hero3;
