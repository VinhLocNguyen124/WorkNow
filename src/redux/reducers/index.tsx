import { combineReducers } from 'redux';
import postReducer from './post';
import listChoiceReducer from './listChoice';
import listSkillReducer from './listSkill';
import listUniReducer from './listUni';

const rootReducer = combineReducers({
    post: postReducer,
    listChoice: listChoiceReducer,
    listSkill: listSkillReducer,
    listUni: listUniReducer,
});

export default rootReducer;