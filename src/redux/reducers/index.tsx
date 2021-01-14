import { combineReducers } from 'redux';
import postReducer from './post';
import listChoiceReducer from './listChoice';
import listSkillReducer from './listSkill';
import listUniReducer from './listUni';
import listMatchedJobReducer from './listMatchedJob';
import loginReducer from './login';

const rootReducer = combineReducers({
    post: postReducer,
    listChoice: listChoiceReducer,
    listSkill: listSkillReducer,
    listUni: listUniReducer,
    listMatchedJob: listMatchedJobReducer,
    login: loginReducer,
});

export default rootReducer;