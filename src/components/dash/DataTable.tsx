import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ApiDataOders, Order, OrderDetails } from "@/interfaces/AdminInterface";
import { Button } from "../ui/button";
import { CheckCircle, Info, Pen, Trash } from "lucide-react";
import { OrderDetail } from "./orderDetail";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { getdetailCommandes } from "@/servives/AdminService";
import useAuth from "@/servives/useAuth";


interface Prop {
    ordersData: Order[];
}

const columns = [
    { label: 'UID', className: 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6' },
    { label: 'Mode de paiement', className: 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6' },
    { label: 'Nom & Prénom', className: 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6' },
    { label: 'Email', className: 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6' },
    { label: 'Contact', className: 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6' },
    { label: 'Status', className: 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6' },
    { label: 'Date', className: 'text-right py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6' },
    { label: 'Option', className: 'text-right py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6' },
];


const DataTable: React.FC<Prop> = ({ ordersData }) => {

    const token = useAuth();  // Récupérer le token à l'aide du hook
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [idOders, setIdOders] = useState(0);
    const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]); // Changer le type ici
    const [orders, setOrders] = useState<OrderDetails[]>([]);

    const handleOpenSheet = () => setIsSheetOpen(true);
    const handleCloseSheet = () => setIsSheetOpen(false);

    const handleAddToCart = (id: number) => {

        if(id){
            setIdOders(id);
            fetchData(id)
        }

    }


    const fetchData = async (id: number) => {
        const response = await getdetailCommandes(token, id);
        console.log(response.data);
        if (response.statusCode === 200) {
            setOrders(response.data.data);
        } else {
        }
        
    };
    
    
    return (

        <Card>

            <CardHeader className="px-7">
                <CardTitle className="text-2xl">Orders</CardTitle>
                <CardDescription>Recent Order from your store</CardDescription>
            </CardHeader>
            
            <CardContent>
                <Table className="min-w-full divide-y divide-gray-100">

                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead key={index} className={column.className}>
                                    {column.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-200 bg-white">
                        
                    {ordersData.map((order) => (
                        <TableRow key={order.id_orders}>
                            <TableCell className="font-medium whitespace-nowrap">{order.transaction_id}</TableCell>
                            <TableCell className="font-medium whitespace-nowrap">{order.Mode_paiement}</TableCell>
                            <TableCell className="font-medium whitespace-nowrap">{order.nomUsers_orders}</TableCell>
                            <TableCell className="font-medium whitespace-nowrap">{order.email_orders}</TableCell>
                            <TableCell className="whitespace-nowrap">{order.contact_paiement}</TableCell>
                            <TableCell className="whitespace-nowrap">{order.status_orders}</TableCell>
                            <TableCell className="whitespace-nowrap">{order.date_orders}</TableCell>
                            {/* Column for options with DropdownMenu */}

                            <TableCell className="text-right px-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <Pen className="h-3 w-3" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <Pen className="mr-2 h-4 w-4" />
                                                <span>Edit</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Trash className="mr-2 h-4 w-4 text-red-500" />
                                                <span>Delete</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                                <span>Validate</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleAddToCart(order.id_orders)}>
                                                <Info className="mr-2 h-4 w-4 text-blue-500" />
                                                <span>Details</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>

                        </TableRow>
                    ))}
                        
                    </TableBody>
                </Table>
            </CardContent>

            <OrderDetail id={idOders} data={orders} isOpen={isSheetOpen} onClose={handleCloseSheet} />

        </Card>

        
    );
};

export default DataTable;