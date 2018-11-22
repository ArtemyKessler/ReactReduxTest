export default function(state = null, action) {
  switch (action.type) {
    case ("USER_IS_ADDING", "BULLETIN_IS_ADDING"):
      return action.payload;

    default:
      return state;
  }
}
