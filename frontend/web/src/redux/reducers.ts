import { AnyAction, combineReducers } from 'redux';

import Auth from './auth/reducer'; // import Sample from './sample/reducer';

export const appReducer = combineReducers({
    Auth,
    //add reducer here
})

const rootReducer = (state: any, action: AnyAction) => {
    if (action.type === "LOGOUT_SUCCESS" || action.type === "LOGOUT_FAILED") {

        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer
