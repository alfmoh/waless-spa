import * as fromBrowse from "./../../app/core/components/state/browse/browse.reducer";
import * as fromAction from "./../../app/core/components/state/album/album.reducer";
import * as fromArtist from "./../../app/core/components/state/artist/artist.reducer";
import * as fromQueue from "./../../app/core/components/state/queue/queue.reducer";
import * as fromPlaylist from "./../../app/core/components/state/playlist/playlist.reducer";
import * as fromCurrentlyPlaying from "./../../app/shared/components/state/currently-playing/currently-playing.reducer";

export interface State {
  /** Core State */
  browse: fromBrowse.BrowseState;
  album: fromAction.AlbumState;
  artist: fromArtist.ArtistState;
  queue: fromQueue.QueueState;
  playlist: fromPlaylist.PlaylistState;

  /** Shared State */
  currentlyPlaying: fromCurrentlyPlaying.CurrentlyPlayingState;
}
