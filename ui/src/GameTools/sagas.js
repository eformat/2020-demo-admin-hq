import { put, takeLatest } from 'redux-saga/effects';

import { sendOutgoingMessage } from '../Socket/actions';
import { SEND_PING, UPDATE_GAME_STATE, RESET_GAME } from './actions';
import { OUTGOING_MESSAGE_TYPES } from '../Socket/messageTypes';

function* executeSendPing(action) {
  yield put(sendOutgoingMessage({type: OUTGOING_MESSAGE_TYPES.PING}));
}

function* watchSendPing() {
  yield takeLatest(SEND_PING, executeSendPing);
}

function* executeUpdateGameState(action) {
  yield put(sendOutgoingMessage({
    type: OUTGOING_MESSAGE_TYPES.UPDATE_GAME,
    game: {state: action.payload.state},
    username: action.payload.username,
    password: action.payload.password
  }));
}

function* watchUpdateGameState() {
  yield takeLatest(UPDATE_GAME_STATE, executeUpdateGameState);
}

function* executeResetGame(action) {
  yield put(sendOutgoingMessage({
    type: OUTGOING_MESSAGE_TYPES.RESET_GAME,
    username: action.payload.username,
    password: action.payload.password
  }));
}

function* watchResetGame() {
  yield takeLatest(RESET_GAME, executeResetGame);
}

export default [
  watchUpdateGameState(),
  watchResetGame(),
  watchSendPing()
];