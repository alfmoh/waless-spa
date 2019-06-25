import { Playlist } from "src/app/shared/models/Playlist";
import { Action } from "@ngrx/store";

export enum PlaylistActionTypes {
  LoadPlaylists = "[Playlists] Load Playlists",
  LoadPlaylistsSuccess = "[Playlists] Load Success",
  LoadPlaylistsFail = "[Playlists] Load Fail",
  LoadPlaylist = "[Playlist] Load Playlist",
  LoadPlaylistSuccess = "[Playlist] Load Success",
  LoadPlaylistFail = "[Playlist] Load Fail",
  CreatePlaylist = "[Playlist] Create Playlist",
  CreatePlaylistSuccess = "[Playlist] Create Success",
  CreatePlaylistFail = "[Playlist] Create Fail"
}

export class LoadPlaylists implements Action {
  readonly type = PlaylistActionTypes.LoadPlaylists;
}

export class LoadPlaylistsSuccess implements Action {
  readonly type = PlaylistActionTypes.LoadPlaylistsSuccess;
  constructor(public payload: Playlist[]) {}
}

export class LoadPlaylistsFail implements Action {
  readonly type = PlaylistActionTypes.LoadPlaylistsFail;
  constructor(public payload: string) {}
}

export class LoadPlaylist implements Action {
  readonly type = PlaylistActionTypes.LoadPlaylist;
  constructor(public payload: string[]) {}
}

export class LoadPlaylistSuccess implements Action {
  readonly type = PlaylistActionTypes.LoadPlaylistSuccess;
  constructor(public payload: Playlist) {}
}

export class LoadPlaylistFail implements Action {
  readonly type = PlaylistActionTypes.LoadPlaylistFail;
  constructor(public payload: string) {}
}

export class CreatePlaylist implements Action {
  readonly type = PlaylistActionTypes.CreatePlaylist;
  constructor(public payload: Playlist) {}
}

export class CreatePlaylistSuccess implements Action {
  readonly type = PlaylistActionTypes.CreatePlaylistSuccess;
  constructor(public payload: Playlist) {}
}
export class CreatePlaylistFail implements Action {
  readonly type = PlaylistActionTypes.CreatePlaylistFail;
  constructor(public payload: string) {}
}

export type PlaylistActions =
  | LoadPlaylists
  | LoadPlaylist
  | LoadPlaylistsSuccess
  | LoadPlaylistSuccess
  | LoadPlaylistsFail
  | LoadPlaylistFail
  | CreatePlaylist
  | CreatePlaylistSuccess
  | CreatePlaylistFail;
