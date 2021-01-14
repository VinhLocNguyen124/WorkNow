import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    email: '',
    password: '',
    checkSaveAccount: false,
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.SAVE_ACCOUNT: {
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                checkSaveAccount: action.payload.checkSaveAccount,
            }
            break;
        }


        default:
            return state;
    }
}

export default loginReducer;
