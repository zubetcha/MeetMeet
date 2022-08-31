import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { AxiosResponse } from "axios";

/**
 *
 * @desc useMutation용 커스텀 훅
 * @param {Promise} api - mutate 함수로 사용할 api
 * @param {string[]} [queryKey] -  mutate 성공 시 refetch하고 싶은 queryKey
 * @returns {Object} - useMutation result
 */
export const useCustomMutate = (
    api: (data: any) => Promise<AxiosResponse<any, any>>,
    queryKey?: string[],
) => {
    const queryClient = useQueryClient();

    const [errorCode, setErrorCode] = useState<number>(0);

    const mutate = useMutation((data: any) => api(data), {
        onMutate: async () => {
            if (queryKey) {
                await queryClient.cancelQueries(queryKey, { exact: true });
                const previousData = queryClient.getQueriesData(queryKey);
                
                queryClient.setQueryData(queryKey, previousData);
                
                return { previousData };
            }
        },
        onError: (err, variables, context: any) => {
            if (queryKey && context?.previousData) {
                queryClient.setQueryData(queryKey, context?.previousData);
            }
        },
        onSuccess: async (res) => {
            if (res.status === 200) {
                if (queryKey) {
                    await queryClient.invalidateQueries(queryKey, { exact: true }, { throwOnError: true });
                }
            } else {
                setErrorCode(res.data.code);
            }
        },
    });

    useEffect(() => {
        if (mutate.isLoading) {
            setErrorCode(0);
        }
    }, [mutate.isLoading]);

    return { ...mutate, errorCode };
};