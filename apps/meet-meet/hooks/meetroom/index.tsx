import { useQuery } from "@apollo/client"
import { useMutation } from "react-query"
import { GET_MEETROOMS, GET_MEETROOM_BY_ID } from "graphql/meetroom/query"
import { MeetroomAPI } from "@api/api"

import { MeetRoom, MeetRoomData } from "graphql/meetroom/types"

export class Meetroom {
    constructor () {

    }

    /**
     * @function getMeetrooms
     * @return {MeetRoomData}
     */
    getAll = () => {
        const result =  useQuery<MeetRoomData>(GET_MEETROOMS);
        return { ...result };
    }

    /**
     * @function getMeetroom
     * @param {number} id - 조회할 회의실 id
     * @return {MeetRoom}
     */
    getOne = (id: number) => {
        const result = useQuery<MeetRoom>(GET_MEETROOM_BY_ID, { variables: { id } })
        return { ...result };
    }

    create = (form: any) => {
        const { uploadImages: uploadImagesAPI, createMeetroom: createMeetroomAPI } = MeetroomAPI;

        const upload = useMutation(["meetroom", "images"], () => uploadImagesAPI(), {
            onSuccess: (res) => {
                const meetroom = { ...form, urls: [...res.data]}
                create.mutateAsync(meetroom)
            },
            onError: () => {}
        });
        const create = useMutation(["meetroom", "create"], (meetroom: any) => createMeetroomAPI(meetroom), {
            onSuccess: (res) => {},
            onError: (error) => {}
        });

        upload.mutateAsync(form.images);

        return { upload, create };
    }

    update = () => {

    }

    delete = () => {

    }

}

const meetroom = new Meetroom();