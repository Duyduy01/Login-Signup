import { GET_USER_TOKEN_GETTER } from  '../../storeconstants';
import { IS_AUTHENTICATE_GETTER } from '../../storeconstants';

export default {
    [GET_USER_TOKEN_GETTER]: (state) => {
        return state.token;
    },

    [IS_AUTHENTICATE_GETTER](state) {
      return !!state.token;
    },
};