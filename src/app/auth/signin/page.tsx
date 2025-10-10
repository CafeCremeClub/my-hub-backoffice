import React from 'react';
import Image from 'next/image';
import { blueLogo, logo, user } from '../../../../public';
import { FaStar } from 'react-icons/fa6';
import SignInForm from '@/components/auth/signin/SignInForm';

const SignInPage = () => {
  return (
    <div className="h-screen grid xl:grid-cols-2">
      <div className="bg-[#F9FAFB] hidden xl:flex flex-col justify-between px-5 py-7">
        <Image
          src={logo}
          alt="logo"
          className="object-center object-cover w-64"
        />

        <div className="flex flex-col gap-8">
          <p className="text-center font-medium text-[#101828] text-3xl bricolage-grotesque">
            MyHub m&#39;a permis de trouver des <br />
            missions rapidement et sans prise de tête.
            <br />
            Les offres sont pertinentes et <br />
            parfaitement adaptées à mon profil.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Image
              src={user}
              alt="user image"
              className="size-16 rounded-full object-cover object-center"
            />
            <div className="flex flex-col items-center">
              <p className="bricolage-grotesque text-[#101828] font-semibold">
                Pippa Wilkinson
              </p>
              <p className="text-sm font-medium text-[#475467]">
                Head of Design
              </p>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({
                length: 5,
              }).map((_, i) => (
                <FaStar key={i} size={18} className="text-[#FDB022]" />
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-[#475467]">
          © Cafe Creme {new Date().getFullYear()}
        </p>
      </div>

      <div className="flex flex-col justify-center items-center px-5 py-7">
        <div className="flex flex-col gap-5 md:w-[22.5rem]">
          <div className="w-full">
            <Image
              src={blueLogo}
              alt="blue logo"
              className="size-8 object-center object-cover"
            />
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
