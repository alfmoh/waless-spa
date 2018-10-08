export interface CurrentlyPlayingState {
  siteTitle: string;
}

export function reducer(
  state: CurrentlyPlayingState,
  action
): CurrentlyPlayingState {
  switch (action.type) {
    case "SET_SITE_TITLE":
      return {
        ...state,
        siteTitle: action.payload || "Waless"
      };

    default:
      return state;
  }
}
