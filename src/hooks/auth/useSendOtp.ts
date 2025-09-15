import {useMutation} from "@tanstack/react-query";
import {SendOTPPayload} from "@/types/auth/SendOTPPayload";
import {sendOTP} from "@/services/authService";

const useSendOtp = () => {

    return useMutation({
        mutationKey: ["send-otp"],
        mutationFn: async (payload: SendOTPPayload) => await sendOTP(payload),
        retry: 0
    })

}

export default useSendOtp;