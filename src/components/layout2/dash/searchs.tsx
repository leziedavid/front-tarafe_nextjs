'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type SearchProps = {
    search: string;
    setSearch: (value: string) => void;
};

export function Searchs({ search, setSearch }: SearchProps) {
    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
        </div>
    );
}
