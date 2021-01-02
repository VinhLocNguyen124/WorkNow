import * as ActionTypes from './actionTypes';
import { get } from '../../apis/apiCaller';
import { URLs } from '../../constansts/url'
import { ToastAndroid } from 'react-native';
import { listSkillDefault } from '../../constansts/listSkillDefault';
import { returnExpectSkillArray, checkExistingItemInArray } from '../../helpers/ArrayHandling';


export const onAddSkill = (skill) => (dispatch, getState) => {
    const { listSkill } = getState().listSkill;

    const check = checkExistingItemInArray(listSkill, skill);

    if (!check) {
        ToastAndroid.show("You already had this skill in your list!", ToastAndroid.SHORT);
    } else {
        dispatch({
            type: ActionTypes.ADD_SKILL,
            payload: skill,
        });

        ToastAndroid.show(`Added ${skill.name} in your list skill successfully!`, ToastAndroid.SHORT);
    }
}

export const onChangeImportantSkill = (important: boolean, idSkill: number) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.UPDATE_IMPORTANT_SKILL,
        payload: {
            important: important,
            idSkill: idSkill
        },
    });

}

export const onDeleteSkill = (idSkill: number) => (dispatch, getState) => {

    dispatch({
        type: ActionTypes.DELETE_SKILL,
        payload: idSkill
    });

}



export const onAddDefaultSkill = (skillName: string) => (dispatch, getState) => {
    const { listSkill, listSkillDefault, rootDefaultSkill } = getState().listSkill;

    const skill = {
        id: rootDefaultSkill.length,
        name: skillName,
        type: "o",
        important: false
    }

    dispatch({
        type: ActionTypes.ADD_DEFAULT_SKILL,
        payload: skill,
    });

    ToastAndroid.show(`Added ${skill.name} in defaul skills successfully!`, ToastAndroid.SHORT);
}

export const onSortDefaultSkill = (condition: string,) => (dispatch, getState) => {
    const { rootDefaultSkill } = getState().listSkill;
    const listskill = rootDefaultSkill;


    let result = [];

    switch (condition) {
        case "all":
            result = listskill;
            break;

        case "lg":
            result = listskill.filter(skill => {
                return skill.type === "lg"
            });
            break;

        case "fw":
            result = listskill.filter(skill => {
                return skill.type === "fw"
            });
            break;

        case "o":
            result = listskill.filter(skill => {
                return skill.type === "o"
            });
            break;

        default:
            break;
    }

    dispatch({
        type: ActionTypes.SORT_DEFAULT_SKILL,
        payload: result,
    });
}

export const setDefaultSkill = () => (dispatch, getState) => {

    const listskill = returnExpectSkillArray(listSkillDefault);

    dispatch({
        type: ActionTypes.SET_DEFAULT_SKILL,
        payload: listskill,
    });
}

