import { useMutation } from "react-query";
import { useMutation as gqlMutation } from "@apollo/client";
import { MeetroomAPI } from "@api/api";
import { DELETE_MEETROOM } from "graphql/meetroom/mutation";
import { GET_MEETROOMS } from "graphql/meetroom/query";
import { useGetMeetrooms, useGetMeetroomImages, useGetMeetroomMergeInfo } from "./useGetQueries";
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
        onError: (error) => {}
    });

    return result;
}

export const useDeleteImages = (setIsModal: (is:boolean) => void, setIsDeleteModal: (is:boolean) => void) => {
    const { handleSuccess } = useHandleSuccess();
    const title = "회의실 삭제 완료";
    const result = useMutation(
        ["meetroom", "delete-images"],
        ((urls: string[]) => MeetroomAPI.deleteImages(urls)), 
        {
            onSuccess: res => handleSuccess({ title, setIsModal, setIsSecondModal: setIsDeleteModal })
        }
    );

    return result;
}

export const useCreateMeetroom = (setIsModal: (is:boolean) => void) => {
    const meetrooms = useGetMeetrooms();
    const { handleSuccess } = useHandleSuccess();
    const title = "회의실 생성 완료";

    const result = useMutation(["meetroom", "create"], (meetroom: any) => MeetroomAPI.createMeetroom(meetroom), {
        onSuccess: (res) => {
            handleSuccess({ title, setIsModal });
            meetrooms.refetch();
        },
        onError: (error) => {}
    });

    return result;
};

export const useUpdateMeetroom = (setIsModal: (is:boolean) => void, meetroomId: number) => {
    const meetrooms = useGetMeetrooms();
    const images = useGetMeetroomImages(meetroomId);
    const mergeInfo = useGetMeetroomMergeInfo(meetroomId);
    const { handleSuccess } = useHandleSuccess();
    const title = "회의실 수정 완료";

    const result = useMutation(["meetroom", "update"], (meetroom: any) => MeetroomAPI.updateMeetroom(meetroom), {
        onSuccess: (res) => {
            handleSuccess({ title, setIsModal });
            meetrooms.refetch();
            images.refetch();
            mergeInfo.refetch();
        },
        onError: (error) => {}
    });

    return result;

};

export const useDeleteMeetroom = () => {
    const result = gqlMutation(DELETE_MEETROOM, {
        refetchQueries: [
            {query: GET_MEETROOMS}
        ],
        onError: (error) => console.log(error),
    })

    return result;
}