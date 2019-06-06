import { Album } from './../../../models/Album';
import { Track } from "src/app/shared/models/Track";
import { Action } from "@ngrx/store";

export enum CurrentlyPlayingActionTypes {
  SetCurrentlyPlayingTrack = "[Currently-Playing] SET_CURRENTLY_PLAYING_TRACK",
  IsPlaying = "[Currently-Playing] SET_IS_PLAYING",
  CurrentlyPlayingAlbum = "[Currently-Playing] SET_PLAYING_ALBUM"
}

export class SetCurrentlyPlayingTrack implements Action {
  readonly type = CurrentlyPlayingActionTypes.SetCurrentlyPlayingTrack;
  constructor(public payload: Track) {}
}

export class IsPlaying implements Action {
  readonly type = CurrentlyPlayingActionTypes.IsPlaying;
  constructor(public payload: boolean) {}
}

export class CurrentlyPlayingAlbum implements Action {
  readonly type = CurrentlyPlayingActionTypes.CurrentlyPlayingAlbum;
  constructor(public payload: Album) {}
}

export type CurrentlyPlayingActions =
  | SetCurrentlyPlayingTrack
  | IsPlaying
  | CurrentlyPlayingAlbum;
