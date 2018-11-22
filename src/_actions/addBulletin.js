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
      })
      .catch(() =>
        dispatch(bulletinIsAdding("Ошибка при сохранении объявления"))
      );
  };
};

const bulletinIsAdding = text => {
  return {
    type: "BULLETIN_IS_ADDING",
    payload: text
  };
};
