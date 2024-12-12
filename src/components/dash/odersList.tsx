
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import { ApiDataOders, Order, OrderDetails } from "@/interfaces/AdminInterface";
import { Button } from "../ui/button";
import { CheckCircle, DownloadCloudIcon, Info, Mail, MoreHorizontal, Pen, Pencil, Trash } from "lucide-react";
import { OrderDetail } from "./orderDetail";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { getdetailCommandes } from "@/servives/AdminService";
import useAuth from "@/servives/useAuth";
import Link from "next/link";



interface Prop {
    ordersData: Order[];
}

const columns = [
    { label: 'UID', className: '' },
    { label: 'Mode de paiement', className: '' },
    { label: 'Nom & Prénom', className: '' },
    { label: 'Email', className: '' },
    { label: 'Contact', className: '' },
    { label: 'Status', className: '' },
    { label: 'Date', className: 'text-right ' },
];


export const OdersList: React.FC<Prop> = ({ ordersData }) => {

    const token = useAuth();  // Récupérer le token à l'aide du hook
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [idOders, setIdOders] = useState(0);
    const [orderDetails, setOrderDetails] = useState<ApiDataOders[]>([]); // Changer le type ici
    const [orders, setOrders] = useState<OrderDetails[]>([]);

    const handleOpenSheet = () => setIsSheetOpen(true);
    const handleCloseSheet = () => setIsSheetOpen(false);

    const handleAddToCart = (id: number) => {

        if(id){
            fetchData(id)
            setIdOders(id);
            setIsSheetOpen(true);
        }

    }

    const fetchData = async (id: number) => {

        const response = await getdetailCommandes(token, id);
        if (response.statusCode === 200) {

            setOrders(response.data.data);
            setIsSheetOpen(true);


        } else {
        }
        
        console.log(orders);

    };
    

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead key={index} className={column.className}>
                                {column.label}
                            </TableHead>
                        ))}
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ordersData.map((items) => (

                        <TableRow key={items.id_orders}>
                            <TableCell>{items.transaction_id}</TableCell>
                            <TableCell>{items.Mode_paiement}</TableCell>
                            <TableCell>{items.nomUsers_orders}</TableCell>
                            <TableCell>{items.email_orders}</TableCell>
                            <TableCell>{items.contact_paiement}</TableCell>
                            <TableCell> <Badge>{items.status_orders}</Badge></TableCell>
                            <TableCell>  { items.date_orders}</TableCell>

                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="secondary">
                                            <MoreHorizontal className="size-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/invoices/${items.id_orders}`}>
                                                <Pencil className="size-4 mr-2" /> Edit Invoice
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleAddToCart(items.id_orders)}>
                                                <DownloadCloudIcon className="size-4 mr-2" /> Download Invoice
                                        </DropdownMenuItem>
                                        <DropdownMenuItem >
                                            <Mail className="size-4 mr-2" /> Reminder Email
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/invoices/${items.id_orders}/delete`}>
                                                <Trash className="size-4 mr-2" /> Delete Invoice
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <OrderDetail data={orders} isOpen={isSheetOpen} onClose={handleCloseSheet} />

        </>
    );
}
