import { Album } from "./../../../shared/models/Album";
import { Action } from "@ngrx/store";

export enum BrowseActionTypes {
  LoadBrowse = "[Browse] Load",
  LoadBrowseSuccess = "[Browse] Load Success",
  LoadBrowseFail = "[Browse] Load Fail"
}

export class LoadBrowse implements Action {
  readonly type = BrowseActionTypes.LoadBrowse;
}

export class LoadBrowseSuccess implements Action {
  readonly type = BrowseActionTypes.LoadBrowseSuccess;

  constructor(public payload: Album[]) {}
}

export class LoadBrowseFail implements Action {
  readonly type = BrowseActionTypes.LoadBrowseFail;

  constructor(public payload: string) {}
}

export type BrowseActions = LoadBrowse
  | LoadBrowseSuccess
  | LoadBrowseFail;
