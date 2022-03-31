import { all, StrictEffect } from 'redux-saga/effects';

import authSaga from './auth/saga';

export default function* rootSaga(): Generator<StrictEffect> {
    yield all([
        //ADD SAGA HERE
        ...authSaga,
    ])
}