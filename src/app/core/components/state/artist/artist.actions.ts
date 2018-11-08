import { Artist } from "./../../../../shared/models/Artist";
import { Action } from "@ngrx/store";
import { Track } from "src/app/shared/models/Track";

export enum ArtistActionTypes {
  LoadArtist = "[Artist] Load",
  LoadArtistSuccess = "[Artist] Load Success",
  LoadArtistFail = "[Artist] Load Fail",
  LoadArtistTopTracks = "[Artist] Load Top Tracks",
  LoadArtistTopTracksSuccess = "[Artist] Load Top Tracks Success",
  LoadArtistTopTracksFail = "[Artist] Load Top Tracks Fail",
  LoadArtistAndTopTracks = "[Artist] Load Artist and Top Tracks",
  LoadArtistAndTopTracksSuccess = "[Artist] Load Artist and Top Tracks Success",
  LoadArtistAndTopTracksFail = "[Artist] Load Artist and Top Tracks Fail"
}

export class LoadArtist implements Action {
  readonly type = ArtistActionTypes.LoadArtist;

  constructor(public payload: number) {}
}

export class LoadArtistSuccess implements Action {
  readonly type = ArtistActionTypes.LoadArtistSuccess;

  constructor(public payload: Artist) {}
}

export class LoadArtistFail implements Action {
  readonly type = ArtistActionTypes.LoadArtistFail;

  constructor(public payload: string) {}
}

export class LoadArtistTopTracks implements Action {
  readonly type = ArtistActionTypes.LoadArtistTopTracks;

  constructor(public payload: number) {}
}

export class LoadArtistTopTracksSuccess implements Action {
  readonly type = ArtistActionTypes.LoadArtistTopTracksSuccess;

  constructor(public payload: Track[]) {}
}

export class LoadArtistTopTracksFail implements Action {
  readonly type = ArtistActionTypes.LoadArtistTopTracksFail;

  constructor(public payload: string) {}
}

export class LoadArtistAndTopTracks implements Action {
  readonly type = ArtistActionTypes.LoadArtistAndTopTracks;

  constructor(public payload: number) {}
}

export class LoadArtistAndTopTracksSuccess implements Action {
  readonly type = ArtistActionTypes.LoadArtistAndTopTracksSuccess;

  constructor(public payload: [Artist, Track[]]) {}
}

export class LoadArtistAndTopTracksFail implements Action {
  readonly type = ArtistActionTypes.LoadArtistAndTopTracksFail;

  constructor(public payload: string) {}
}

export type ArtistActions =
  | LoadArtist
  | LoadArtistSuccess
  | LoadArtistFail
  | LoadArtistTopTracks
  | LoadArtistTopTracksSuccess
  | LoadArtistTopTracksFail
  | LoadArtistAndTopTracks
  | LoadArtistAndTopTracksSuccess
  | LoadArtistAndTopTracksFail;
