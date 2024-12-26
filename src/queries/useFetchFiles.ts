import { fetch } from "@/api/fetch";
import { IFile } from "@/types/IFile";
import { useQuery } from "@tanstack/react-query";

export function useFetchFile(search: string, offset: number) {

    return useQuery({
        queryKey: ["files"],
        queryFn: async () => {
            const response = await fetch(`/file/getFiles?s=${search}&offset=${offset}`) as { data: IFile[], totalFile: number, lastPage?: number };
            if (!response || typeof response !== "object" || !("data" in response)) {
                throw new Error("Invalid response");
            }
            return {
                data: response.data,
                totalFile: response.totalFile,
                lastPage: response.lastPage
            };
        },
    });

}
