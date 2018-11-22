var initialBulletins = [
  {
    id: 1212,
    number: 12,
    userId: "f594af33-09f9-4453-97a0-23bf636fe922",
    text: "Римские войска перешли границу",
    rating: 10,
    created: new Date()
  },
  {
    id: 4827,
    number: 33,
    userId: "a3b741d1-d0c3-4bc9-8f5f-ffab32d7b672",
    text: "Объявлен сбор войск",
    rating: 9,
    created: new Date()
  },
  {
    id: 34343434,
    number: 33,
    userId: "f594af33-09f9-4453-97a0-23bf636fe922",
    text: "Компания успешно завершена",
    rating: 4,
    created: new Date()
  }
];

export default function(state = initialBulletins, action) {
  switch (action.type) {
    case "BULLETIN_ADD":
      return state.concat(action.payload);
    case "BULLETIN_DELETE":
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
      return state;
    case "FILTER_CHANGE":
      fetch("/api/Bulletin/GetByFilters", {
        method: "POST",
        body: JSON.stringify(action.payload),
        headers: { "content-type": "application/json" }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          state = json;
        })
        .catch(function(ex) {
          alert("Fetching failed", ex);
        });
      return state;

    default:
      return state;
  }
}
