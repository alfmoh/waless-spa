import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  CurrentlyPlayingActions,
  CurrentlyPlayingActionTypes
} from "./currently-playing.actions";
import { SharedState } from "src/app/shared/state/shared.reducer";
import { sharedModuleFeature } from "src/app/shared/helpers/constants";

const siteTitle = "Waless";

export interface CurrentlyPlayingState {
  siteTitle: string;
  isPlaying: boolean;
}

const initialState: CurrentlyPlayingState = { siteTitle, isPlaying: false };

const getCurrentlyPlayingFeatureState = createFeatureSelector<SharedState>(
  sharedModuleFeature
);

export const selectCurrentlyPlayingFeatureState = createSelector(
  getCurrentlyPlayingFeatureState,
  state => state.currentlyPlaying
);

export const getCurrentlyPlaying = createSelector(
  selectCurrentlyPlayingFeatureState,
  state => state.siteTitle
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
    case CurrentlyPlayingActionTypes.SetSiteTitle:
      return {
        ...state,
        siteTitle: action.payload || siteTitle
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
