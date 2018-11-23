import { bulletinsFetched } from "./addBulletin";

export const changeFilter = filter => {
  return dispatch => {
    fetch("http://ci2.dextechnology.com:8000/api/Bulletin/GetByFilters", {
      method: "POST",
      body: JSON.stringify(filter),
      headers: { "content-type": "application/json" }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        dispatch(bulletinsFetched(json));
      })
      .catch(function(ex) {
        alert("Fetching failed", ex);
      });
  };
};

/* export const changeFilter = filter => {
    return dispatch => {
      setTimeout(() => {
        dispatch({ type: "FILTER_CHANGE", payload: filter });
      }, 200);
    };
  };
   */
