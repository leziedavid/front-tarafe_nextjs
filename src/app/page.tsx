"use client";

import { Auth } from "@/components/auth";
import { Logo } from "@/components/logo";
import ProductCard from "./_components/productCard";

import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from 'react';
import Header from './_components/Header';
import Footer from "./_components/Footer";
import Feature5 from "./_components/Feature5";
import CarouselComponent from "./_components/CarouselComponent";
import Hero3 from "./_components/Hero3";
import Contact1 from "./_components/Contact1";
import ContactForm from "./_components/ContactForm";


// Définir le type pour une notification
interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

const Home: React.FC = () => {


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

  return (

    <>

      <Header />
      <div className={`min-h-[calc(100vh_-_56px)] py-5 px-3 lg:px-6 mt-[4rem] md:mt-[4rem]`}>
        <Hero3 />
        <Feature5/>
        <ContactForm/>
      </div>
      <Footer />

    </>
  );
};

export default Home;
