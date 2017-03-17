import * as types from './actionTypes.js';

export function lockNavigator() {
  return {
    type: types.LOCK_NAVIGATOR
  };
}

export function unlockNavigator() {
  return {
    type: types.UNLOCK_NAVIGATOR
  };
}
