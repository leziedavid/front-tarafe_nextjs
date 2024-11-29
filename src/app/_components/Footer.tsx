"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="bg-gradient-to-b from-[#242078] to-[#242078] text-white py-14 md:py-28">
            <div className="max-w-6xl mx-auto flex justify-between h-full">
                <div className="flex flex-col md:flex-row gap-2 justify-center md:justify-between">
                    {/* Logo */}
                    <Image
                        src="/Logo_blanc.png"
                        alt="logo"
                        className="h-20 md:h-20 px-6"
                        width={350}
                        height={250}
                    />

                    {/* Sections */}
                    <div className="flex gap-4 flex-col md:flex-row px-8 md:px-0">
                        {/* Services Section */}
                        <div className="space-y-5 font-bold">
                            <span className="uppercase text-2xl font-title">Services</span>
                            <div className="flex flex-col gap-y-5 text-base">
                                <div>Prix du marché</div>
                                <div>Météo & Récommandations</div>
                                <div>Conseils agricoles</div>
                                <div>Alertes</div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-5 font-bold">
                            <span className="uppercase text-2xl font-title">Contact</span>
                            <div className="flex flex-col gap-y-5 text-base">
                                <div className="flex flex-col">
                                    Ligne d’assistance
                                    <span className="text-[#BFC1BF] font-normal">
                                        +225 0747003450
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    Emplacement
                                    <span className="text-[#BFC1BF] font-normal">
                                        Nous sommes basés à Abidjan en Côte d’Ivoire
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    Email
                                    <span className="text-[#BFC1BF] font-normal">
                                        contact@tarafe.com
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Download Section */}
                        <div className="md:w-1/2">
                            <span className="uppercase text-2xl font-title font-bold">
                                    Suivez-nous sur ...
                            </span>

                            <div className="flex space-x-5 py-5"> {/* Utilisation de flex et space-x pour l'espacement entre les icônes */}
                                <Instagram size={48} strokeWidth={3} absoluteStrokeWidth />
                                <Linkedin size={48} strokeWidth={3} absoluteStrokeWidth />
                                <Facebook size={48} strokeWidth={3} absoluteStrokeWidth />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
