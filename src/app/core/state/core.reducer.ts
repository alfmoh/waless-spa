import * as fromBrowse from './../components/state/browse.reducer';
import * as fromRoot from "./../../state/app.state";

export const getBrowse = fromBrowse.getBrowse;

export interface CoreState extends fromRoot.State {
  browse: fromBrowse.BrowseState
}

export const sharedReducer = {
  browse: fromBrowse.browseReducer
};
