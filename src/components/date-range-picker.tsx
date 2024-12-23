'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { fr } from 'date-fns/locale'; // Importer la locale française
import * as React from 'react';
import { DateRange } from 'react-day-picker';

interface CalendarDateRangePickerProps {
  className?: string;
  onDateChange: (formattedDateRange: string) => void;
}

export function CalendarDateRangePicker({
  className,
  onDateChange
}: CalendarDateRangePickerProps) {
  // Calculer le premier jour du mois courant
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // 1er jour du mois
  const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 10); // 10e jour du mois

  // Initialiser les dates avec le 1er au 10 du mois en cours
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth,
    to: endOfMonth,
  });

  React.useEffect(() => {
    if (date?.from && date.to) {
      // Formater les dates en format ISO pour l'API
      const formattedFrom = format(date.from, 'yyyy-MM-dd'); // Format ISO
      const formattedTo = format(date.to, 'yyyy-MM-dd'); // Format ISO
      const formattedDateRange = `${formattedFrom},${formattedTo}`; // Plage au format ISO
      onDateChange(formattedDateRange); // Appel du callback avec la valeur formatée pour l'API
    }
  }, [date, onDateChange]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {/* Affichage des dates en français */}
                  {format(date.from, 'dd-MM-yyyy', { locale: fr })} -{' '}
                  {format(date.to, 'dd-MM-yyyy', { locale: fr })}
                </>
              ) : (
                // Affichage de la date de début uniquement si "to" est vide
                format(date.from, 'dd-MM-yyyy', { locale: fr })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
