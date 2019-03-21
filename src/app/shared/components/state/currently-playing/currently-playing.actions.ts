import { Track } from "src/app/shared/models/Track";
import { Action } from "@ngrx/store";

export enum CurrentlyPlayingActionTypes {
  SetCurrentlyPlayingTrack = "[Currently-Playing] SET_CURRENTLY_PLAYING_TRACK",
  IsPlaying = "[Currently-Playing] SET_IS_PLAYING"
}

export class SetCurrentlyPlayingTrack implements Action {
  readonly type = CurrentlyPlayingActionTypes.SetCurrentlyPlayingTrack;
  constructor(public payload: Track) {}
}

export class IsPlaying implements Action {
  readonly type = CurrentlyPlayingActionTypes.IsPlaying;
  constructor(public payload: boolean){}
}

export type CurrentlyPlayingActions = SetCurrentlyPlayingTrack | IsPlaying;
