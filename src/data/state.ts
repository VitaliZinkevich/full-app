import { combineReducers } from './combineReducers';
import { sessionsReducer } from './sessions/sessions.reducer';
import { userReducer } from './user/user.reducer';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
const getItem: any = async function (key: string) {
  const { value } = await Storage.get({ key: key });
  return value;
}

export const initialState: AppState = {
  data: {
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    loading: false
  },
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedin: false,
    loading: false
  }
};

getItem('light').then ((mode: string)=>{
  let parsedMode: boolean = JSON.parse (mode);
  if (mode !== null && initialState.user.darkMode !== parsedMode) {
    initialState.user.darkMode = parsedMode
  }
});

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;