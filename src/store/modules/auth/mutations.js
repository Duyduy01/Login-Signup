import { SET_USER_TOKEN_DATA_MUTATION } from "@/store/storeconstants";

export default {
    [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
        state.email = payload.email;
        state.tken = payload.token;
        state.expiresIn = payload.expiresIn;
        state.refreshToken = payload.refreshToken;
        state.usserId = payload.userId;
    },
};