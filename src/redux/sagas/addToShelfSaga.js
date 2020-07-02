import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* addToShelf(action) {
  try {
    yield axios.post('/api/shelf', action.payload);
    yield put({ type: 'FETCH_BOOKS' });

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* loginSaga() {
  yield takeLatest('ADD_TO_SHELF', addToShelf);
}

export default loginSaga;
