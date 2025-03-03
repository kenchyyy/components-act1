import User from "../../types/user";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/apiUser";

export const useGetUsers = () => {
    return useQuery<User[], Error>({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    })
}
