import { Track } from "./../../../../shared/models/Track";
import { Action } from "@ngrx/store";
import { Album } from "src/app/shared/models/Album";

export enum QueueActionTypes {
  LoadQueue = "[Queue] Load",
  LoadQueueSuccess = "[Queue] Load Success",
  LoadQueueFail = "[Queue] Load Fail",
  PlayNext = "[Queue] Play Next",
  PlayNextSuccess = "[Queue] Play Next Success",
  PlayNextFail = "[Queue] Play Next Fail"
}

export class LoadQueue implements Action {
  readonly type = QueueActionTypes.LoadQueue;

  constructor() {}
}

export class LoadQueueSuccess implements Action {
  readonly type = QueueActionTypes.LoadQueueSuccess;

  constructor(public payload: Track[]) {}
}
export class LoadQueueFail implements Action {
  readonly type = QueueActionTypes.LoadQueueFail;

  constructor(public payload: string) {}
}
export class PlayNext implements Action {
  readonly type = QueueActionTypes.PlayNext;

  constructor(public payload: {track: Track, album: Album}) {}
}

export class PlayNextSuccess implements Action {
  readonly type = QueueActionTypes.PlayNextSuccess;

  constructor(public payload: Track[]) {}
}
export class PlayNextFail implements Action {
  readonly type = QueueActionTypes.PlayNextFail;

  constructor(public payload: string) {}
}

export type QueueActions =
  | LoadQueue
  | LoadQueueSuccess
  | LoadQueueFail
  | PlayNext
  | PlayNextSuccess
  | PlayNextFail;
