import { useMutation } from "react-query";
import { useMutation as gqlMutation } from "@apollo/client";
import { MeetroomAPI } from "@api/api";
import { DELETE_MEETROOM } from "graphql/meetroom/mutation";
import { GET_MEETROOMS } from "graphql/meetroom/query";
import { useGetMeetrooms } from "./useGetQueries";

export const useUploadImages = () => {
    const result = useMutation(["meetroom", "upload-images"], (images: any[]) => {
        const formData = new FormData();
        images.forEach(image => {
            if (image.file !== null) {
                formData.append("images", image.file);
            };
        })
        return MeetroomAPI.uploadImages(formData);
    },
    {
        onSuccess: (res) => {},
        onError: () => {}
    });

    return result;
}

export const useDeleteImages = () => {
    const result = useMutation(["meetroom", "delete-images"], ((images: string[]) => MeetroomAPI.deleteImages(images)))

    return result;
}

export const useCreateMeetroom = () => {
    const meetrooms = useGetMeetrooms();
    const result = useMutation(["meetroom", "create"], (meetroom: any) => MeetroomAPI.createMeetroom(meetroom), {
        onSuccess: (res) => {
            meetrooms.refetch();
        },
        onError: (error) => {}
    });

    return result;
};

export const useUpdateMeetroom = () => {
    const meetrooms = useGetMeetrooms();
    const result = useMutation(["meetroom", "update"], (meetroom: any) => MeetroomAPI.updateMeetroom(meetroom), {
        onSuccess: (res) => {
            meetrooms.refetch();
        },
        onError: (error) => {}
    });

    return result;

};

export const useDeleteMeetroom = () => {
    const result = gqlMutation(DELETE_MEETROOM, {
        refetchQueries: [
            {query: GET_MEETROOMS}
        ]
    })

    return result;
}