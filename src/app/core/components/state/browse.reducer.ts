import { BrowseActionTypes, BrowseActions } from "./browse.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Album } from "./../../../shared/models/Album";
export interface BrowseState {
  chartAlbums: Album[];
}

const initialState: BrowseState = {
  chartAlbums: []
};

export const getBrowseFeatureState = createFeatureSelector<BrowseState>(
  "browse"
);

export const getBrowse = createSelector(
  getBrowseFeatureState,
  state => state.chartAlbums
);

export function browseReducer(
  state = initialState,
  action: BrowseActions
): BrowseState {
  switch (action.type) {
    case BrowseActionTypes.LoadBrowseSuccess:
      return {
        ...state,
        chartAlbums: action.payload
      };

    default:
      return state;
  }
}
