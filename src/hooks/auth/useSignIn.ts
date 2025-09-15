import {useMutation} from "@tanstack/react-query";
import {SignInPayload} from "@/types/auth/SignInPayload";
import {signIn} from "@/services/authService";

const useSignIn = () => {

    return useMutation({
        mutationKey: ["signin"],
        mutationFn: async (payload: SignInPayload) => await signIn(payload),
        retry: 0
    })

}

export default useSignIn;