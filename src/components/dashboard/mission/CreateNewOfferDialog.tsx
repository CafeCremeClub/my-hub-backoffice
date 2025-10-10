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
import CustomInput from '@/components/custom/CustomInput';
import CustomMultiSelect from '@/components/custom/CustomMultiSelect';
import CustomTextarea from '@/components/custom/CustomTextarea';
import { CreateMissionPayload } from '@/types/mission/CreateMissionPayload';
import { Industry } from '@/types/mission/Industry';
import { Skill } from '@/types/mission/Skill';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomPhoneInput from '@/components/custom/CustomPhoneInput';
import CustomErrorIndicator from '@/components/custom/CustomErrorIndicator';
import { useQueryClient } from '@tanstack/react-query';
import useCreateMission from '@/hooks/mission/useCreateMission';
import { toast } from 'sonner';

interface CreateNewOfferDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Le titre est requis'),
  client: Yup.string().required('Le client est requis'),
  tjm: Yup.number()
    .min(1, 'Le TJM doit être supérieur à 0')
    .required('Le TJM est requis'),
  industry: Yup.array()
    .min(1, "Au moins un secteur d'activité est requis")
    .required("Les secteurs d'activité sont requis"),
  skills: Yup.array()
    .min(1, 'Au moins une compétence est requise')
    .required('Les compétences sont requises'),
  link: Yup.string()
    .url('Le lien doit être une URL valide')
    .required('Le lien est requis'),
  linkedIn: Yup.string()
    .url('Le lien LinkedIn doit être une URL valide')
    .optional(),
  whatsApp: Yup.string().required('Le numéro WhatsApp est requis'),
  companyBio: Yup.string().required("La bio de l'entreprise est requise"),
});

const CreateNewOfferDialog = ({
  isOpen,
  onClose,
}: CreateNewOfferDialogProps) => {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useCreateMission();

  const formik = useFormik<CreateMissionPayload>({
    initialValues: {
      title: '',
      client: '',
      tjm: 0,
      industry: [],
      skills: [],
      link: '',
      linkedIn: '',
      whatsApp: '',
      companyBio: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        await mutateAsync(values);

        await queryClient.invalidateQueries({
          queryKey: ['get-missions'],
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: ['get-kpi-stats'],
          exact: false,
        });

        toast.success('Offre créée avec succès', {
          position: 'bottom-right',
          className: '!bg-[#CBF5E5] !text-[#176448] !border !border-[#CBF5E5]',
        });

        onClose();
      } catch (error) {
        console.log(error);
        setError(
          "Une erreur est survenue lors de la création de l'offre. Veuillez réessayer plus tard."
        );
      }
    },
  });

  const industryOptions = Object.values(Industry).map((industry) => ({
    label: industry,
    value: industry,
  }));

  const skillOptions = Object.values(Skill).map((skill) => ({
    label: skill,
    value: skill,
  }));

  const handleCancel = () => {
    formik.resetForm();
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl overflow-hidden rounded-[1.25rem] h-[90vh]">
        <div className="bg-white flex flex-col gap-6 overflow-y-auto scroll-hidden">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle offre</DialogTitle>
            <DialogDescription>
              Remplissez les informations ci-dessous pour créer une nouvelle
              offre de mission.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6 px-2"
          >
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#344054]">
                Titre de la mission *
              </label>
              <CustomInput
                name="title"
                placeholder="Entrez le titre de la mission"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={formik.touched.title && !!formik.errors.title}
              />
              {formik.touched.title && formik.errors.title && (
                <CustomErrorIndicator message={formik.errors.title} />
              )}
            </div>

            {/* Client */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#344054]">
                Client *
              </label>
              <CustomInput
                name="client"
                placeholder="Nom du client"
                value={formik.values.client}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={formik.touched.client && !!formik.errors.client}
              />
              {formik.touched.client && formik.errors.client && (
                <CustomErrorIndicator message={formik.errors.client} />
              )}
            </div>

            {/* TJM */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#344054]">
                TJM (€) *
              </label>
              <CustomInput
                name="tjm"
                type="number"
                min={1}
                placeholder="Taux journalier moyen"
                value={formik.values.tjm || ''}
                onChange={(e) => {
                  const value = e.target.value;

                  // allow empty input so user can delete
                  if (value === '') {
                    formik.setFieldValue('tjm', '');
                    return;
                  }

                  // parse the value as integer
                  const intValue = parseInt(value, 10);

                  // ignore negative numbers
                  if (intValue < 0) return;

                  formik.setFieldValue('tjm', isNaN(intValue) ? 0 : intValue);
                }}
                onBlur={formik.handleBlur}
                isError={formik.touched.tjm && !!formik.errors.tjm}
              />
              {formik.touched.tjm && formik.errors.tjm && (
                <CustomErrorIndicator message={formik.errors.tjm} />
              )}
            </div>

            {/* Industry */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#344054]">
                Secteurs d&#39;activité *
              </label>
              <CustomMultiSelect
                value={formik.values.industry}
                onChange={(values) => formik.setFieldValue('industry', values)}
                placeholder="Sélectionnez les secteurs d'activité"
                options={industryOptions}
                isError={formik.touched.industry && !!formik.errors.industry}
              />
              {formik.touched.industry && formik.errors.industry && (
                <CustomErrorIndicator
                  message={formik.errors.industry as string}
                />
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#344054]">
                Compétences *
              </label>
              <CustomMultiSelect
                value={formik.values.skills}
                onChange={(values) => formik.setFieldValue('skills', values)}
                placeholder="Sélectionnez les compétences requises"
                options={skillOptions}
                isError={formik.touched.skills && !!formik.errors.skills}
              />
              {formik.touched.skills && formik.errors.skills && (
                <CustomErrorIndicator
                  message={formik.errors.skills as string}
                />
              )}
            </div>

            {/* Link */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#344054]">
                Lien de l&#39;offre *
              </label>
              <CustomInput
                name="link"
                type="url"
                placeholder="https://example.com/offre"
                value={formik.values.link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={formik.touched.link && !!formik.errors.link}
              />
              {formik.touched.link && formik.errors.link && (
                <CustomErrorIndicator message={formik.errors.link} />
              )}
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#344054]">
                Lien LinkedIn
              </label>
              <CustomInput
                name="linkedIn"
                type="url"
                placeholder="https://www.linkedin.com/in/username"
                value={formik.values.linkedIn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={formik.touched.linkedIn && !!formik.errors.linkedIn}
              />
              {formik.touched.linkedIn && formik.errors.linkedIn && (
                <CustomErrorIndicator message={formik.errors.linkedIn} />
              )}
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#344054]">
                Numéro WhatsApp *
              </label>
              <CustomPhoneInput
                placeholder="+33 6 12 34 56 78"
                value={formik.values.whatsApp}
                onChange={(val) => formik.setFieldValue('whatsApp', val)}
                isError={formik.touched.whatsApp && !!formik.errors.whatsApp}
              />
              {formik.touched.whatsApp && formik.errors.whatsApp && (
                <CustomErrorIndicator message={formik.errors.whatsApp} />
              )}
            </div>

            {/* Company Bio */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#344054]">
                Bio de l&#39;entreprise *
              </label>
              <CustomTextarea
                name="companyBio"
                placeholder="Décrivez l'entreprise et le contexte de la mission..."
                value={formik.values.companyBio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={
                  formik.touched.companyBio && !!formik.errors.companyBio
                }
                rows={4}
              />
              {formik.touched.companyBio && formik.errors.companyBio && (
                <CustomErrorIndicator message={formik.errors.companyBio} />
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
                Créer l&#39;offre
              </CustomButton>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewOfferDialog;
