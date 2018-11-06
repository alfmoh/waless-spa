import { Track } from "./../../../../shared/models/Track";
import { Action } from "@ngrx/store";

export enum AlbumActionTypes {
  LoadAlbum = "[Album] Load",
  LoadAlbumSuccess = "[Album] Load Success",
  LoadAlbumFail = "[Album] Load Fail"
}

export class LoadAlbum implements Action {
  readonly type = AlbumActionTypes.LoadAlbum;
}

export class LoadAlbumSuccess implements Action {
  readonly type = AlbumActionTypes.LoadAlbumSuccess;

  constructor(public payload: Track[]) {}
}

export class LoadAlbumFail implements Action {
  readonly type = AlbumActionTypes.LoadAlbumFail;

  constructor(public payload: string) {}
}

export type AlbumActions = LoadAlbum
  | LoadAlbumSuccess
  | LoadAlbumFail;
