import { ArtistActions, ArtistActionTypes } from "./artist.actions";
import { coreModuleFeature } from "src/app/shared/helpers/constants";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Artist } from "./../../../../shared/models/Artist";
import { Track } from "src/app/shared/models/Track";
import { State } from "src/app/state/app.state";

export interface ArtistState {
  artist: Artist;
  error: string;
  topTracks: Track[];
  isLoaded: boolean;
}

const initialState: ArtistState = {
  artist: null,
  error: "",
  topTracks: [],
  isLoaded: false
};

const selectCoreModuleState = createFeatureSelector<State>(
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

export const getArtistIsLoaded = createSelector(
  selectArtistFeatureState,
  state => state.isLoaded
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
    case ArtistActionTypes.LoadArtistAndTopTracks:
      return {
        ...state,
        isLoaded: false
      };
    case ArtistActionTypes.LoadArtistSuccess:
      return {
        ...state,
        artist: action.payload,
        topTracks: [],
        error: "",
        isLoaded: true
      };
    case ArtistActionTypes.LoadArtistFail:
    case ArtistActionTypes.LoadArtistTopTracksFail:
    case ArtistActionTypes.LoadArtistAndTopTracksFail:
      return {
        ...state,
        artist: null,
        topTracks: [],
        error: action.payload,
        isLoaded: true
      };
    case ArtistActionTypes.LoadArtistTopTracksSuccess:
      return {
        ...state,
        artist: null,
        topTracks: action.payload,
        error: "",
        isLoaded: true
      };
    case ArtistActionTypes.LoadArtistAndTopTracksSuccess:
      return {
        ...state,
        artist: action.payload[0],
        topTracks: action.payload[1],
        error: "",
        isLoaded: true
      };
    default:
      return state;
  }
}
