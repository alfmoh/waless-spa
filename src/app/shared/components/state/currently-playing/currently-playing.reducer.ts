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
}

const initialState: CurrentlyPlayingState = { siteTitle };

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

    default:
      return state;
  }
}
