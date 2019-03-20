import { Action } from "@ngrx/store";

export enum CurrentlyPlayingActionTypes {
  SetSiteTitle = "[Currently-Playing] SET_SITE_TITLE",
  IsPlaying = "[Currently-Playing] SET_IS_PLAYING"
}

export class SetSiteTitle implements Action {
  readonly type = CurrentlyPlayingActionTypes.SetSiteTitle;
  constructor(public payload: string) {}
}

export class IsPlaying implements Action {
  readonly type = CurrentlyPlayingActionTypes.IsPlaying;
  constructor(public payload: boolean){}
}

export type CurrentlyPlayingActions = SetSiteTitle | IsPlaying;
