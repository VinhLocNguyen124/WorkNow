import { combineReducers } from 'redux';
import postReducer from './post';
import listChoiceReducer from './listChoice';
import listSkillReducer from './listSkill';
import listUniReducer from './listUni';
import listMatchedJobReducer from './listMatchedJob';
import loginReducer from './login';
import globalUserReducer from './globalUser';
import companyReducer from './company';
import generalUserReducer from './generalUser';
import requestReducer from './request';
import requirementReducer from './requirement';
import notificationReducer from './notification';
import badgeReducer from './badge';

const rootReducer = combineReducers({
    post: postReducer,
    listChoice: listChoiceReducer,
    listSkill: listSkillReducer,
    listUni: listUniReducer,
    listMatchedJob: listMatchedJobReducer,
    login: loginReducer,
    globalUser: globalUserReducer,
    company: companyReducer,
    generalUser: generalUserReducer,
    request: requestReducer,
    requirement: requirementReducer,
    notification: notificationReducer,
    badge: badgeReducer
});

export default rootReducer;