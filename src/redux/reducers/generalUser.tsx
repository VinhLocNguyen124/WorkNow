import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    generalUser: null,

}

const generalUserReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.GET_INFO_GENERAL_USER: {
            return {
                ...state,
                generalUser: action.payload,

            }
            break;
        }

        default:
            return state;
    }
}

export default generalUserReducer;
