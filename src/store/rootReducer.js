import authReducer from "./Reducers/authReducer";
import userReducer from "./Reducers/userReducer";



const rootReducer = {
  auth: authReducer,
  user: userReducer,
};
export default rootReducer;
