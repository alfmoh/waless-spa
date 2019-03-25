import * as fromBrowse from "./../components/state/browse/browse.reducer";
import * as fromAction from "./../components/state/album/album.reducer";
import * as fromArtist from "./../components/state/artist/artist.reducer";
import * as fromQueue from "./../components/state/queue/queue.reducer";

export const coreReducer = {
  browse: fromBrowse.browseReducer,
  album: fromAction.albumReducer,
  artist: fromArtist.artistReducer,
  queue: fromQueue.queueReducer
};
