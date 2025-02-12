'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
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
  // Initialiser les dates avec undefined pour ne pas afficher de date par défaut
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

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
            {date ? (
              date.to ? (
                <>
                  {/* Affichage des dates en français */}
                  {date.from && format(date.from, 'dd-MM-yyyy', { locale: fr })} -{' '}
                  {format(date.to, 'dd-MM-yyyy', { locale: fr })}
                </>
              ) : (
                // Affichage de la date de début uniquement si "to" est vide
                date.from && format(date.from, 'dd-MM-yyyy', { locale: fr })
              )
            ) : (
              <span>Sélectionner une plage de dates</span> // Texte par défaut
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            selected={date}  // Utilisation de selected pour contrôler la sélection
            onSelect={setDate}  // Callback sur la sélection de dates
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
