import * as fromRoot from "./../../state/app.state";
import * as fromCurrentlyPlaying from "../components/state/currently-playing/currently-playing.reducer";

export const getCurrentlyPlaying = fromCurrentlyPlaying.getCurrentlyPlaying;

export interface SharedState extends fromRoot.State {
  currentlyPlaying: fromCurrentlyPlaying.CurrentlyPlayingState;
}

export const sharedReducer = {
  currentlyPlaying: fromCurrentlyPlaying.reducer
};
