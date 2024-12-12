// src/components/AdminSearch.tsx
"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input"; // You can use your custom Input component
import { Search } from 'lucide-react'; // You can use any icon you prefer

const AdminSearch: React.FC = () => {   
    const [query, setQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // You can implement the actual search logic here
        console.log("Searching for:", query);
    };

    return (
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
            <div className="relative w-full">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleSearchChange}
                    className="pr-10"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Search className="h-5 w-5" />
                </button>
            </div>
        </form>
    );
};

export default AdminSearch;
