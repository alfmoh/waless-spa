import { Action } from "@ngrx/store";

export enum CurrentlyPlayingActionTypes {
  SetSiteTitle = "[Currently-Playing] SET_SITE_TITLE"
}

export class SetSiteTitle implements Action {
  readonly type = CurrentlyPlayingActionTypes.SetSiteTitle;
  constructor(public payload: string) {}
}

export type CurrentlyPlayingActions = SetSiteTitle;
