'use client';

import React, { useState } from 'react';
import CustomButton from '@/components/custom/CustomButton';
import { Plus, Upload } from 'lucide-react';
import AddUserToWhiteListDialog from '@/components/dashboard/white-list/AddUserToWhiteListDialog';
import ImportWhiteListCSVDialog from '@/components/dashboard/white-list/ImportWhiteListCSVDialog';
import useGetWhiteList from '@/hooks/white-list/useGetWhiteList';
import LoadingBox from '@/components/dashboard/LoadingBox';
import ErrorBox from '@/components/dashboard/ErrorBox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NoDataBox from '@/components/dashboard/NoDataBox';
import WhiteListTablePaginationControls from '@/components/dashboard/white-list/WhiteListTablePaginationControls';

const WhiteListPage = () => {
  const [page, setPage] = useState<number>(1);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] =
    useState<boolean>(false);
  const [isImportCSVDialogOpen, setIsImportCSVDialogOpen] =
    useState<boolean>(false);

  const { isPending, isError, data } = useGetWhiteList({
    page,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isPending) {
    return <LoadingBox />;
  }

  if (isError || !data) {
    return (
      <ErrorBox message="Une erreur est survenue lors du chargement des utilisateurs autorisés." />
    );
  }

  return (
    <>
      <AddUserToWhiteListDialog
        isOpen={isAddUserDialogOpen}
        onClose={() => setIsAddUserDialogOpen(false)}
      />
      <ImportWhiteListCSVDialog
        isOpen={isImportCSVDialogOpen}
        onClose={() => setIsImportCSVDialogOpen(false)}
      />
      <div className="flex flex-col gap-8 w-full h-full">
        <div className="flex lg:flex-row flex-col lg:justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="font-semibold tracking-tighter text-4xl text-[#1734B6] bricolage-grotesque">
              Liste des utilisateurs autorisés
            </div>
          </div>
          <div className="flex gap-3">
            <CustomButton
              icon={<Upload className="flex-none size-4" />}
              onClick={() => setIsImportCSVDialogOpen(true)}
              className="!ring-0 bricolage-grotesque tracking-tighter font-bold text-[#344054] bg-white hover:bg-gray-50 border border-[#D0D5DD]"
            >
              Importer CSV
            </CustomButton>
            <CustomButton
              icon={<Plus className="flex-none size-4" />}
              onClick={() => setIsAddUserDialogOpen(true)}
            >
              Ajouter un utilisateur
            </CustomButton>
          </div>
        </div>
        {data.data && data.data.length > 0 ? (
          <Table>
            <TableHeader className="bg-[#F4F9FF] h-11 border-t border-t-[#EAECF0]">
              <TableRow>
                <TableHead className="text-xs font-medium text-[#475467]">
                  Addresse email
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((member, index) => (
                <TableRow
                  key={index}
                  className={`h-[4.5rem] cursor-pointer ${
                    index < data.data.length - 1
                      ? '!border-b border-b-[#EAECF0]'
                      : ''
                  }`}
                >
                  <TableCell>{member.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoDataBox message="Aucun utilisateur autorisé n'a encore été ajouté." />
        )}

        {data ? (
          <WhiteListTablePaginationControls
            currentPage={data.page}
            totalCount={data.total}
            perPage={data.perPage}
            onPageChange={handlePageChange}
          />
        ) : null}
      </div>
    </>
  );
};

export default WhiteListPage;
