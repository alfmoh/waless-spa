import { Album } from "src/app/shared/models/Album";
import { Track } from "./../../../models/Track";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  CurrentlyPlayingActions,
  CurrentlyPlayingActionTypes
} from "./currently-playing.actions";
import { sharedModuleFeature } from "src/app/shared/helpers/constants";
import { State } from "src/app/state/app.state";

export interface CurrentlyPlayingState {
  currentlyPlayingTrack: Track;
  album: Album;
  isPlaying: boolean;
}

const initialState: CurrentlyPlayingState = {
  currentlyPlayingTrack: null,
  album: null,
  isPlaying: false
};

const getCurrentlyPlayingFeatureState = createFeatureSelector<State>(
  sharedModuleFeature
);

export const selectCurrentlyPlayingFeatureState = createSelector(
  getCurrentlyPlayingFeatureState,
  state => state.currentlyPlaying
);

export const getCurrentlyPlayingTrack = createSelector(
  selectCurrentlyPlayingFeatureState,
  state => state.currentlyPlayingTrack
);

export const getIsPlaying = createSelector(
  selectCurrentlyPlayingFeatureState,
  state => state.isPlaying
);

export const getPlayingAlbum = createSelector(
  selectCurrentlyPlayingFeatureState,
  state => state.album
);

export function reducer(
  state = initialState,
  action: CurrentlyPlayingActions
): CurrentlyPlayingState {
  switch (action.type) {
    case CurrentlyPlayingActionTypes.SetCurrentlyPlayingTrack:
      return {
        ...state,
        currentlyPlayingTrack: action.payload
      };

    case CurrentlyPlayingActionTypes.IsPlaying:
      return {
        ...state,
        isPlaying: action.payload
      };

    case CurrentlyPlayingActionTypes.CurrentlyPlayingAlbum:
      return {
        ...state,
        album: action.payload
      };

    default:
      return state;
  }
}
