import React from 'react';
import CustomButton from "@/components/custom/CustomButton";


interface ApplicationsTablePaginationControlsProps {
    currentPage: number;
    totalCount: number;
    perPage: number;
    onPageChange: (page: number) => void;
}

const ApplicationsTablePaginationControls = ({
                                                 currentPage,
                                                 totalCount,
                                                 perPage,
                                                 onPageChange
                                             }: ApplicationsTablePaginationControlsProps) => {


    const totalPages = Math.ceil(totalCount / perPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show pages with ellipsis
            if (currentPage <= 3) {
                // Show first few pages
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Show last few pages
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Show pages around current page
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    // Don't render pagination if there's only one page or no data
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-between px-6 pt-3 pb-4">
            <div className="flex items-center gap-2">
                <CustomButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "bg-white border border-[#D0D5DD] text-[#344054] hover:text-white"}
                >
                    Précédent
                </CustomButton>
                <CustomButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "bg-white border border-[#D0D5DD] text-[#344054] hover:text-white"}
                >
                    Suivant
                </CustomButton>
            </div>
            <p className="font-medium text-sm text–[#344054]">
                Page {currentPage} sur {getPageNumbers().length}
            </p>
        </div>
    );
};

export default ApplicationsTablePaginationControls;