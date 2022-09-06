import { useMutation } from "react-query";
import { useMutation as gqlMutation } from "@apollo/client";
import { MeetroomAPI } from "@api/api";
import { DELETE_MEETROOM } from "graphql/meetroom/mutation";
import { GET_MEETROOMS } from "graphql/meetroom/query";
import { useGetMeetrooms } from "./useGetQueries";
import { useHandleSuccess } from "@hooks/common/useHandleSuccess";

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
        onError: (error) => console.log(error.response)
    });

    return result;
}

export const useDeleteImages = () => {
    const result = useMutation(["meetroom", "delete-images"], ((images: string[]) => MeetroomAPI.deleteImages(images)))

    return result;
}

export const useCreateMeetroom = (setIsModal: (is:boolean) => void) => {
    const meetrooms = useGetMeetrooms();
    const { handleSuccess } = useHandleSuccess();
    const successTitle = "회의실 생성 완료";

    const result = useMutation(["meetroom", "create"], (meetroom: any) => MeetroomAPI.createMeetroom(meetroom), {
        onSuccess: (res) => {
            handleSuccess({ title: successTitle, setIsModal });
            meetrooms.refetch();
        },
        onError: (error) => {}
    });

    return result;
};

export const useUpdateMeetroom = (setIsModal: (is:boolean) => void) => {
    const meetrooms = useGetMeetrooms();
    const { handleSuccess } = useHandleSuccess();
    const successTitle = "회의실 수정 완료";

    const result = useMutation(["meetroom", "update"], (meetroom: any) => MeetroomAPI.updateMeetroom(meetroom), {
        onSuccess: (res) => {
            handleSuccess({ title: successTitle, setIsModal });
            meetrooms.refetch();
        },
        onError: (error) => {}
    });

    return result;

};

export const useDeleteMeetroom = (setIsModal: (is:boolean) => void, setIsDeleteModal: (is:boolean) => void) => {
    const { handleSuccess } = useHandleSuccess();
    const successTitle = "회의실 삭제 완료";

    const result = gqlMutation(DELETE_MEETROOM, {
        onCompleted: (res) => {
            handleSuccess({ title: successTitle, setIsModal });
        },
        refetchQueries: [
            {query: GET_MEETROOMS}
        ],
        onError: (error) => console.log(error),
    })

    return result;
}