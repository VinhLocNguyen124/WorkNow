import { blackList } from '../constansts/blackList';


const returnExpectSkillArray = (array) => {
    let newListSkillDefault = [];
    array.map(item => {
        newListSkillDefault.push({
            id: array.indexOf(item),
            name: item.name,
            type: item.type,
            important: false
        });
    });
    return newListSkillDefault;
}

const returnExpectUniArray = (array) => {
    let newListUni = [];
    array.map(item => {
        newListUni.push({
            id: array.indexOf(item),
            name: item.name,
        });
    });
    return newListUni;
}

const checkExistingItemInArray = (listSkill, skill) => {
    let count = 0;
    listSkill.forEach(item => {
        if (item.name === skill.name) {
            count++;
        }
    });
    if (count > 0) {
        return false;
    } else {
        return true
    }
}

const filterBestSkill = (arrSkill) => {
    let array = [];
    array = arrSkill.filter((skill) => {
        return skill.important === true;
    });
    return array;
}

const filterSubSkill = (arrSkill) => {
    let array = [];
    array = arrSkill.filter((skill) => {
        return skill.important === false;
    });
    return array;
}

const checkBlackListCondition = (commentContent: string, resolve: Function, reject: Function) => {
    const arrCmtContentSplit = commentContent.trim().toLowerCase().split(" ");
    let violations = [];

    arrCmtContentSplit.forEach((elm, index) => {
        if (blackList.includes(elm)) {
            violations.push(elm)
        }
    });


    if (violations.length > 0) {
        // Do when violating the condition
        reject(violations.toString());
    } else {
        // Do when having no word violate the condition
        resolve();
    }

}

export { returnExpectSkillArray, checkExistingItemInArray, returnExpectUniArray, filterBestSkill, filterSubSkill, checkBlackListCondition }