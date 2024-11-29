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
import {Filter, MoveRight, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LuxuryWatchProductPage from "../_components/WatchProductCard";
import { BreadcrumbDemo } from "../_components/BreadcrumbDemo";


const Page: React.FC = () => {


  

  return (

    <>

      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
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
