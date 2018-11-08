import { ArtistActions, ArtistActionTypes } from "./artist.actions";
import { CoreState } from "./../../../state/core.reducer";
import { coreModuleFeature } from "src/app/shared/helpers/constants";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Artist } from "./../../../../shared/models/Artist";
import { Track } from "src/app/shared/models/Track";

export interface ArtistState {
  artist: Artist;
  error: string;
  topTracks: Track[];
}

const initialState: ArtistState = {
  artist: null,
  error: "",
  topTracks: []
};

const selectCoreModuleState = createFeatureSelector<CoreState>(
  coreModuleFeature
);

const selectArtistFeatureState = createSelector(
  selectCoreModuleState,
  state => state.artist
);

export const getArtist = createSelector(
  selectArtistFeatureState,
  state => state.artist
);

export const getArtistError = createSelector(
  selectArtistFeatureState,
  state => state.error
);

export const getArtistTopTracks = createSelector(
  selectArtistFeatureState,
  state => state.topTracks
);

export function artistReducer(
  state = initialState,
  action: ArtistActions
): ArtistState {
  switch (action.type) {
    case ArtistActionTypes.LoadArtistSuccess:
      return {
        ...state,
        artist: action.payload,
        topTracks: [],
        error: ""
      };
    case ArtistActionTypes.LoadArtistFail:
    case ArtistActionTypes.LoadArtistTopTracksFail:
    case ArtistActionTypes.LoadArtistAndTopTracksFail:
      return {
        ...state,
        artist: null,
        topTracks: [],
        error: action.payload
      };
    case ArtistActionTypes.LoadArtistTopTracksSuccess:
      return {
        ...state,
        artist: null,
        topTracks: action.payload,
        error: ""
      };
    case ArtistActionTypes.LoadArtistAndTopTracksSuccess:
      return {
        ...state,
        artist: action.payload[0],
        topTracks: action.payload[1],
        error: ""
      };
    default:
      return state;
  }
}
