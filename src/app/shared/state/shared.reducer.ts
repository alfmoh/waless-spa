import * as fromRoot from "./../../state/app.state";
import * as fromCurrentlyPlaying from "../components/state/currently-playing.reducer";

export const getCurrentlyPlaying = fromCurrentlyPlaying.getCurrentlyPlaying;

export interface SharedState extends fromRoot.State {
  currentlyPlaying: fromCurrentlyPlaying.CurrentlyPlayingState;
}

// export function reducer(state, action) {}

export const sharedReducer = {
  currentlyPlaying: fromCurrentlyPlaying.reducer
};
