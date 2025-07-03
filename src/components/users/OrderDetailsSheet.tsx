'use client'

import { IOrder } from "types/models"
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ClipboardList, QrCode } from "lucide-react"
import { useQRCode } from 'next-qrcode'

interface Props {
    order: IOrder
}

export default function OrderDetailsSheet({ order }: Props) {

const { Image } = useQRCode();

    return (
        <Sheet>
            <SheetTrigger>
                <ClipboardList className="mx-auto cursor-pointer hover:text-primary transition" />
            </SheetTrigger>
            <SheetContent
                side="right"
                className="w-full max-w-md sm:max-w-lg px-1 md:px-4"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <SheetHeader className="border-b pb-2">
                        <SheetTitle className="text-2xl font-bold">🧾 Facture de Commande</SheetTitle>
                        <p className="text-sm text-muted-foreground font-bold ">N° {order.id}</p>
                    </SheetHeader>

                    {/* Body */}
                    <div className="flex-1 overflow-auto py-4 space-y-6 text-sm">
                        {/* Client & Livraison côte à côte */}
                        <div className="md:flex md:space-x-6 md:space-y-0 space-y-6">
                            {/* Client */}
                            <section className="flex-1">
                                <h3 className="text-base font-bold mb-1">👤 Client</h3>
                                <div className="space-y-1 text-muted-foreground">
                                    <p>{order.user?.name}</p>
                                    <p>{order.user?.email}</p>
                                    <p className="capitalize">Type : {order.user?.accountType}</p>
                                </div>
                            </section>

                            {/* Livraison */}
                            <section className="flex-1">
                                <h3 className="text-base font-bold mb-1">📍 Livraison</h3>
                                <div className="space-y-1 text-muted-foreground">
                                    <p>Adresse : {order.address}</p>
                                    {order.delivery && (
                                        <>
                                            <p>Distance : {order.delivery.distanceKm} km</p>
                                            <p>Frais : {order.delivery.fees.toLocaleString()} F CFA</p>
                                            <p className="capitalize">Statut : {order.delivery.status}</p>
                                        </>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Menus */}
                        <section>
                            <h3 className="text-base font-semibold mb-1">🍽️ Détails des menus</h3>
                            <div className="space-y-4 divide-y">
                                {order.orderItems.map((item) => (
                                    <div key={item.id} className="pt-2">
                                        <div className="flex justify-between">
                                            <span>{item.menu?.name} × {item.quantity}</span>
                                            <span className="font-bold">{item.subtotal.toLocaleString()} F CFA</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1 space-y-1">
                                            <p className="font-bold">Prix unitaire : {item.menu?.price.toLocaleString()} F CFA</p>
                                            {item.menu?.category && (
                                                <p>Catégorie : {item.menu.category.icon} {item.menu.category.name}</p>
                                            )}
                                            {item.menu?.restaurant && (
                                                <p>Restaurant : {item.menu.restaurant.name}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Total */}
                        <section className="border-t pt-4">
                            <div className="flex justify-between text-base font-semibold">
                                <span>Total</span>
                                <span className="font-bold">{order.total.toLocaleString()} F CFA</span>
                            </div>
                        </section>
                    </div>

                    
                    {/* QR Code en bas */}
                    <div className="border-t pt-4 mt-2 flex items-center justify-center">
                        <div className="flex flex-col items-center text-muted-foreground">
                            <Image
                                text={`https://tonsite.com/commande/${order.id}`}
                                options={{
                                    type: 'image/jpeg',
                                    quality: 0.7,
                                    errorCorrectionLevel: 'M',
                                    margin: 3,
                                    scale: 4,
                                    width: 100,
                                    color: {
                                        dark: '#000000',
                                        light: '#FFFFFF',
                                    },
                                }}
                            />
                            <p className="text-xs mt-1">Scannez pour suivre ou vérifier</p>
                        </div>
                    </div>
                    
                </div>
            </SheetContent>
        </Sheet>
    )
}
