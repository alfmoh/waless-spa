import { Album } from "./../../../../shared/models/Album";
import { coreModuleFeature } from "./../../../../shared/helpers/constants";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AlbumActions, AlbumActionTypes } from "./album.actions";
import { State } from "src/app/state/app.state";

export interface AlbumState {
  album: Album;
  error: string;
  isLoaded: boolean;
}

const initialState: AlbumState = {
  album: null,
  error: "",
  isLoaded: false
};

const selectCoreModuleState = createFeatureSelector<State>(
  coreModuleFeature
);

export const selectAlbumFeatureState = createSelector(
  selectCoreModuleState,
  state => state.album
);

export const getAlbum = createSelector(
  selectAlbumFeatureState,
  state => state.album
);

export const getAlbumIsLoaded = createSelector(
  selectAlbumFeatureState,
  state => state.isLoaded
);

export const getAlbumError = createSelector(
  selectAlbumFeatureState,
  state => state.error
);

export function albumReducer(
  state = initialState,
  action: AlbumActions
): AlbumState {
  switch (action.type) {
    case AlbumActionTypes.LoadAlbum:
      return {
        ...state,
        isLoaded: false
      };

      case AlbumActionTypes.LoadAlbumSuccess:
      return {
        ...state,
        album: action.payload,
        error: "",
        isLoaded: true
      };

    case AlbumActionTypes.LoadAlbumFail:
      return {
        ...state,
        album: null,
        error: action.payload,
        isLoaded: true
      };

    default:
      return state;
  }
}
