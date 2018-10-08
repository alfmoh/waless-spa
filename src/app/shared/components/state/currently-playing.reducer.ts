export interface CurrentlyPlayingState {
  siteTitle: string;
}

const initialState: CurrentlyPlayingState = {
  siteTitle: "Waless"
};

export function reducer(state = initialState, action): CurrentlyPlayingState {
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
