export const addUser = user => {
  return dispatch => {
    dispatch(UserIsAdding("Добавляем юзера"));
    fetch("http://ci2.dextechnology.com:8000/api/User/Add", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "content-type": "application/json" }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(UserIsAdding("Добавление завершено"));
      })
      .catch(() =>
        dispatch(UserIsAdding("Ошибка при добавлении пользователя"))
      );

    dispatch(UserIsAdding("Обновляем список юзеров"));
    fetch("http://ci2.dextechnology.com:8000/api/User/GetByPage/1/100")
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(UserIsAdding("Загрузка юзеров завершена"));
      })
      .then(response => response.json())
      .then(users => dispatch(getUsers(users)))
      .catch(() =>
        dispatch(UserIsAdding("Ошибка при обновлении списка юзеров"))
      );
  };
};

export const UserIsAdding = text => {
  return {
    type: "USER_IS_ADDING",
    payload: text
  };
};

export const getUsers = users => {
  return {
    type: "GET_USERS",
    payload: users
  };
};
