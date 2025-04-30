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

// On exige que T ait un id et un libelle
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
            <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                    {selected.map((option) => (
                        <Badge key={option.id} variant="secondary">
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
                    <CommandInput
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={placeholder}
                        className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                {open && selectables.length > 0 ? (
                    <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup className="h-full overflow-auto">
                                {selectables.map((option) => (
                                    <CommandItem
                                        key={option.id}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onSelect={() => handleSelect(option)}
                                        className={"cursor-pointer"}
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
