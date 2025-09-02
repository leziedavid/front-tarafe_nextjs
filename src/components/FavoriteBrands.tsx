"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Realisation, Reglage } from "@/interfaces/HomeInterface";
import { getBaseUrlImg } from "@/servives/baseUrl";
import { Badge } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import WebSkeletons from "./MySkeleton";

interface datasProps {
    data: Realisation[];
    reglage: Reglage[];
}

const FavoriteBrand: React.FC<datasProps> = ({ data, reglage }) => {
    const router = useRouter();

    const isDataEmpty = data.length <= 0;

    const navigateTo = (path: string) => {
        const libelleModified = path.replace(/ /g, "-");
        router.push("/product/" + libelleModified);
    };

    return (

        <>
            {isDataEmpty ? (
                <WebSkeletons count={8} />
            ) : (
                <div className="container mx-auto px-4 w-full py-20 lg:py-20">

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center uppercase">
                        Toutes nos collections
                    </h2>


                    <div className="flex gap-4 flex-col items-start mb-2">
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-2xl md:text-3xl uppercase max-w-xl font-bold text-left">
                                {reglage[0]?.libelle_section}
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                                {reglage[0]?.description_section}
                            </p>
                        </div>
                    </div>


                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.map((item, i) => (
                            <Card key={i} className="overflow-hidden border-none shadow-none" onClick={() => navigateTo(item.libelle_realisations)} >
                                <CardContent className="p-0 flex flex-col h-full">
                                    {/* Image plus grande */}
                                    <div className="w-full h-48 sm:h-64 md:h-72 lg:h-96 relative">
                                        <Image src={`${getBaseUrlImg()}/${item.images_realisations}`} alt={item.libelle_realisations} fill className="object-cover" />
                                    </div>

                                    {/* Titre + lien alignés en bas */}
                                    <div className="flex flex-col justify-between flex-1 p-4">
                                        <h3 className="font-bold text-sm text-muted-foreground  uppercase tracking-tighter">{item.libelle_realisations}</h3>

                                        <p onClick={() => navigateTo(item.libelle_realisations)} className="text-sm text-muted-foreground mt-auto cursor-pointer hover:text-[#ffb44b]">
                                            Je découvre →
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </div>
            )}
        </>
    );
};

export default FavoriteBrand;
