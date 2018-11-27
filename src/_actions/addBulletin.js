import initialFilter from "../_reducers/filter";

export const getBulletins = () => {
  return dispatch => {
    dispatch(bulletinIsAdding("Начинаем загрузку объявлений"));
    fetch("http://ci2.dextechnology.com:8000/api/Bulletin/GetByFilters", {
      method: "POST",
      body: JSON.stringify(initialFilter),
      headers: { "content-type": "application/json" }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(bulletinIsAdding("Загрузка завершена"));
      })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch(bulletinsFetched(response));
      })
      .catch(() =>
        dispatch(bulletinIsAdding("Ошибка при загрузке объявлений"))
      );
  };
};

export const bulletinsFetched = bulletins => {
  return {
    type: "BULLETINS_FETCHED",
    payload: bulletins
  };
};

export const addBulletin = bulletin => {
  return dispatch => {
    dispatch(bulletinIsAdding("Начинаем добавлять объявление"));
    fetch("http://ci2.dextechnology.com:8000/api/Bulletin/Add", {
      method: "POST",
      body: JSON.stringify(bulletin),
      headers: { "content-type": "application/json" }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(bulletinIsAdding("Добавление завершено"));
        dispatch(getBulletins());
      })
      .catch(() =>
        dispatch(bulletinIsAdding("Ошибка при добавлении объявления"))
      );
  };
};

export const saveBulletin = bulletin => {
  return dispatch => {
    dispatch(bulletinIsAdding("Начинаем сохранять объявление"));
    fetch("http://ci2.dextechnology.com:8000/api/Bulletin/Update", {
      method: "POST",
      body: JSON.stringify(bulletin),
      headers: { "content-type": "application/json" }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(bulletinIsAdding("Сохранение завершено"));
        dispatch(getBulletins());
      })
      .catch(() =>
        dispatch(bulletinIsAdding("Ошибка при сохранении объявления"))
      );
  };
};

export const deleteBulletin = id => {
  return dispatch => {
    dispatch(bulletinIsAdding("Начинаем удаление"));
    fetch("http://ci2.dextechnology.com:8000/api/Bulletin/Delete", {
      method: "POST",
      body: JSON.stringify(id),
      headers: { "content-type": "application/json" }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(bulletinIsAdding("Удаление завершено"));
      })
      .catch(() =>
        dispatch(bulletinIsAdding("Ошибка при удалении объявления"))
      );
  };
};

const bulletinIsAdding = text => {
  return {
    type: "BULLETIN_IS_ADDING",
    payload: text
  };
};
