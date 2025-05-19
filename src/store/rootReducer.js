import authReducer from "./Reducers/authReducer";
import userReducer from "./Reducers/userReducer";
import adminReducer from "./Reducers/adminReducer";
import teamReducer from "./Reducers/teamReducer";
import ratingReducer from "./Reducers/ratingReducer";




const rootReducer = {
  auth: authReducer,
  user: userReducer,
  admin: adminReducer,
  team: teamReducer,
  rating: ratingReducer,
};
export default rootReducer;
