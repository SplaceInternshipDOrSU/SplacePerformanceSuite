import authReducer from "./Reducers/authReducer";
import userReducer from "./Reducers/userReducer";
import adminReducer from "./Reducers/adminReducer";




const rootReducer = {
  auth: authReducer,
  user: userReducer,
  admin: adminReducer,
};
export default rootReducer;
