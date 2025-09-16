import React, {useState} from 'react';
import useGetMe from "@/hooks/auth/useGetMe";
import CustomButton from "@/components/custom/CustomButton";
import {Skeleton} from "@/components/ui/skeleton";
import {Plus} from "lucide-react";
import CreateNewOfferDialog from "@/components/dashboard/mission/CreateNewOfferDialog";

const DashboardContentHeader = () => {

    const [isAddNewOfferDialogOpen, setIsAddNewOfferDialogOpen] = useState<boolean>(false);

    const {isPending, data} = useGetMe();


    return (
        <>
            <CreateNewOfferDialog
                isOpen={isAddNewOfferDialogOpen}
                onClose={() => setIsAddNewOfferDialogOpen(false)}
            />
            <div className="flex lg:flex-row flex-col lg:justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <div className="font-semibold tracking-tighter text-4xl text-[#1734B6] bricolage-grotesque">
                        {
                            isPending ? <Skeleton className="h-7 w-28 bg-gray-200"/> :
                                data ? `Bienvenue, ${data.firstname} ${data.lastname}` :
                                    "Bienvenue, Utilisateur"
                        }
                    </div>
                    <p className="text-[#475467]">
                        Créer les fiches de postes et gérer les candidatures depuis l’espace admin. .
                    </p>
                </div>
                <CustomButton
                    icon={<Plus className="flex-none size-4"/>}
                    onClick={() => setIsAddNewOfferDialogOpen(true)}
                >
                    Ajouter une nouvelle offre
                </CustomButton>
            </div>
        </>
    );
};

export default DashboardContentHeader;