import { Track } from "./../../../../shared/models/Track";
import { Action } from "@ngrx/store";

export enum QueueActionTypes {
  LoadQueue = "[Queue] Load",
  LoadQueueSuccess = "[Queue] Load Success",
  LoadQueueFail = "[Queue] Load Fail"
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

export type QueueActions = LoadQueue | LoadQueueSuccess | LoadQueueFail;
