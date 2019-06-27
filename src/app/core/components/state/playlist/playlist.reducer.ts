import { PlaylistActions, PlaylistActionTypes } from "./playlist.actions";
import { State } from "src/app/state/app.state";
import { Playlist } from "src/app/shared/models/Playlist";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coreModuleFeature } from "src/app/shared/helpers/constants";
export interface PlaylistState {
  playlist: Playlist;
  playlists: Playlist[];
  error: string;
  isLoaded: boolean;
}

const initialState: PlaylistState = {
  playlist: null,
  playlists: null,
  isLoaded: false,
  error: ""
};

const selectCoreModuleState = createFeatureSelector<State>(coreModuleFeature);

export const selectPlaylistFeatureState = createSelector(
  selectCoreModuleState,
  state => state.playlist
);

export const getPlaylist = createSelector(
  selectPlaylistFeatureState,
  state => state.playlist
);

export const getPlaylists = createSelector(
  selectPlaylistFeatureState,
  state => state.playlists
);

export const getPlaylistIsLoaded = createSelector(
  selectPlaylistFeatureState,
  state => state.isLoaded
);

export const getPlaylistError = createSelector(
  selectPlaylistFeatureState,
  state => state.error
);

export function playlistReducer(
  state = initialState,
  action: PlaylistActions
): PlaylistState {
  switch (action.type) {
    case PlaylistActionTypes.LoadPlaylist:
    case PlaylistActionTypes.LoadPlaylists:
      return {
        ...state,
        playlist: null,
        playlists: null,
        isLoaded: false
      };
    case PlaylistActionTypes.LoadPlaylistSuccess:
      return {
        ...state,
        playlist: action.payload,
        isLoaded: true,
        error: ""
      };
    case PlaylistActionTypes.LoadPlaylistsSuccess:
      return {
        ...state,
        playlists: action.payload,
        isLoaded: true,
        error: ""
      };
    case PlaylistActionTypes.LoadPlaylistsFail:
    case PlaylistActionTypes.LoadPlaylistFail:
    case PlaylistActionTypes.CreatePlaylistFail:
      return {
        ...state,
        playlist: null,
        playlists: null,
        error: action.payload,
        isLoaded: true
      };

    case PlaylistActionTypes.CreatePlaylistSuccess:
      return {
        ...state,
        playlists: [...state.playlists, action.payload],
        error: "",
        isLoaded: true
      };

    default:
      return state;
  }
}
