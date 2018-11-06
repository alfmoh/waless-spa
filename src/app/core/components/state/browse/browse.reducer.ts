import { BrowseActions, BrowseActionTypes } from "./browse.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Album } from "./../../../../shared/models/Album";
import { CoreState } from "src/app/core/state/core.reducer";
import { coreModuleFeature } from "src/app/shared/helpers/constants";
export interface BrowseState {
  chartAlbums: Album[];
  error: string;
}

const initialState: BrowseState = {
  chartAlbums: [],
  error: ""
};

export const selectCoreModuleState = createFeatureSelector<CoreState>(
  coreModuleFeature
);

export const selectBrowseFeatureState = createSelector(
  selectCoreModuleState,
  state => state.browse
);

export const getBrowseChartAlbums = createSelector(
  selectBrowseFeatureState,
  state => state.chartAlbums
);

export const getBrowseError = createSelector(
  selectBrowseFeatureState,
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
