'use client';


import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { Tableau } from '@/components/layout2/dash/tableau';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function OverViewPage() {

    const [search, setSearch] = useState(''); // Recherche

    return (

        <div className="container mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-2xl font-bold tracking-tight"> Bonjour, Bienvenue 👋 </h2>
            </div>

            <Tableau />

        </div>
    );
}
