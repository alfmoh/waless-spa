import { Album } from "./../../../../shared/models/Album";
import { coreModuleFeature } from "./../../../../shared/helpers/constants";
import { CoreState } from "src/app/core/state/core.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AlbumActions, AlbumActionTypes } from "./album.actions";

export interface AlbumState {
  album: Album;
  error: string;
}

const initialState: AlbumState = {
  album: null,
  error: ""
};

const selectCoreModuleState = createFeatureSelector<CoreState>(
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

export const getAlbumError = createSelector(
  selectAlbumFeatureState,
  state => state.error
);

export function albumReducer(
  state = initialState,
  action: AlbumActions
): AlbumState {
  switch (action.type) {
    case AlbumActionTypes.LoadAlbumSuccess:
      return {
        ...state,
        album: action.payload,
        error: ""
      };

    case AlbumActionTypes.LoadAlbumFail:
      return {
        ...state,
        album: null,
        error: action.payload
      };

    default:
      return state;
  }
}
