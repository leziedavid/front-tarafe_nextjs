"use client";

import { Reglage } from "@/interfaces/HomeInterface";
import { getBaseUrlImg } from "@/servives/baseUrl";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface FooterProps {
    data: Reglage[]; // Le type de `data` dépend de la structure de ton résultat
}


const Footer: React.FC<FooterProps> = ({ data }) => {
    const photoUrl = data[0]?.logo_footer ?? 'Logos/Logo_blanc.png';  // Valeur par défaut
    return (
        <div className="bg-gradient-to-b from-[#242078] to-[#242078] text-white py-14 md:py-28">
            <div className="max-w-6xl mx-auto flex justify-between h-full">
                <div className="flex flex-col md:flex-row gap-2 justify-center md:justify-between">

                    {/* Conteneur pour l'image et le téléph */}
                    <div className="flex flex-col justify-start h-full">
                        <img src={`${getBaseUrlImg()}/${photoUrl}`} alt="logo" className="h-20 md:h-20 px-6" width={300} height={250} />
                        <p className="text-white font-extrabold font-title text-base sm:text-lg md:text-xl lg:text-xl  px-4">  {data[0]?.desc_footer} </p>
                    </div>

                    {/* Sections */}
                    <div className="flex gap-4 flex-col md:flex-row px-8 md:px-0">
                        {/* Services Section */}
                        <div className="space-y-5 font-extrabold font-title">
                            <span className="uppercase text-xl font-title">Services</span>
                            <div className="flex flex-col gap-y-5 text-base">
                                <div>Personnalisation de produits</div>
                                <div>Solutions pour les entreprises (B2B)</div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-5 font-extrabold font-title">
                            <span className="uppercase text-xl font-title">Contact</span>
                            <div className="flex flex-col gap-y-5 text-base">
                                <div className="flex flex-col">
                                    Ligne d’assistance
                                    <span className="text-[#BFC1BF] font-normal">
                                        {data[0]?.phone1_reglages}  {data[0]?.phone2_reglages}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    Emplacement
                                    <span className="text-[#BFC1BF] font-normal">
                                    {data[0]?.localisation_reglages}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    Email
                                    <span className="text-[#BFC1BF] font-normal">
                                        {data[0]?.email_reglages}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Download Section */}
                        <div className="md:w-1/2">
                            <span className="uppercase text-xl font-title font-extrabold font-title"> Suivez-nous sur ...</span>
                            <div className="flex space-x-5 py-5">
                                <Instagram size={30} strokeWidth={3} absoluteStrokeWidth />
                                <Linkedin size={30} strokeWidth={3} absoluteStrokeWidth />
                                <Facebook size={30} strokeWidth={3} absoluteStrokeWidth />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;
