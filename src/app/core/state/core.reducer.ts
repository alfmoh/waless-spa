import * as fromBrowse from './../components/state/browse.reducer';
import * as fromRoot from "./../../state/app.state";

export const getBrowseChartAlbums = fromBrowse.getBrowseChartAlbums;
export const getBrowseError = fromBrowse.getBrowseError;

export interface CoreState extends fromRoot.State {
  browse: fromBrowse.BrowseState
}

export const sharedReducer = {
  browse: fromBrowse.browseReducer
};
