import {useMutation} from "@tanstack/react-query";
import {addUserToWhiteList} from "@/services/whiteListService";

const useAddUserToWhiteList = () => {

    return useMutation({
        mutationKey: ["add-user-to-white-list"],
        mutationFn: async (email: string) => await addUserToWhiteList(email),
        retry: 0
    })

}

export default useAddUserToWhiteList;