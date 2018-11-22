var initialUsers = [
  ,
  {
    name: "",
    id: ""
  },
  {
    name: "Виталий",
    id: "f594af33-09f9-4453-97a0-23bf636fe922"
  },
  {
    name: "Верцингеторикс ",
    id: "a3b741d1-d0c3-4bc9-8f5f-ffab32d7b672"
  }
];

export default function(state = initialUsers, action) {
  switch (action.type) {
    case "GET_USERS":
      return action.payload;

    default:
      return state;
  }
}
