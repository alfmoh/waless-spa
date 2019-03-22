import * as fromBrowse from "./../../app/core/components/state/browse/browse.reducer";
import * as fromAction from "./../../app/core/components/state/album/album.reducer";
import * as fromArtist from "./../../app/core/components/state/artist/artist.reducer";
import * as fromCurrentlyPlaying from "./../../app/shared/components/state/currently-playing/currently-playing.reducer";

export interface State {
  /** Core State */
  browse: fromBrowse.BrowseState;
  album: fromAction.AlbumState;
  artist: fromArtist.ArtistState;

  /** Shared State */
  currentlyPlaying: fromCurrentlyPlaying.CurrentlyPlayingState;
}
