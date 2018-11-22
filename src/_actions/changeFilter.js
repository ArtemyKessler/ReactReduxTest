export const changeFilter = filter => {
  return {
    type: "FILTER_CHANGE",
    payload: filter
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
