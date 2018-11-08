import * as fromBrowse from "./../components/state/browse/browse.reducer";
import * as fromAction from "./../components/state/album/album.reducer";
import * as fromArtist from "./../components/state/artist/artist.reducer";
import * as fromRoot from "./../../state/app.state";

export const getBrowseChartAlbums = fromBrowse.getBrowseChartAlbums;
export const getBrowseError = fromBrowse.getBrowseError;

export interface CoreState extends fromRoot.State {
  browse: fromBrowse.BrowseState;
  album: fromAction.AlbumState;
  artist: fromArtist.ArtistState
}

export const coreReducer = {
  browse: fromBrowse.browseReducer,
  album: fromAction.albumReducer,
  artist: fromArtist.artistReducer
};
