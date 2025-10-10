import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CustomInput from '@/components/custom/CustomInput';
import CustomErrorIndicator from '@/components/custom/CustomErrorIndicator';
import CustomButton from '@/components/custom/CustomButton';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Label } from '@/components/ui/label';
import useAddUserToWhiteList from '@/hooks/white-list/UseAddUserToWhiteList';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface AddUserToWhiteListDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserToWhiteListDialog = ({
  isOpen,
  onClose,
}: AddUserToWhiteListDialogProps) => {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useAddUserToWhiteList();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email invalide')
        .required("L'email est requis"),
    }),
    onSubmit: async (values) => {
      try {
        await mutateAsync(values.email);
        formik.resetForm();

        await queryClient.invalidateQueries({
          queryKey: ['get-white-list'],
          exact: false,
        });

        toast.success('Utilisateur ajouté à la liste blanche avec succès !', {
          position: 'bottom-right',
          className: '!bg-[#CBF5E5] !text-[#176448] !border !border-[#CBF5E5]',
        });

        onClose();
      } catch (error) {
        console.log(error);
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-[1.25rem]">
        <div className="bg-white flex flex-col gap-6 overflow-y-auto scroll-hidden">
          <DialogHeader>
            <DialogTitle>Ajouter un utilisateur à la liste blanche</DialogTitle>
            <DialogDescription>
              Entrez l&#39;adresse email de l&#39;utilisateur que vous souhaitez
              ajouter à la liste blanche.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6 px-2"
          >
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-[#344054]"
              >
                Email *
              </Label>
              <CustomInput
                id="email"
                name="email"
                type="email"
                placeholder="example@myhub.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={formik.touched.email && !!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && (
                <CustomErrorIndicator message={formik.errors.email} />
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <DialogFooter className="flex items-center justify-end gap-3">
              <CustomButton
                type="button"
                onClick={handleCancel}
                className="!ring-0 bricolage-grotesque tracking-tighter font-bold w-max text-[#344054] bg-white hover:bg-gray-50 border border-[#D0D5DD]"
              >
                Annuler
              </CustomButton>
              <CustomButton
                type="submit"
                disabled={isPending || !formik.isValid || !formik.dirty}
                className="!ring-0 bricolage-grotesque tracking-tighter font-bold min-w-32 disabled:opacity-50 disabled:cursor-not-allowed"
                isLoading={isPending}
              >
                Ajouter
              </CustomButton>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserToWhiteListDialog;
