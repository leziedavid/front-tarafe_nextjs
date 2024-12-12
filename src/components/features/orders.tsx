"use client";

import { Badge } from "@/components/ui/badge";
import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Pen, Trash, CheckCircle, Info } from "lucide-react"; // Import des icônes pour les actions
import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Order } from "@/interfaces/AdminInterface";
import { OrderDetail } from "@/components/dash/orderDetail";
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Interface pour les données de commande
interface Prop {
  ordersData: Order[];
}

const columns = [
  { label: 'UID', className: 'w-[100px] font-bold text-white' },
  { label: 'Mode de paiement', className: 'font-bold text-white' },
  { label: 'Nom & Prénom', className: 'font-bold text-white' },
  { label: 'Email', className: 'font-bold text-white' },
  { label: 'Contact', className: 'font-bold text-white' },
  { label: 'Status', className: 'font-bold text-white' },
  { label: 'Date', className: 'text-right font-bold text-white' },
  { label: 'Option', className: 'text-right font-bold text-white' },
];

const Orders: React.FC<Prop> = ({ ordersData }) => {

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [idOders, setIdOders] = useState(0);

  const handleOpenSheet = () => setIsSheetOpen(true);
  const handleCloseSheet = () => setIsSheetOpen(false);

  const handleAddToCart = (id:number) => {
      setIdOders(id);
      handleOpenSheet();
  }

  return (
    <>

    <div>


        <div className="flex justify-between items-center">
          <CardTitle className="text-xl sm:text-lg md:text-xl">Orders</CardTitle>
          <Button className="hover:bg-[#ffb44b] text-white" size="sm">
            <Pen className="mr-2 h-5 w-5" /> Add Order
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-[#242078] text-white">
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
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
        {/* <OrderDetail orderId={idOders as number} isOpen={isSheetOpen} onClose={handleCloseSheet} /> */}

      </div>

    </>

  );
};

export default Orders;
