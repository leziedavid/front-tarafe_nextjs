"use client";

import * as React from "react";
import { Check, ChevronsUpDown, CircleX, X } from "lucide-react";  // Ajout de l'icône X
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge"; // Assure-toi d'importer le composant Badge si nécessaire

// Définition des types génériques pour les options
interface ComboboxMultiSelectProps<T> {
    options: T[];
    selectedItems: string[];
    onSelectionChange: (selectedItems: string[]) => void;
    labelExtractor: (item: T) => string;
    valueExtractor: (item: T) => string;
    placeholder?: string;
}

export function ComboboxMultiSelect<T>({
    options,
    selectedItems,
    onSelectionChange,
    labelExtractor,
    valueExtractor,
    placeholder = "Sélectionner...",
}: ComboboxMultiSelectProps<T>) {
    const [open, setOpen] = React.useState(false);

    // Fonction pour gérer la sélection/désélection des éléments
    const handleSelection = (value: string) => {
        const isSelected = selectedItems.includes(value);
        const newSelection = isSelected
            ? selectedItems.filter((item) => item !== value)
            : [...selectedItems, value];

        onSelectionChange(newSelection); // Notifier le parent
    };

    // Fonction pour retirer un élément sélectionné
    const handleRemoveSelection = (value: string) => {
        const newSelection = selectedItems.filter((item) => item !== value);
        onSelectionChange(newSelection); // Notifier le parent
    };

    // Filtrer les options disponibles qui ne sont pas encore sélectionnées
    const availableOptions = options.filter((option) => 
        !selectedItems.includes(valueExtractor(option))
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox"  aria-expanded={open}  className="w-full justify-between"  >
                    <div className="flex items-center space-x-2 flex-wrap">
                        {/* Affichage du nombre d'éléments sélectionnés */}
                        <div className="flex flex-wrap gap-1">
                            {selectedItems.map((selectedItem) => {
                                const label = labelExtractor(options.find(option => valueExtractor(option) === selectedItem)!);
                                return (
                                    <Badge key={selectedItem} className="text-sm flex items-center gap-1">
                                        {label}
                                        {/* Bouton pour supprimer un élément sélectionné */}
                                        <CircleX className="cursor-pointer text-black h-4 w-4 text-white" onClick={() => handleRemoveSelection(selectedItem)} />
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">  {/* S'assurer que le popover prend toute la largeur */}
                <Command className="w-full">
                    <CommandInput placeholder="Rechercher..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>Aucune option trouvée.</CommandEmpty>
                        <CommandGroup>
                            {availableOptions.map((option) => {
                                const value = valueExtractor(option);
                                const label = labelExtractor(option);
                                return (
                                    <CommandItem className="w-full" key={value} onSelect={() => handleSelection(value)}>
                                        {label}
                                        <Check className={cn( "ml-auto", selectedItems.includes(value) ? "opacity-100" : "opacity-0" )}/>
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
