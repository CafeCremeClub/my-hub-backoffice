'use client';

import React, { useState } from 'react';
import CustomInput from '@/components/custom/CustomInput';
import CustomButton from '@/components/custom/CustomButton';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CustomOtpInput from '@/components/custom/CustomOTPInput';
import CustomErrorIndicator from '@/components/custom/CustomErrorIndicator';
import { useRouter } from 'next/navigation';
import useSignIn from '@/hooks/auth/useSignIn';
import useSendOtp from '@/hooks/auth/useSendOtp';
import { handleSendOTPError } from '@/utils/helpers/handleSendOTPError';
import { toast } from 'sonner';
import { handleSignInError } from '@/utils/helpers/handleSignInError';
import { saveCookies } from '@/app/actions/saveCookies';
import { UserRole } from '@/types/auth/UserRole';

const SignInForm = () => {
  const router = useRouter();

  const { isPending: signInIsPending, mutateAsync: mutateSignIn } = useSignIn();

  const { isPending: sendOtpIsPending, mutateAsync: mutateSendOtp } =
    useSendOtp();

  const [step, setStep] = useState<'email' | 'otp'>('email');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Adresse email invalide')
      .required("L'email est requis"),
    otp: Yup.string()
      .length(4, 'Le code OTP doit contenir 4 chiffres')
      .matches(/^\d+$/, 'Le code OTP ne doit contenir que des chiffres'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (step === 'email') {
        try {
          await mutateSendOtp({
            email: values.email,
          });

          toast.success('Code OTP envoyé', {
            description: 'Un code OTP a été envoyé à votre adresse e-mail.',
            position: 'bottom-right',
            className:
              '!bg-[#CBF5E5] !text-[#176448] !border !border-[#CBF5E5]',
            descriptionClassName: '!text-[#176448] !text-xs',
          });

          setStep('otp');
        } catch (error) {
          const errorMessage = handleSendOTPError(error);
          toast.error("Échec de l'envoi du code OTP", {
            description: errorMessage,
            position: 'bottom-right',
            className: '!bg-[#DF1C41] !text-white',
            descriptionClassName: '!text-white !text-xs',
          });
        }
      } else {
        try {
          const response = await mutateSignIn({
            email: values.email,
            code: values.otp,
          });

          if (response.user.role !== UserRole.ADMIN) {
            toast.error('Échec de la connexion', {
              description:
                "Vous n'avez pas les permissions requises pour accéder à cette application.",
              position: 'bottom-right',
              className: '!bg-[#DF1C41] !text-white',
              descriptionClassName: '!text-white !text-xs',
            });
            return;
          }

          await saveCookies({
            token: response.accessToken,
          });

          router.replace('/dashboard');

          toast.success('Connexion réussie', {
            description: 'Bienvenue sur MyHub dashboard!',
            position: 'bottom-right',
            className:
              '!bg-[#CBF5E5] !text-[#176448] !border !border-[#CBF5E5]',
            descriptionClassName: '!text-[#176448] !text-xs',
          });
        } catch (error) {
          const errorMessage = handleSignInError(error);
          toast.error('Échec de la connexion', {
            description: errorMessage,
            position: 'bottom-right',
            className: '!bg-[#DF1C41] !text-white',
            descriptionClassName: '!text-white !text-xs',
          });
        }
      }
    },
  });

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="bricolage-grotesque font-semibold text-[#101828] text-3xl tracking-tighter">
          Bienvenue sur MyHub dashboard
        </p>
        <p className="text-[#475467]">
          Connecte-toi pour accéder aux meilleures opportunités de mission.
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-5">
          {step === 'email' ? (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-[#344054]">
                Adresse e-mail
              </label>
              <CustomInput
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isError={
                  formik.touched.email && formik.errors.email !== undefined
                }
              />
              {formik.touched.email && formik.errors.email && (
                <CustomErrorIndicator message={formik.errors.email} />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm text-[#344054]">
                Code envoyé par e-mail
              </label>
              <div className="flex justify-center">
                <CustomOtpInput
                  value={formik.values.otp}
                  onChange={(value) => {
                    formik.setFieldValue('otp', value);
                  }}
                />
              </div>
              {formik.touched.otp && formik.errors.otp && (
                <CustomErrorIndicator message={formik.errors.otp} />
              )}
            </div>
          )}
        </div>
        <CustomButton
          type="submit"
          className="bricolage-grotesque font-semibold"
          disabled={sendOtpIsPending || signInIsPending}
          isLoading={sendOtpIsPending || signInIsPending}
        >
          {step === 'email' ? 'Se connecter' : 'Vérifier'}
        </CustomButton>
      </form>
    </div>
  );
};

export default SignInForm;
