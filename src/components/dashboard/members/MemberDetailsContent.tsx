"use client";

import React from 'react';
import useGetMemberById from "@/hooks/members/useGetMemberById";
import LoadingBox from "@/components/dashboard/LoadingBox";
import ErrorBox from "@/components/dashboard/ErrorBox";
import {Badge} from "@/components/ui/badge";
import CustomButton from "@/components/custom/CustomButton";
import {
    User,
    MapPin,
    Phone,
    Mail,
    Briefcase,
    DollarSign,
    FileText,
    Award,
    Building
} from "lucide-react";
import {FaCaretLeft, FaLinkedin, FaWhatsapp} from "react-icons/fa6";
import {useRouter} from "next/navigation";

interface MemberDetailsContentProps {
    id: string;
}

const MemberDetailsContent = ({id}: MemberDetailsContentProps) => {

    const router = useRouter();
    const {isPending, isError, data} = useGetMemberById(id);

    if (isPending) {
        return (
            <LoadingBox/>
        )
    }

    if (isError || !data) {
        return (
            <ErrorBox
                message="Une erreur est survenue lors du chargement des details du membre."
            />
        )
    }

    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <CustomButton
                type="button"
                iconPosition="left"
                icon={<FaCaretLeft className="flex-none"/>}
                className="!ring-0 bricolage-grotesque tracking-tighter font-bold w-max text-[#344054] bg-white hover:bg-gray-50 border border-[#D0D5DD]"
                onClick={() => router.back()}
            >
                Retour aux membres
            </CustomButton>
            {/* Header Section */}
            <div className="flex lg:flex-row flex-col lg:justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <div className="font-semibold tracking-tighter text-4xl text-[#1734B6] bricolage-grotesque">
                        {data.firstname} {data.lastname}
                    </div>
                    <div className="text-lg text-[#667085] font-medium">
                        {data.profession}
                    </div>
                    <div className="flex items-center gap-2 text-[#667085]">
                        <MapPin className="flex-none w-4 h-4"/>
                        <span>{data.city}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 lg:items-start items-stretch">
                    <CustomButton
                        className="!ring-0 bricolage-grotesque tracking-tighter font-bold"
                        onClick={() => window.open(data.linkedIn, '_blank')}
                    >
                        <FaLinkedin className="flex-none w-4 h-4 mr-2"/>
                        LinkedIn
                    </CustomButton>
                    <CustomButton
                        className="!ring-0 bricolage-grotesque tracking-tighter font-bold bg-green-600 hover:bg-green-700"
                        onClick={() => window.open(`https://wa.me/${data.whatsApp}`, '_blank')}
                    >
                        <FaWhatsapp className="flex-none w-4 h-4 mr-2"/>
                        WhatsApp
                    </CustomButton>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Left Column - Personal & Contact Info */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Contact Information Card */}
                    <div className="bg-white rounded-[0.75rem] border border-[#D0D5DD] p-6">
                        <h3 className="text-lg font-semibold text-[#1734B6] mb-4 flex items-center gap-2">
                            <User className="flex-none w-5 h-5"/>
                            Informations de contact
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="flex-none w-4 h-4 text-[#667085]"/>
                                <div>
                                    <div className="text-sm text-[#667085]">Email</div>
                                    <div className="text-sm font-medium text-[#1B55F5]">{data.email}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="flex-none w-4 h-4 text-[#667085]"/>
                                <div>
                                    <div className="text-sm text-[#667085]">Téléphone</div>
                                    <div className="text-sm font-medium text-[#1B55F5]">{data.phone}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaWhatsapp className="flex-none w-4 h-4 text-[#667085]"/>
                                <div>
                                    <div className="text-sm text-[#667085]">WhatsApp</div>
                                    <div className="text-sm font-medium text-[#1B55F5]">{data.whatsApp}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Summary Card */}
                    <div className="bg-white rounded-[0.75rem] border border-[#D0D5DD] p-6">
                        <h3 className="text-lg font-semibold text-[#1734B6] mb-4 flex items-center gap-2">
                            <Briefcase className="flex-none w-5 h-5"/>
                            Résumé professionnel
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-[#667085] mb-1">Profession</div>
                                <div className="text-sm font-medium text-[#344054]">{data.profession}</div>
                            </div>
                            <div>
                                <div className="text-sm text-[#667085] mb-1">Expertise</div>
                                <div className="text-sm font-medium text-[#344054]">{data.expertise}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="flex-none w-4 h-4 text-[#667085]"/>
                                <div>
                                    <div className="text-sm text-[#667085]">TJM</div>
                                    <div className="text-lg font-bold text-[#1B55F5]">{data.tjm}€</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents Card */}
                    <div className="bg-white rounded-[0.75rem] border border-[#D0D5DD] p-6">
                        <h3 className="text-lg font-semibold text-[#1734B6] mb-4 flex items-center gap-2">
                            <FileText className="flex-none w-5 h-5"/>
                            Documents
                        </h3>
                        <div className="space-y-3">
                            <CustomButton
                                className="!ring-0 bricolage-grotesque tracking-tighter font-bold w-full text-[#344054] bg-gray-50 hover:bg-gray-100 border border-[#D0D5DD]"
                                onClick={() => window.open(data.cv, '_blank')}
                            >
                                <FileText className="flex-none w-4 h-4 mr-2"/>
                                Télécharger CV
                            </CustomButton>
                        </div>
                    </div>
                </div>

                {/* Right Column - Skills & Industry */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Biography Card */}
                    <div className="bg-white rounded-[0.75rem] border border-[#D0D5DD] p-6">
                        <h3 className="text-lg font-semibold text-[#1734B6] mb-4 flex items-center gap-2">
                            <User className="flex-none w-5 h-5"/>
                            Biographie
                        </h3>
                        <p className="text-[#344054] text-sm leading-relaxed">
                            {data.bio || "Aucune biographie disponible pour ce membre."}
                        </p>
                    </div>

                    {/* Skills Card */}
                    {
                        data.skills ?
                            <div className="bg-white rounded-[0.75rem] border border-[#D0D5DD] p-6">
                                <h3 className="text-lg font-semibold text-[#1734B6] mb-4 flex items-center gap-2">
                                    <Award className="flex-none w-5 h-5"/>
                                    Compétences techniques
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.length > 0 ? (
                                        data.skills.map((skill, index) => (
                                            <Badge
                                                key={index}
                                                className="bg-[#EEF4FF] text-[#1B55F5] border-[#B2CCFF] hover:bg-[#DBEAFE] px-3 py-1 text-xs font-medium"
                                            >
                                                {skill}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-[#667085] text-sm">Aucune compétence renseignée</p>
                                    )}
                                </div>
                            </div> : null
                    }

                    {/* Industry Card */}
                    <div className="bg-white rounded-[0.75rem] border border-[#D0D5DD] p-6">
                        <h3 className="text-lg font-semibold text-[#1734B6] mb-4 flex items-center gap-2">
                            <Building className="flex-none w-5 h-5"/>
                            Secteurs d&#39;activité
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data.industry.length > 0 ? (
                                data.industry.map((industry, index) => (
                                    <Badge
                                        key={index}
                                        className="bg-[#F0FDF4] text-[#15803D] border-[#86EFAC] hover:bg-[#DCFCE7] px-3 py-1 text-xs font-medium"
                                    >
                                        {industry}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-[#667085] text-sm">Aucun secteur d&#39;activité renseigné</p>
                            )}
                        </div>
                    </div>

                    {/* Desired Jobs Card */}
                    <div className="bg-white rounded-[0.75rem] border border-[#D0D5DD] p-6">
                        <h3 className="text-lg font-semibold text-[#1734B6] mb-4 flex items-center gap-2">
                            <Briefcase className="flex-none w-5 h-5"/>
                            Postes recherchés
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data.desiredJobs.length > 0 ? (
                                data.desiredJobs.map((job, index) => (
                                    <Badge
                                        key={index}
                                        className="bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] hover:bg-[#FEF9C3] px-3 py-1 text-xs font-medium"
                                    >
                                        {job}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-[#667085] text-sm">Aucun poste recherché renseigné</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetailsContent;