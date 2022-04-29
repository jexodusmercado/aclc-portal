import { all, StrictEffect } from 'redux-saga/effects';

import authSaga         from './auth/saga';
import usersSaga        from './users/saga'
import courseSaga       from './courses/saga'
import schoolYearSaga   from './school-year/saga'

export default function* rootSaga(): Generator<StrictEffect> {
    yield all([
        //ADD SAGA HERE
        ...authSaga,
        ...usersSaga,
        ...courseSaga,
        ...schoolYearSaga
    ])
}