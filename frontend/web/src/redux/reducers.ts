import { AnyAction, combineReducers } from 'redux'
import Auth         from './auth/reducer' // import Sample from './sample/reducer';
import Users        from './users/reducer'
import Courses      from './courses/reducer'
import Schoolyear   from './school-year/reducer'
import Classroom    from './classroom/reducer'
import Subject      from './subject/reducer'

export const appReducer = combineReducers({
    Auth,
    Users,
    Courses,
    Schoolyear,
    Classroom,
    Subject

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
