import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    listSkill: [],
    rootDefaultSkill: [],
    listSkillDefault: [],

    addSkillLoading: false,
    updateSkillLoading: false,
    deleteSkillLoading: false,

    listRequireSkill: [],
}

const listSkillReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.ADD_REQUIRE_SKILL: {
            return {
                ...state,
                listRequireSkill: [...state.listRequireSkill, action.payload],
            }
            break;
        }

        case ActionTypes.DELETE_REQUIRE_SKILL: {
            return {
                ...state,
                listRequireSkill: [...state.listRequireSkill.slice(0, action.payload), ...state.listRequireSkill.slice(action.payload + 1)],
            }
            break;
        }

        case ActionTypes.ADD_SKILL_LOADING: {
            return {
                ...state,
                addSkillLoading: true,
            }
            break;
        }

        case ActionTypes.ADD_SKILL_SUCCESS: {
            return {
                ...state,
                addSkillLoading: false,
            }
            break;
        }

        case ActionTypes.ADD_SKILL_ERROR: {
            return {
                ...state,
                addSkillLoading: false,
            }
            break;
        }

        case ActionTypes.DELETE_SKILL_LOADING: {
            return {
                ...state,
                deleteSkillLoading: true,
            }
            break;
        }

        case ActionTypes.DELETE_SKILL_SUCCESS: {
            return {
                ...state,
                deleteSkillLoading: false,
            }
            break;
        }

        case ActionTypes.DELETE_SKILL_ERROR: {
            return {
                ...state,
                deleteSkillLoading: false,
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
