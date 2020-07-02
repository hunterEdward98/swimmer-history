import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGOUT" actions
function* getShelf() {
  try {
    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true,
    // };
    // yield axios.post('/api/user/login', action.payload, config);
    const items = yield axios.get('/api/shelf');
    console.log('items', items);
    yield put({ type: 'SET_ITEMS', payload: items.data });

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* getShelfSaga() {
  yield takeLatest('FETCH_BOOKS', getShelf);
}

export default getShelfSaga;
