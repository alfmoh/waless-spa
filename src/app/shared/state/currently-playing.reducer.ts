export function reducer(state, action) {
  switch (action.type) {
    case "SET_SITE_TITLE":
      return {
        ...state,
        siteTitle: action.payload
      };

    default:
      return state;
  }
}
