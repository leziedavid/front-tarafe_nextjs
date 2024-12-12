import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // Importation des composants de ShadCN

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, lastPage, onPageChange }) => {
  // Fonction pour gérer le changement de page
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      onPageChange(page); // Met à jour la page active
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Pagination précédente */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={`${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground'
            }`}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Affichage des numéros de pages */}
        {[...Array(lastPage)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
              className={`${
                index + 1 === currentPage ? 'bg-primary text-white': 'text-muted-foreground hover:bg-muted' } rounded-md p-2`} >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis pour pages supplémentaires */}
        {lastPage > 5 && currentPage < lastPage - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Pagination suivante */}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={`${
              currentPage === lastPage ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground'
            }`}
            aria-disabled={currentPage === lastPage}  // Utilisation de `aria-disabled` pour l'accessibilité
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
