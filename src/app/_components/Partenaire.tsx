"use client";

import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CarouselComponent from "./CarouselComponent";
import { Partenaires } from "@/interfaces/HomeInterface";
import { getBaseSiteUrl, getBaseUrlImg } from "@/servives/baseUrl";
import Skeleton from "react-loading-skeleton";



interface Props {
    data: Partenaires[];
}


const Partenaire: React.FC<Props> = ({ data }) => {

    const photoUrl = data[0]?.Path_partenaires ?? 'clients/Logo_blanc.png';
    const isDataEmpty = data.length <= 0;

    const handleClick = async (publicId: string) => {
        const url = `https://tarafe.com/catalogue/${publicId}`;
        window.open(url, '_blank');
    };

    const clients = [
        { image: "/clients/logoipsum-265.svg" },
        { image: "/clients/logoipsum-222.svg" },
        { image: "/clients/logoipsum-243.svg" },
        { image: "/clients/logoipsum-258.svg" },
        { image: "/clients/logoipsum-317.svg" },
        { image: "/clients/logoipsum-289.svg" },
        { image: "/clients/logoipsum-297.svg" },
        { image: "/clients/logoipsum-311.svg" },
        { image: "/clients/logoipsum-264.svg" },
        { image: "/clients/logoipsum-264.svg" },
    ];

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

                    <div className="flex justify-center items-center flex-col mb-6">
                    <div className="text-4xl w-3/4 text-center xl:text-5xl font-medium"> Ils nous ont fait confiance </div>
    
                    <div className='grid grid-cols-3  xl:grid-cols-4 items-center justify-center  px-10 md:px-20 lg:px-0 lg:w-1/2 pt-10 gap-10 text-center mx-auto'>
                        {data.map((item, index) => (
                            <div key={index} className="">
                                <img src= {`${getBaseUrlImg()}/${item.Path_partenaires}`} alt="logo" width={500} height={500} className='' />
                            </div>
                        ))}
                    </div>
                </div>

                )}
        </>

    );
};
export default Partenaire;
