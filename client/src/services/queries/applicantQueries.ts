import { useQuery } from "@tanstack/react-query";
import { Applicant } from "../../types/Applicant";
import { getApplicants } from "../api/applicantAPI";

export const useGetApplicants = () => {
    return useQuery<Applicant[], Error>({
        queryKey: ["applicants"],
        queryFn: () => getApplicants(),
    })
}