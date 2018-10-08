import * as fromRoot from "./../../state/app.state";
import { CurrentlyPlayingState, reducer } from "../components/state/currently-playing.reducer";

export interface SharedState extends fromRoot.State {
  currentlyPlaying: CurrentlyPlayingState;
}

// export function reducer(state, action) {}

export const sharedReducer = {
  currentlyPlaying: reducer
}
