'use client';

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Mission } from '@/types/mission/Mission';
import CustomButton from '@/components/custom/CustomButton';
import useDeleteMission from '@/hooks/mission/useDeleteMission';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface DeleteMissionAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mission: Mission;
}

const DeleteMissionAlertDialog = ({
  isOpen,
  onClose,
  mission,
}: DeleteMissionAlertDialogProps) => {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useDeleteMission();

  const handleConfirmDelete = async () => {
    try {
      setError(null);

      await mutateAsync(mission.id);

      await queryClient.invalidateQueries({
        queryKey: ['get-missions'],
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ['get-kpi-stats'],
        exact: false,
      });

      toast.success('Mission supprimée avec succès', {
        position: 'bottom-right',
        className: '!bg-[#CBF5E5] !text-[#176448] !border !border-[#CBF5E5]',
      });

      onClose();
    } catch (error) {
      console.log(error);
      setError('Une erreur est survenue lors de la suppression de la mission.');
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Supprimer la mission {mission.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer cette mission ? Cette action est
            irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        <AlertDialogFooter>
          <CustomButton
            onClick={onClose}
            className="bg-white border border-gray-200 shadow-none text-secondary-foreground hover:bg-gray-100"
          >
            Annuler
          </CustomButton>
          <CustomButton
            onClick={handleConfirmDelete}
            className="min-w-32 bg-red-500 border border-red-600 shadow-none hover:bg-red-600"
            isLoading={isPending}
            disabled={isPending}
          >
            Confirmer
          </CustomButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMissionAlertDialog;
