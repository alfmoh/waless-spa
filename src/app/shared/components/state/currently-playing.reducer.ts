import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  CurrentlyPlayingActions,
  CurrentlyPlayingActionTypes
} from "./currently-playing.actions";

const siteTitle = "Waless";

export interface CurrentlyPlayingState {
  siteTitle: string;
}

const initialState: CurrentlyPlayingState = { siteTitle };

const getCurrentlyPlayingFeatureState = createFeatureSelector<
  CurrentlyPlayingState
>("currently-playing");

export const getCurrentlyPlaying = createSelector(
  getCurrentlyPlayingFeatureState,
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
