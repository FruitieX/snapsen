import {AsyncStorage} from 'react-native';
import {fromJS} from 'immutable';
const STATE_STORAGE_KEY = 'SnapsenAppState:Latest';

import {reducers as restReducers} from './rest';

export async function resetSnapshot() {
  const state = await rehydrate();
  if (state) {
    return fromJS(state);
  }

  return null;
}

export async function saveSnapshot(state) {
  await persist(state.toJS());
}

export async function clearSnapshot() {
  await clear();
}

/**
 * Saves provided state object to async storage
 *
 * @returns {Promise}
 */
async function persist(state) {
  try {
    await AsyncStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error persisting application state', e);
  }
}

/**
 * Reads state object from async storage
 *
 * @returns {Promise}
 */
async function rehydrate() {
  try {
    let state = await AsyncStorage.getItem(STATE_STORAGE_KEY);

    if (state) {
      state = JSON.parse(state);

      // Set 'loading' property to false for all REST endpoints.
      // If the 'loading' flag is set even though there is no in flight API request,
      // redux-api will wait forever and never let us issue any further API requests
      // to that endpoint
      Object.keys(restReducers).forEach((endpoint) => {
        const endpointState = state[endpoint];

        if (endpointState) {
          endpointState.loading = false;
        }
      });

      return state;
    }

    return null;
  } catch (e) {
    console.error('Error reading persisted application state', e);
    return null;
  }
}

async function clear() {
  try {
    await AsyncStorage.removeItem(STATE_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing peristed application state', e);
  }
}
