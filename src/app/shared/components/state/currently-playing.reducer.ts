import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CurrentlyPlayingState {
  siteTitle: string;
}

const initialState: CurrentlyPlayingState = {
  siteTitle: "Waless"
};

const getCurrentlyPlayingFeatureState = createFeatureSelector<
  CurrentlyPlayingState
>("currently-playing");

export const getCurrentlyPlaying = createSelector(
  getCurrentlyPlayingFeatureState,
  state => state.siteTitle
);

export function reducer(state = initialState, action): CurrentlyPlayingState {
  switch (action.type) {
    case "SET_SITE_TITLE":
      return {
        ...state,
        siteTitle: action.payload || "Waless"
      };

    default:
      return state;
  }
}
