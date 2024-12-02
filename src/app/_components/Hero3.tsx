"use client";

import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CarouselComponent from "./CarouselComponent";
import { Reglage } from "@/interfaces/HomeInterface";
import { getBaseSiteUrl, getBaseUrlImg } from "@/servives/baseUrl";
import Skeleton from "react-loading-skeleton";



interface Props {
    data: Reglage[];
}


const Hero3: React.FC<Props> = ({ data }) => {

    const photoUrl = data[0]?.images3_reglages ?? 'Logos/Logo_blanc.png';
    const isDataEmpty = data.length <= 0;

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


    const handleClick = async (publicId: string) => {
        const url = `https://tarafe.com/catalogue/${publicId}`;
        window.open(url, '_blank');
    };

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


                    <div className="w-full py-1 md:py-1 lg:py-1">
                        <div className="">
                            <div className="relative flex flex-col text-center bg-[url('/hero.jpg')] bg-cover bg-center rounded-md p-4 lg:p-14 gap-8 items-center" style={{ backgroundImage: `url(${getBaseUrlImg()}/${photoUrl})` }}>
                                {/* Superposition noire */}

                                <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                                <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">

                                    <div className="flex gap-4 flex-col">

                                        <div className="flex gap-4 flex-col">
                                            <h1 className="text-4xl font-bold text-white tracking-tighter sm:text-7xl z-10">
                                                {data[0]?.texte_banner1}
                                            </h1>
                                            <p className="z-10 text-xl leading-relaxed text-white tracking-tight text-muted-foreground max-w-md text-left">
                                                {data[0]?.titre_banner1}
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Button onClick={() => handleClick("Catalogue_taraf%C3%A9_2024.pdf")} size="sm" className="gap-4 z-10">
                                                Notre catalogue <MoveRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* <div className="">
                                    <CarouselComponent CARROUSSEL_BANNER={CARROUSSEL_BANNER} />
                                </div> */}

                                </div>
                                <Skeleton className="bg-muted rounded-md aspect-video mb-2" />

                            </div>
                        </div>
                    </div>

                )}

        </>

    );
};
export default Hero3;
