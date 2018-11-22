import { combineReducers } from "redux";
import BulletinsReducers from "./bulletins.js";
import FilterReducers from "./filter.js";
import UsersReducer from "./users.js";
import ChangeCurrentBulletin from "./changeCurrentBulletin.js";
import InfoReducers from "./info.js";

const allReducers = combineReducers({
  bulletins: BulletinsReducers,
  filter: FilterReducers,
  users: UsersReducer,
  changeCurrentBulletin: ChangeCurrentBulletin,
  info: InfoReducers
});

export default allReducers;
