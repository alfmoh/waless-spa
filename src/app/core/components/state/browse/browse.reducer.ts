import { BrowseActions, BrowseActionTypes } from "./browse.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Album } from "./../../../../shared/models/Album";
import { coreModuleFeature } from "src/app/shared/helpers/constants";
import { State } from "src/app/state/app.state";
export interface BrowseState {
  chartAlbums: Album[];
  error: string;
  isLoaded : boolean;
}

const initialState: BrowseState = {
  chartAlbums: [],
  error: "",
  isLoaded: false
};

const selectCoreModuleState = createFeatureSelector<State>(
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

export const getBrowseIsLoaded = createSelector(
  selectBrowseFeatureState,
  state => state.isLoaded
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
    case BrowseActionTypes.LoadBrowse:
      return {
        ...state,
        isLoaded: false
      };

      case BrowseActionTypes.LoadBrowseSuccess:
      return {
        ...state,
        chartAlbums: action.payload,
        isLoaded: true,
        error: ""
      };

    case BrowseActionTypes.LoadBrowseFail:
      return {
        ...state,
        chartAlbums: [],
        isLoaded: true,
        error: action.payload
      };

    default:
      return state;
  }
}
