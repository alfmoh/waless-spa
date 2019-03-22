import * as fromCurrentlyPlaying from "../components/state/currently-playing/currently-playing.reducer";

export const sharedReducer = {
  currentlyPlaying: fromCurrentlyPlaying.reducer
};
