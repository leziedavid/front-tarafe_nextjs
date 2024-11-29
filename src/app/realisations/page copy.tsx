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
import AllProduct from "../_components/AllProduct";
import {Filter, MoveRight, SearchIcon, Share2, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/Checkbox";


// Définir le type pour une notification
interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

const Page: React.FC = () => {


const CARROUSSEL_BANNER = [
  {
    image: "/images.jpg",
    config: { point: true },
    content: ["Content 1", "Content 2", "Content 3"],
  },
  {
    image: "/images.jpg",
    config: {},
    content: ["Content A", "Content B"],
  },
];

const options = [
  {
    "id_option_reaalisation": "13",
    "stateOption_reaalisation": "1",
    "libelleOption_reaalisation": "Communication",
    "created_at": "2024-04-25 00:00:00",
    "updated_at": null
  },
  {
    "id_option_reaalisation": "12",
    "stateOption_reaalisation": "1",
    "libelleOption_reaalisation": "Lifestyle",
    "created_at": "2024-04-25 00:00:00",
    "updated_at": null
  },
  {
    "id_option_reaalisation": "11",
    "stateOption_reaalisation": "1",
    "libelleOption_reaalisation": "Bijoux et accessoires",
    "created_at": "2024-04-25 00:00:00",
    "updated_at": null
  },
  {
    "id_option_reaalisation": "10",
    "stateOption_reaalisation": "1",
    "libelleOption_reaalisation": "Packs et cadeaux",
    "created_at": "2024-04-25 00:00:00",
    "updated_at": null
  },
  {
    "id_option_reaalisation": "6",
    "stateOption_reaalisation": "1",
    "libelleOption_reaalisation": "T-shirts et vêtements",
    "created_at": "2024-03-09 00:00:00",
    "updated_at": null
  },
  {
    "id_option_reaalisation": "5",
    "stateOption_reaalisation": "1",
    "libelleOption_reaalisation": "Trousses et pochettes",
    "created_at": "2024-03-09 00:00:00",
    "updated_at": null
  },
  {
    "id_option_reaalisation": "4",
    "stateOption_reaalisation": "1",
    "libelleOption_reaalisation": "Sacs et pochons",
    "created_at": "2024-03-09 00:00:00",
    "updated_at": null
  }
];

  return (

    <>

      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>

        <div className="bg-muted rounded-md relative h-[40vh] mb-10">
          <Image
            src="/hero.jpg"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>


        <div className="">
          
          <div className=" max-w-16xl mx-auto">

            <div className="grid lg:grid-cols-4 gap-10">

              <div className="col-span-2 lg:col-span-3 flex flex-col gap-9">

                <div className="flex flex-col items-center justify-center text-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    DÉCOUVRIR NOS CRÉATIONS !
                  </h1>
                  <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md">
                    à personnaliser avec votre logo
                  </p>
                </div>

                <div className="flex items-center bg-white w-full">
                  {/* Afficher SearchIcon et input sur tous les écrans */}
                  <div className="flex gap-2 items-center p-2 border rounded-lg bg-white w-full md:w-[100%]">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent outline-none text-black w-full"
                    />
                  </div>

                  {/* Afficher Filter uniquement sur les petits écrans */}
                  <Filter className="w-10 h-10 p-2 font-bold border rounded-sm ml-2 md:hidden" />
                  
                </div>

                  <AllProduct/>

              </div>

            </div>

          </div>
        </div>


      </div>
      <Footer />

    </>
  );
};

export default Page;
