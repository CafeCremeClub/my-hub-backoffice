"use client";

import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import CustomButton from "@/components/custom/CustomButton";
import {useRouter} from "next/navigation";
import {logout} from "@/app/actions/logout";
import {useQueryClient} from "@tanstack/react-query";

interface LogoutAlertDialogProps {
    open: boolean;
    onClose: () => void;
}

const LogoutAlertDialog = ({open, onClose}: LogoutAlertDialogProps) => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        await logout();
        queryClient.clear();
        router.replace('/auth/signin');
    }

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Confirmation de déconnexion
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez saisir vos identifiants pour vous
                        reconnecter.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <CustomButton
                        onClick={onClose}
                        className="h-12 bg-white border border-gray-200 shadow-none text-secondary-foreground hover:bg-secondary/90"
                    >
                        Fermer
                    </CustomButton>
                    <CustomButton
                        onClick={handleLogout}
                        className="h-12 min-w-32 text-white shadow-none"
                    >
                        Oui, me déconnecter
                    </CustomButton>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LogoutAlertDialog;