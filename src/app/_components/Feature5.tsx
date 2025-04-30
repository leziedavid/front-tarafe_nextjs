"use client";

import { Badge } from "@/components/ui/badge";
import SkeletonDemo from "./SkeletonDemo";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Realisation, Reglage } from "@/interfaces/HomeInterface";
import { getBaseUrlImg } from "@/servives/baseUrl";
import React from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';  // Import de Image de Next.js


interface Feature5Props {
    data: Realisation[];
    reglage: Reglage[];
}

const Feature5: React.FC<Feature5Props> = ({ data, reglage }) => {

    const router = useRouter();
    // Fonction pour tronquer la description HTML
    const truncateDescription = (htmlContent: string, maxLength: number) => {
        // Crée un élément DOM temporaire pour manipuler le HTML
        const doc = new DOMParser().parseFromString(htmlContent, "text/html");
        let textContent = doc.body.textContent || ""; // On récupère juste le texte brut

        // Si le texte est trop long, on le tronque et on ajoute "..."
        if (textContent.length > maxLength) {
            textContent = textContent.substring(0, maxLength) + "...";
        }

        // On réutilise le contenu tronqué dans un élément HTML
        const truncatedDoc = document.createElement("div");
        truncatedDoc.textContent = textContent;
        return truncatedDoc.innerHTML; // Retourne le texte HTML tronqué
    };

    // Vérification si les données sont disponibles (par exemple si la taille est inférieure ou égale à 0)
    const isDataEmpty = data.length <= 0;

    const navigateTo = (path: string) => {
        const libelleModified = path.replace(/ /g, '-');
        router.push('/product/' + libelleModified);
    };


    return (
        <div className="w-full py-20 lg:py-20">
            <div className="md:container md:mx-auto">

                {isDataEmpty ? (
                    // Si les données sont vides ou inférieures à 0, afficher le skeleton
                    <SkeletonDemo />
                ) : (

                    <div className="flex flex-col gap-10">
                            {/* Section titre */}
                            <div className="flex gap-4 flex-col items-start">
                                <div>
                                    <Badge className="bg-[#242078] hover:bg-[#ffb44b]">Du nouveau !</Badge>
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h2 className="text-3xl md:text-5xl uppercase tracking-tighter max-w-xl font-bold text-left">
                                        {reglage[0]?.libelle_section}
                                    </h2>
                                    <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                                        {reglage[0]?.description_section}
                                    </p>
                                </div>
                            </div>

                            {/* Grid de produits */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                                {data.map((item, index) => (
                                    <div key={index} className="cursor-pointer">
                                        {/* Image en arrière-plan */}
                                        <div className="bg-muted rounded-md aspect-video mb-2">
                                            <Image src={`${getBaseUrlImg()}/${item.images_realisations}`} alt={item.libelle_realisations} width={500} height={300} className="object-cover rounded-md" layout="intrinsic" />
                                        </div>
                                        {/* Informations du produit */}
                                        <h3 className="text-xl font-bold truncate mb-2">{item.libelle_realisations}</h3>
                                        <p className="text-muted-foreground text-sm md:text-base line-clamp-3 mb-2" dangerouslySetInnerHTML={{ __html: truncateDescription(item.descript_real, 20) }} />
                                        <Button className="gap-4 w-full cursor-pointer bg-white text-black hover:text-white border-2 border-gray-500 hover:border-white" onClick={() => navigateTo(item.libelle_realisations)}>
                                            Commander <MoveRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>

                    </div>

                )}

            </div>
        </div>
    );
};

export default Feature5;
