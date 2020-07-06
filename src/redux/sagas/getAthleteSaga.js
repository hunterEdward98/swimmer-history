import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* fetchAthletes(action) {
    try {
        const response = yield axios.get('/api/shelf/athletes');
        console.log(response)
        yield put({ type: 'SET_ATHLETES', payload: response.data });
        // now that the session has ended on the server
        // remove the client-side user object to let
        // the client-side code know the user is logged out
    } catch (error) {
        console.log('Error with athletes:', error);
    }
}
function* loginSaga() {
    yield takeLatest('FETCH_ATHLETES', fetchAthletes);
}

export default loginSaga;
