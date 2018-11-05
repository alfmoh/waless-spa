import { BrowseActions, BrowseActionTypes } from "./browse.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Album } from "./../../../../shared/models/Album";
export interface BrowseState {
  chartAlbums: Album[];
  error: string;
}

const initialState: BrowseState = {
  chartAlbums: [],
  error: ""
};

export const getBrowseFeatureState = createFeatureSelector<BrowseState>(
  "browse"
);

export const getBrowseChartAlbums = createSelector(
  getBrowseFeatureState,
  state => state.chartAlbums
);

export const getBrowseError = createSelector(
  getBrowseFeatureState,
  state => state.error
);

export function browseReducer(
  state = initialState,
  action: BrowseActions
): BrowseState {
  switch (action.type) {
    case BrowseActionTypes.LoadBrowseSuccess:
      return {
        ...state,
        chartAlbums: action.payload,
        error: ""
      };

    case BrowseActionTypes.LoadBrowseFail:
      return {
        ...state,
        chartAlbums: [],
        error: action.payload
      };

    default:
      return state;
  }
}
