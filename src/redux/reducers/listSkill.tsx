import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    listSkill: [],
    rootDefaultSkill: [],
    listSkillDefault: [],
}

const listSkillReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.ADD_SKILL: {
            return {
                ...state,
                listSkill: [...state.listSkill, action.payload]
            }
            break;
        }

        case ActionTypes.DELETE_SKILL: {
            const newArray = state.listSkill.filter(skill => skill.id !== action.payload);

            return {
                ...state,
                listSkill: newArray,
            }
            break;
        }

        case ActionTypes.UPDATE_IMPORTANT_SKILL: {

            const index = state.listSkill.findIndex(skill => skill.id === action.payload.idSkill);
            const newArray = [...state.listSkill];
            newArray[index].important = action.payload.important;

            return {
                ...state,
                listSkill: newArray,
            }
            break;
        }

        case ActionTypes.SET_DEFAULT_SKILL: {
            return {
                ...state,
                rootDefaultSkill: action.payload,
                listSkillDefault: action.payload,
            }
            break;
        }

        case ActionTypes.SORT_DEFAULT_SKILL: {
            return {
                ...state,
                listSkillDefault: action.payload
            }
            break;
        }

        case ActionTypes.ADD_DEFAULT_SKILL: {
            return {
                ...state,
                rootDefaultSkill: [...state.rootDefaultSkill, action.payload],
                listSkillDefault: [...state.listSkillDefault, action.payload],
            }
            break;
        }

        default:
            return state;
    }
}

export default listSkillReducer;
