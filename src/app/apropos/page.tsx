"use client";

import { Auth } from "@/components/auth";
import { Logo } from "@/components/logo";
import ProductCard from "../_components/productCard";
import Image from 'next/image';

import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from 'react';
import Header from '../_components/Header';
import Footer from "../_components/Footer";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiData, Equipe, Reglage } from "@/interfaces/HomeInterface";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { getreglages } from "@/servives/HomeService";
import { getBaseUrlImg } from "@/servives/baseUrl";
import SkeletonDemo from "../_components/SkeletonDemo";
import { ApiResponse } from "@/interfaces/ApiResponse";
import PaginationComponent from "@/components/pagination/paginationComponent"
import useAuth from "@/servives/useAuth";
import WhatsappFloatButton from "@/components/WhatsappFloatButton";

const Page: React.FC = () => {

  const token = useAuth();  // Récupérer le token à l'aide du hook
  // Déclaration d'un état pour stocker les données
  const [reglage, setReglages] = useState<Reglage []>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);

  const fetchData = async () => {
    const result: ApiResponse<ApiData> = await getreglages(token);

    if (result.statusCode !== 200) {
      toast.error(result.message);

    } else {

      setReglages(result.data.reglages);
      setEquipes(result.data.equipes);
    }
  };

  useEffect(() => {
      fetchData();
    }, []);
  
const isDataEmpty = !reglage || reglage.length <= 0;

  return (

    <>

      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>

      <section className="py-24 relative">

          <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start gap-12 grid lg:grid-cols-2 grid-cols-1">

              {/* Affichage des membres de l'équipe avec disposition conditionnelle */}

              
              <div className="w-full items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                {equipes.map((equipe) => (
                  <div key={equipe.id_equipe} className="flex items-center gap-1">
                    {/* Si l'id est impair, afficher dans la première div */}
                    {equipe.id_equipe % 2 !== 0 ? (
                      <div>
                        <div className="sm:justify-end justify-start items-start gap-2.5 flex">
                          <Image className="rounded-xl object-cover"
                            src={`${getBaseUrlImg()}/${equipe.photo_equipe}`}
                            alt={`Image de ${equipe.nomPren_equipe}`}
                            width={500}
                            height={300}
                            />
                        </div>
                        <div className="text-center mt-4">
                          <p className="text-lg font-semibold">{equipe.nomPren_equipe}</p>
                          <p className="text-gray-500">{equipe.fonction_equipe}</p>
                        </div>
                      </div>
                    ) : (
                      /* Si l'id est pair, afficher dans la deuxième image */
                      <div>
                        <Image className="sm:ml-0 ml-auto rounded-xl object-cover"
                          src={`${getBaseUrlImg()}/${equipe.photo_equipe}`}
                          alt={`Image de ${equipe.nomPren_equipe}`}
                          width={500}
                          height={300}
                          />
                        <div className="text-center mt-4">
                          <p className="text-lg font-semibold">{equipe.nomPren_equipe}</p>
                          <p className="text-gray-500">{equipe.fonction_equipe}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Texte au même niveau que les images */}
              <div className="w-full flex-col">

                <div className="w-full flex-col justify-center items-start gap-8 flex">
                  
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center"> A propos de Tarafé </h2>
                    <div dangerouslySetInnerHTML={{ __html: reglage[0]?.description_reglages && reglage[0]?.description_reglages ? reglage[0]?.description_reglages : '' }}  className="text-gray-500 text-base font-normal leading-relaxed lg:text-start" />
                  </div>
                  {/* {reglage[0]?.description_reglages}  */}
                  
                  <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex">
                      <h3 className="text-gray-900 text-2xl font-bold font-manrope leading-normal">{reglage[0]?.nb_views_site}+</h3>
                      <h6 className="text-gray-500 text-base font-normal leading-relaxed">Visite sur le site</h6>
                    </div>
                    <div className="flex-col justify-start items-start inline-flex">
                      <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-normal">{reglage[0]?.nb_views_fb}+</h4>
                      <h6 className="text-gray-500 text-base font-normal leading-relaxed">Abonnés Facebook</h6>
                    </div>
                    <div className="flex-col justify-start items-start inline-flex">
                      <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-normal"> {reglage[0]?.nb_views_insta}+</h4>
                      <h6 className="text-gray-500 text-base font-normal leading-relaxed">Abonnés Instagram</h6>
                    </div>
                  </div>
                </div>
                
              </div>

            </div>
          </div>

        </section>

      </div>

      <WhatsappFloatButton />

      <Footer data={reglage} />

    </>

  );
};

export default Page;
