import {
    WALLET_SET_SUCCESS,
    WALLET_SET_FAIL,
    WALLET_SET_UPDATE
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
    case WALLET_SET_SUCCESS:
        return {
        message: "successfully registered!",
        };
    case WALLET_SET_FAIL:
        return {
        message: "failed while register wallet address!",
        };
    case WALLET_SET_UPDATE:
        return {
        message: "successfully updated!",
    };
    default:
        return state;
    }
}