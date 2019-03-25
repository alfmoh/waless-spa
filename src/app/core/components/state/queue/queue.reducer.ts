import { Track } from "./../../../../shared/models/Track";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coreModuleFeature } from "src/app/shared/helpers/constants";
import { State } from "src/app/state/app.state";
import { QueueActions, QueueActionTypes } from "./queue.actions";

export interface QueueState {
  tracks: Track[];
  error: string;
  isLoaded: boolean;
}

const initialState: QueueState = {
  tracks: null,
  error: "",
  isLoaded: false
};

const selectCoreModuleState = createFeatureSelector<State>(coreModuleFeature);

export const selectQueueFeatureState = createSelector(
  selectCoreModuleState,
  state => state.queue
);

export const getQueue = createSelector(
  selectQueueFeatureState,
  state => state.tracks
);

export const getQueueError = createSelector(
  selectQueueFeatureState,
  state => state.error
);

export const getQueueIsLoaded = createSelector(
  selectQueueFeatureState,
  state => state.isLoaded
);

export function queueReducer(
  state = initialState,
  action: QueueActions
): QueueState {
  switch (action.type) {
    case QueueActionTypes.LoadQueue:
      return {
        ...state,
        isLoaded: false
      };

    case QueueActionTypes.LoadQueueSuccess:
      return {
        ...state,
        tracks: action.payload,
        isLoaded: true
      };

    case QueueActionTypes.LoadQueueFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
