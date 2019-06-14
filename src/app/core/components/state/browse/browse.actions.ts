import { Action } from "@ngrx/store";
import { Album } from "src/app/shared/models/Album";

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

  constructor(public payload: any[]) {}
}

export class LoadBrowseFail implements Action {
  readonly type = BrowseActionTypes.LoadBrowseFail;

  constructor(public payload: string) {}
}

export type BrowseActions = LoadBrowse
  | LoadBrowseSuccess
  | LoadBrowseFail;
