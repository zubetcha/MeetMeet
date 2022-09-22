import { atom } from "recoil";
import { MeetRoom } from "graphql/meetroom/types";
import { loggingEffect } from "recoil/effects";

const MEETROOM_ATOM_KEY = "meetroom"

export const meetroomState = atom<MeetRoom[]>({
    key: MEETROOM_ATOM_KEY,
    default: [],
    effects: [loggingEffect(MEETROOM_ATOM_KEY)]
})