import { combineReducers } from "redux";
import authReducer from "@/slide/AuthSlide";
import appReducer from "@/slide/AppSlide";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

export default rootReducer;
