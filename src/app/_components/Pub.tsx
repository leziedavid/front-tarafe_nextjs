"use client";

import { MoveRight, PhoneCall, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CarouselComponent from "./CarouselComponent";
import { Reglage } from "@/interfaces/HomeInterface";
import { getBaseSiteUrl, getBaseUrlImg } from "@/servives/baseUrl";
import Skeleton from "react-loading-skeleton";



interface Props {
    data: Reglage[];
}


const Pub: React.FC<Props> = ({ data }) => {

    const photoUrl = data[0]?.images3_reglages ?? 'clients/Logo_blanc.png';
    const isDataEmpty = data.length <= 0;

    const handleClick = async (publicId: string) => {
        const url = `https://tarafe.com/catalogue/${publicId}`;
        window.open(url, '_blank');
    };


    return (

        <>

            <div className="w-full py-5 lg:py-10">
            {/* container mx-auto */}
                <div className="">
                    <div className="flex flex-col gap-10">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                            <div className="bg-[url('/hero.jpg')] bg-cover bg-center rounded-md aspect-square p-6 flex justify-center items-center relative">
                                <div className="flex flex-col justify-center items-center relative">

                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-[#242078] hover:bg-[#ffb44b] shadow-lg shadow-black/20 text-white uppercase font-extrabold font-title pt-3 pb-2 px-2 text-sm md:text-base whitespace-nowrap">
                                            Effet wahou
                                    </div>

                                </div>
                            </div>


                            <div className="bg-[url('/hero.jpg')] bg-cover bg-center rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-center items-center relative">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-[#242078] hover:bg-[#ffb44b] shadow-lg shadow-black/20 text-white uppercase font-extrabold font-title pt-3 pb-2 px-2 text-sm md:text-base whitespace-nowrap">
                                    Mettez des étoiles plein les yeux !
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>


        </>

    );
};
export default Pub;
