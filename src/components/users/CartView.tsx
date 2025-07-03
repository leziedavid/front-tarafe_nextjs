'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/context/CartProvider"

// Fonction utilitaire pour gérer les images produit
const getImageUrl = (product: any) => {
    return product?.files?.length > 0 && product.files[0]?.fileManager?.fileUrl ? product.files[0].fileManager.fileUrl  : "/img/default.jpg"
}

export default function CartView() {
    const {
        items: cartItems,
        updateCart,
        removeFromCart,
        countTotalPrice,
        clearCart,
    } = useCart()

    const updateQuantity = (productId: string, delta: number) => {
        const item = cartItems.find((item) => item.product.id === productId)
        if (!item) return
        updateCart(item.product, delta)
    }

    const removeItem = (productId: string) => {
        const item = cartItems.find((item) => item.product.id === productId)
        if (!item) return
        removeFromCart(item.product)
    }

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8">
            {/* Colonne produits */}
            <div className="md:col-span-2 space-y-4">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="relative w-32 h-32">
                            <Image src="img/empty_1.svg" alt="Panier vide"  fill  className="object-cover" />
                        </div>
                        <p className="text-gray-500">Votre panier est vide.</p>
                    </div>
                ) : (
                    cartItems.map(({ product, count }) => {
                        const imageUrl = getImageUrl(product);

                        return (
                            <Card key={product.id} className="flex gap-3 items-start p-3">
                                <div className="w-16 h-16 min-w-[64px] relative rounded overflow-hidden shrink-0">
                                    <Image
                                        src={imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 space-y-1 text-sm overflow-hidden">
                                    <CardTitle className="text-base font-medium truncate">
                                        {product.name}
                                    </CardTitle>
                                    <p className="text-muted-foreground text-xs truncate">
                                        {product.description}
                                    </p>
                                    <p className="text-primary font-semibold text-sm">
                                        {product.price} FCFA
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6"
                                            onClick={() => updateQuantity(product.id, -1)}
                                        >
                                            <Minus className="w-3 h-3" />
                                        </Button>
                                        <span className="text-sm">{count}</span>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6"
                                            onClick={() => updateQuantity(product.id, 1)}
                                        >
                                            <Plus className="w-3 h-3" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-6 w-6 ml-2"
                                            onClick={() => removeItem(product.id)}
                                        >
                                            <Trash2 className="w-3 h-3 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>


            {/* Colonne résumé */}
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span>Sous-total</span>
                        <span className="font-semibold">{countTotalPrice()} FCFA</span>
                    </div>

                    <Button className="w-full" disabled={cartItems.length === 0}>
                        Passer la commande
                    </Button>

                    {cartItems.length > 0 && (
                        <Button
                            variant="outline"
                            className="w-full text-red-500 border-red-300 hover:bg-red-50"
                            onClick={clearCart}
                        >
                            Vider le panier
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
        
    )
}
