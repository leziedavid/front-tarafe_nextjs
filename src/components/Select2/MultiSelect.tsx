"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

type MultiSelectProps<T extends { id: string; libelle: string }> = {
    options: T[];
    selected: T[];
    onChange: (selected: T[]) => void;
    placeholder?: string;
};

export function MultiSelect<T extends { id: string; libelle: string }>({
    options,
    selected,
    onChange,
    placeholder = "Select options...",
}: MultiSelectProps<T>) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    const handleUnselect = (option: T) => {
        const newSelected = selected.filter((s) => s.id !== option.id);
        onChange(newSelected);
    };

    const handleSelect = (option: T) => {
        const newSelected = [...selected, option];
        onChange(newSelected);
        setInputValue("");
    };

    const selectables = options.filter(
        (option) => !selected.find((s) => s.id === option.id)
    );

    return (
        <Command className="overflow-visible bg-transparent">
            <div className="border border-input p-3 text-sm ring-offset-background rounded-md ">
                {/* Zone de saisie */}
                <CommandInput
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none placeholder:text-muted-foreground text-sm py-1"
                />

                {/* Badges en dessous */}
                {selected.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-2">
                        {selected.map((option) => (
                            <Badge key={option.id} variant="secondary" className="h-6 text-xs px-2 py-0.5">
                                {option.libelle}
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(option);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(option)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            {/* Dropdown options */}
            <div className="relative mt-1">
                {open && selectables.length > 0 ? (
                    <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                        <CommandList className="max-h-48 overflow-y-auto">
                            <CommandEmpty className="text-sm px-2 py-1">Aucun résultat</CommandEmpty>
                            <CommandGroup>
                                {selectables.map((option) => (
                                    <CommandItem
                                        key={option.id}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onSelect={() => handleSelect(option)}
                                        className="cursor-pointer py-1 px-2 text-sm"
                                    >
                                        {option.libelle}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </div>
                ) : null}
            </div>
        </Command>
    );
}
