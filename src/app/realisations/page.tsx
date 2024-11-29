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

        <div className="bg-muted rounded-md relative h-[40vh] mb-2">
          <Image
            src="/hero.jpg"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        <div className="w-full py-20 lg:py-20">
          <div className="container mx-auto flex flex-col gap-14">

            <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
              <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-bold">
                  NOS REALISATIONS
              </h4>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

              <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
                <div className="bg-muted rounded-md aspect-video mb-4"></div>
              </div>

              <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
                <div className="bg-muted rounded-md aspect-video mb-4"></div>
              </div>

              <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
                <div className="bg-muted rounded-md aspect-video mb-4"></div>
              </div>

              <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
                <div className="bg-muted rounded-md aspect-video mb-4"></div>
              </div>

              <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
                <div className="bg-muted rounded-md aspect-video mb-4"></div>
              </div>

              <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
                <div className="bg-muted rounded-md aspect-video mb-4"></div>
              </div>

              <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
                <div className="bg-muted rounded-md aspect-video mb-4"></div>
              </div>
              
              <div className="flex flex-col gap-2 hover:opacity-75 cursor-pointer">
                <div className="bg-muted rounded-md aspect-video mb-4"></div>
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
