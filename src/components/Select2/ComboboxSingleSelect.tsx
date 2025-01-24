'use client';

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";  // Ajout de l'icône X
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Définition des types génériques pour les options
interface ComboboxSingleSelectProps<T> {
    options: T[];
    selectedItem: string | null; // Seulement un élément sélectionné
    onSelectionChange: (selectedItem: string | null) => void; // Passer un seul élément
    labelExtractor: (item: T) => string;
    valueExtractor: (item: T) => string;
    placeholder?: string;
}

export function ComboboxSingleSelect<T>({
    options,
    selectedItem,
    onSelectionChange,
    labelExtractor,
    valueExtractor,
    placeholder = "Sélectionner...",
}: ComboboxSingleSelectProps<T>) {
    const [open, setOpen] = React.useState(false);

    // Fonction pour gérer la sélection
    const handleSelection = (value: string) => {
        onSelectionChange(value === selectedItem ? null : value); // Si l'élément est déjà sélectionné, on le désélectionne
    };

    // Fonction pour retirer la sélection
    const handleRemoveSelection = (e: React.MouseEvent) => {
        e.stopPropagation();  // Empêche la fermeture du popover quand on clique sur le X
        onSelectionChange(null); // Réinitialise la sélection
    };

    // Filtrer les options disponibles qui ne sont pas encore sélectionnées
    const availableOptions = options.filter((option) => valueExtractor(option) !== selectedItem);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"  // Prendre toute la largeur
                >
                    <div className="flex items-center space-x-2 flex-wrap">
                        {/* Affichage de l'élément sélectionné sans le Badge */}
                        {selectedItem ? (
                            <div className="flex items-center space-x-2">
                                <span>{labelExtractor(options.find(option => valueExtractor(option) === selectedItem)!)} </span>
                                {/* Bouton pour supprimer la sélection */}
                                <X
                                    className="cursor-pointer text-black"
                                    onClick={handleRemoveSelection}
                                />
                            </div>
                        ) : (
                            <span className="text-gray-500">{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">  {/* S'assurer que le popover prend toute la largeur */}
                <Command>
                    <CommandInput placeholder="Rechercher..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>Aucune option trouvée.</CommandEmpty>
                        <CommandGroup>
                            {availableOptions.map((option) => {
                                const value = valueExtractor(option);
                                const label = labelExtractor(option);
                                return (
                                    <CommandItem key={value} onSelect={() => handleSelection(value)}>
                                        {label}
                                        <Check className={cn("ml-auto", selectedItem === value ? "opacity-100" : "opacity-0")} />
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
