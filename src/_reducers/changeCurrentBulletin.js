var blankBulletin = {
  text: "",
  number: 0,
  created: new Date(),
  rating: 1,
  id: "",
  user: ""
};

export default function(state = blankBulletin, action) {
  switch (action.type) {
    case "BULLETIN_SELECTED":
      return action.payload;

    default:
      return state;
  }
}
