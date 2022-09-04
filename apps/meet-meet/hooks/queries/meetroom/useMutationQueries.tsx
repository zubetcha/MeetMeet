import { useMutation } from "react-query";
import { MeetroomAPI } from "@api/api";

export const useCreateMeetroom = () => {
    const { uploadImages: uploadImagesAPI, createMeetroom: createMeetroomAPI } = MeetroomAPI;

    const upload = useMutation(["meetroom", "upload-images"], (images: any[]) => {
        const formData = new FormData();
        images.forEach(image => {
            if (image.file !== null) {
                formData.append("images", image.file);
            };
        })
        return uploadImagesAPI(formData);
    },
    {
        onSuccess: (res) => {},
        onError: () => {}
    });
    const create = useMutation(["meetroom", "create"], (meetroom: any) => createMeetroomAPI(meetroom), {
        onSuccess: (res) => {},
        onError: (error) => {}
    });


    return { upload, create };
};

export const useUpdateMeetroom = () => {

};

export const useDeleteMeetroon = () => {

}