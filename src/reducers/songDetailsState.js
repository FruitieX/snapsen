import * as types from '../actions/actionTypes';

const initialState = {
  isLocked: false
};

export default function songDetailsState(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOCK_NAVIGATOR:
      return {
        ...state,
        isLocked: true
      };
    case types.UNLOCK_NAVIGATOR:
      return {
        ...state,
        isLocked: false
      };
    default:
      return state;
  }
}
