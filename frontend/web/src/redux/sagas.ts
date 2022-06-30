import { all, StrictEffect } from 'redux-saga/effects';

import authSaga         from './auth/saga';
import usersSaga        from './users/saga'
import courseSaga       from './courses/saga'
import schoolYearSaga   from './school-year/saga'
import classroomSaga    from './classroom/saga';
import SubjectSaga      from './subject/saga';
import PostSaga         from './post/saga';
import CommentSaga      from './comment/saga';
import QuizSaga         from './quiz/saga';

export default function* rootSaga(): Generator<StrictEffect> {
    yield all([
        //ADD SAGA HERE
        ...authSaga,
        ...usersSaga,
        ...courseSaga,
        ...schoolYearSaga,
        ...classroomSaga,
        ...SubjectSaga,
        ...PostSaga,
        ...CommentSaga,
        ...QuizSaga
    ])
}