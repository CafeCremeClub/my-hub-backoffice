'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CustomButton from '@/components/custom/CustomButton';
import { MissionStatus } from '@/types/mission/MissionStatus';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaCircle } from 'react-icons/fa6';
import { Mission } from '@/types/mission/Mission';
import { useQueryClient } from '@tanstack/react-query';
import useUpdateMissionStatus from '@/hooks/mission/useUpdateMissionStatus';
import { toast } from 'sonner';

interface UpdateMissionStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mission: Mission;
}

interface FormValues {
  status: MissionStatus;
}

const validationSchema = Yup.object({
  status: Yup.string()
    .oneOf([MissionStatus.OPEN, MissionStatus.CLOSED], 'Statut invalide')
    .required('Le statut est requis'),
});

const UpdateMissionStatusDialog = ({
  isOpen,
  onClose,
  mission,
}: UpdateMissionStatusDialogProps) => {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useUpdateMissionStatus();

  const formik = useFormik<FormValues>({
    initialValues: {
      status: mission.status,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);

        await mutateAsync({
          id: mission.id,
          status: values.status,
        });

        await queryClient.invalidateQueries({
          queryKey: ['get-missions'],
          exact: false,
        });

        toast.success('Statut de la mission mis à jour avec succès', {
          position: 'bottom-right',
          className: '!bg-[#CBF5E5] !text-[#176448] !border !border-[#CBF5E5]',
        });

        onClose();
      } catch (error) {
        console.log(error);
        setError(
          'Une erreur est survenue lors de la mise à jour du statut de la mission. Veuillez réessayer plus tard.'
        );
      }
    },
  });

  const statusOptions = [
    {
      value: MissionStatus.OPEN,
      label: 'Ouvert',
      description: 'La mission est ouverte aux candidatures',
      color: 'text-[#17B26A]',
    },
    {
      value: MissionStatus.CLOSED,
      label: 'Fermé',
      description: 'La mission est fermée aux candidatures',
      color: 'text-[#667085]',
    },
  ];

  const handleCancel = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg overflow-hidden rounded-[1.25rem]">
        <div className="bg-white flex flex-col gap-10 overflow-y-scroll scroll-hidden">
          <DialogHeader>
            <DialogTitle>Changer le statut de la mission</DialogTitle>
            <DialogDescription>
              Sélectionnez le nouveau statut de la mission pour le mettre à
              jour.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-4 px-2 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-[#344054]">
                Statut de la mission
              </label>
              <div className="flex flex-col gap-3">
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => formik.setFieldValue('status', option.value)}
                    className={`
                                            flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all
                                            ${
                                              formik.values.status ===
                                              option.value
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-[#D0D5DD] hover:border-gray-300'
                                            }
                                        `}
                  >
                    <div
                      className={`
                                            w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5
                                            ${
                                              formik.values.status ===
                                              option.value
                                                ? 'border-blue-500 bg-blue-500'
                                                : 'border-[#D0D5DD]'
                                            }
                                        `}
                    >
                      {formik.values.status === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FaCircle className={`!size-1.5 ${option.color}`} />
                        <span className="text-sm font-medium text-[#101828]">
                          {option.label}
                        </span>
                      </div>
                      <p className="text-xs text-[#475467]">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {formik.touched.status && formik.errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.status}
                </p>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <DialogFooter className="flex items-center justify-end">
              <CustomButton
                type="button"
                onClick={handleCancel}
                className="!ring-0 bricolage-grotesque tracking-tighter font-bold w-max text-[#344054] bg-white hover:bg-gray-50 border border-[#D0D5DD]"
              >
                Annuler
              </CustomButton>
              <CustomButton
                type="submit"
                disabled={
                  isPending ||
                  !formik.isValid ||
                  formik.values.status === mission.status
                }
                className="!ring-0 bricolage-grotesque tracking-tighter font-bold min-w-32 disabled:opacity-50 disabled:cursor-not-allowed"
                isLoading={isPending}
              >
                Confirmer
              </CustomButton>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMissionStatusDialog;
