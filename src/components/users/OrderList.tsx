'use client'

import { ordersData } from "@/data/ordersData"
import { IOrder, AccountType, DeliveryStatus, OrderStatus } from "types/models"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import OrderDetailsSheet from "./OrderDetailsSheet"

export default function OrderList() {
    const orders: IOrder[] = ordersData

    return (

        <Card className="mt-6 mx-6">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">🧾 Mes Commandes</CardTitle>
            </CardHeader>
            <CardContent>
                {orders.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Aucune commande trouvée.</p>
                ) : (
                    <ScrollArea className="w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Adresse</TableHead>
                                    <TableHead className="text-center">Détails</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="capitalize">
                                                {order.status.toLowerCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{order.total.toLocaleString()} F CFA</TableCell>
                                        <TableCell className="max-w-[180px] truncate">{order.address}</TableCell>
                                        <TableCell className="text-center">
                                            <OrderDetailsSheet order={order} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                )}
            </CardContent>
        </Card>

    )
}
