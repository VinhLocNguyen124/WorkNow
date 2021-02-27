import * as ActionTypes from './actionTypes';
import { get, fetchData, getData } from '../../apis/apiCaller';
import { URLs } from '../../constansts/url'
import { ToastAndroid } from 'react-native';
import { listSkillDefault } from '../../constansts/listSkillDefault';
import { returnExpectSkillArray, checkExistingItemInArray } from '../../helpers/ArrayHandling';

export const onAddRequireSkill = (skill) => (dispatch, getState) => {
    const { listRequireSkill } = getState().listSkill;

    const check = checkExistingItemInArray(listRequireSkill, skill);
    if (!check) {
        ToastAndroid.show("You already had this skill in your list!", ToastAndroid.SHORT);
    } else {
        dispatch({
            type: ActionTypes.ADD_REQUIRE_SKILL,
            payload: skill
        });
    }

}

export const onAddSkill = (userskill, email: string) => (dispatch, getState) => {
    const { globalUser } = getState().globalUser;

    dispatch({
        type: ActionTypes.ADD_SKILL_LOADING,
    });

    const check = checkExistingItemInArray(globalUser.skills, userskill);

    if (!check) {
        dispatch({
            type: ActionTypes.ADD_SKILL_ERROR,
        });
        ToastAndroid.show("You already had this skill in your list!", ToastAndroid.SHORT);
    } else {

        fetchData("skills", "POST", userskill).then(data => {
            if (data.status === "success") {
                getData("users/" + email).then(data => {
                    dispatch({
                        type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
                        payload: data
                    });
                    dispatch({
                        type: ActionTypes.ADD_SKILL_SUCCESS,
                    });
                    ToastAndroid.show(`Added ${userskill.name} in your list skill successfully!`, ToastAndroid.SHORT);
                }).catch(error => {
                    dispatch({
                        type: ActionTypes.ADD_SKILL_ERROR,
                    });
                    ToastAndroid.show(`Error: ` + error.message, ToastAndroid.SHORT);
                })
            }
        }).catch(error => {
            dispatch({
                type: ActionTypes.ADD_SKILL_ERROR,
            });
            ToastAndroid.show(`Error: ` + error.message, ToastAndroid.SHORT);
        })
    }
}

export const onChangeImportantSkill = (important: boolean, idSkill: string, email: string) => async (dispatch, getState) => {

    try {
        const res = await fetchData("skills/updateskill/" + idSkill, "PUT", { bestskill: important });
        if (res.status === "success") {
            const resUserGlobal = await getData("users/" + email);
            await dispatch({
                type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
                payload: resUserGlobal
            });
            if (important) {
                ToastAndroid.show("Đánh dấu kĩ năng tốt thành công!!", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Bỏ đánh dấu kĩ năng tốt thành công!!", ToastAndroid.SHORT);
            }

        }
    } catch (error) {
        ToastAndroid.show(`Error: ` + error.message, ToastAndroid.SHORT);
    }

}

export const onDeleteSkill = (idSkill: string, email: string) => async (dispatch, getState) => {

    await dispatch({
        type: ActionTypes.DELETE_SKILL_LOADING,
    });

    try {
        const res = await fetchData("skills/deleteskill/" + idSkill, "DELETE");
        if (res.status === "success") {
            const resUserGlobal = await getData("users/" + email);
            await dispatch({
                type: ActionTypes.GET_USER_AND_SET_TO_GLOBAL,
                payload: resUserGlobal
            });
            await dispatch({
                type: ActionTypes.DELETE_SKILL_SUCCESS,
            });
            ToastAndroid.show("Xóa kĩ năng thành công!!", ToastAndroid.SHORT);
        }
    } catch (error) {
        await dispatch({
            type: ActionTypes.DELETE_SKILL_ERROR,
        });
        ToastAndroid.show(`Error: ` + error.message, ToastAndroid.SHORT);
    }
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

export const setDefaultSkill = () => async (dispatch, getState) => {

    const listskill = await getData("skills");

    await dispatch({
        type: ActionTypes.SET_DEFAULT_SKILL,
        payload: listskill,
    });
}

export const createListSkill = (arraySkill) => async (dispatch, getState) => {
    try {
        const resUserSchool = await fetchData("skills", "POST", { array: arraySkill });
    } catch (error) {
        ToastAndroid.show(`Errror`, ToastAndroid.SHORT);
    }

}
