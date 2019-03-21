import { Track } from "./../../../models/Track";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  CurrentlyPlayingActions,
  CurrentlyPlayingActionTypes
} from "./currently-playing.actions";
import { SharedState } from "src/app/shared/state/shared.reducer";
import { sharedModuleFeature } from "src/app/shared/helpers/constants";

const siteTitle = "Waless";

export interface CurrentlyPlayingState {
  currentlyPlayingTrack: Track;
  isPlaying: boolean;
}

const initialState: CurrentlyPlayingState = { currentlyPlayingTrack: null, isPlaying: false };

const getCurrentlyPlayingFeatureState = createFeatureSelector<SharedState>(
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

    default:
      return state;
  }
}
