import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCurrPlayingAction from "./currently-playing.actions";

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
  action: fromCurrPlayingAction.CurrentlyPlayingActions
): CurrentlyPlayingState {
  switch (action.type) {
    case fromCurrPlayingAction.CurrentlyPlayingActionTypes.SetSiteTitle:
      return {
        ...state,
        siteTitle: action.payload || siteTitle
      };

    default:
      return state;
  }
}
