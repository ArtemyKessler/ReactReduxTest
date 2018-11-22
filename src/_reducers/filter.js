var initialFilter = {
  pageFilter: {
    page: "1",
    pageSize: 10
  },
  sortParams: [
    {
      fieldName: "",
      inDesc: true
    }
  ],
  userId: "",
  startDate: new Date(),
  endDate: new Date(),
  searchText: "",
  rowsSelected: 10
};

export default function(state = initialFilter, action) {
  switch (action.type) {
    case "FILTER_CHANGE":
      return action.payload;

    default:
      return state;
  }
}
