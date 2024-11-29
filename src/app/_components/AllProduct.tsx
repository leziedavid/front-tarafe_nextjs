"use client";

import { Badge } from "@/components/ui/badge";
import SkeletonDemo from "./SkeletonDemo";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export const AllProduct = () => (

    <div className="">

        <>
            <div className="">

                <div className="flex flex-col gap-10">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                        <div className="flex flex-col gap-2">
                            <div className="bg-muted rounded-md aspect-video mb-2">
                                <img
                                    src="/Tarafe1.jpeg"
                                    alt="Tarafe Image"
                                    width={500}         // Largeur de l'image
                                    height={300}        // Hauteur de l'image
                                    className="object-cover rounded-md"
                                />
                            </div>

                            <h3 className="text-sm md:text-xl tracking-tight  font-bold">Pay supplier invoices</h3>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Our goal is to streamline .....
                            </p>
                            <Button size="sm" color="#242078" className="gap-4 mb-6 from-[#242078] to-[#242078]">
                                Commander <MoveRight className="w-4 h-4"/>
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="bg-muted rounded-md aspect-video mb-2">
                                <img
                                    src="/Tarafe1.jpeg"
                                    alt="Tarafe Image"
                                    width={500}         // Largeur de l'image
                                    height={300}        // Hauteur de l'image
                                    className="object-cover rounded-md"
                                />
                            </div>

                            <h3 className="text-sm md:text-xl tracking-tight  font-bold">Pay supplier invoices</h3>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Our goal is to streamline .....
                            </p>
                            <Button size="sm" color="#242078" className="gap-4 mb-6 from-[#242078] to-[#242078]">
                                Commander <MoveRight className="w-4 h-4"/>
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="bg-muted rounded-md aspect-video mb-2">
                                <img
                                    src="/Tarafe1.jpeg"
                                    alt="Tarafe Image"
                                    width={500}         // Largeur de l'image
                                    height={300}        // Hauteur de l'image
                                    className="object-cover rounded-md"
                                />
                            </div>

                            <h3 className="text-sm md:text-xl tracking-tight  font-bold">Pay supplier invoices</h3>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Our goal is to streamline .....
                            </p>
                            <Button size="sm" color="#242078" className="gap-4 mb-6 from-[#242078] to-[#242078]">
                                Commander <MoveRight className="w-4 h-4"/>
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="bg-muted rounded-md aspect-video mb-2">
                                <img
                                    src="/Tarafe1.jpeg"
                                    alt="Tarafe Image"
                                    width={500}         // Largeur de l'image
                                    height={300}        // Hauteur de l'image
                                    className="object-cover rounded-md"
                                />
                            </div>

                            <h3 className="text-sm md:text-xl tracking-tight  font-bold">Pay supplier invoices</h3>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Our goal is to streamline .....
                            </p>
                            <Button size="sm" color="#242078" className="gap-4 mb-6 from-[#242078] to-[#242078]">
                                Commander <MoveRight className="w-4 h-4"/>
                            </Button>
                        </div>
                        

                    </div>

                </div>

                <SkeletonDemo/>

            </div>

        
        </>
    </div>

);

export default AllProduct;