import { Employee } from "../../types/Employee";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../api/employeeAPI";

export const useGetEmployees = () => {
    return useQuery<Employee[], Error>({
        queryKey: ["employees"],
        queryFn: () => getEmployees(),
    })
}
