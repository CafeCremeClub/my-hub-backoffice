import {AxiosError} from "axios";

export const handleSendOTPError = (
    error: unknown,
    setError?: (msg: string) => void
): string => {

    if (error instanceof AxiosError) {
        const status = error.response?.status || 500;

        switch (status) {
            case 500:
                const name = error.response?.data?.name || "";
                if (name === "EmailNotAllowedForSignup") {
                    const message = "L'adresse e-mail que vous avez saisie n'est pas autorisée pour l'inscription.";
                    setError?.(message);
                    return message;
                }

                const message500 = "Erreur interne du serveur. Veuillez réessayer plus tard.";
                setError?.(message500);
                return message500;

            default:
                const defaultMessage = "Quelque chose s'est mal passé. Veuillez réessayer plus tard.";
                setError?.(defaultMessage);
                return defaultMessage;
        }
    }

    const message = "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
    setError?.(message);
    return message;

}