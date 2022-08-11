/*
 * @Description:
 * @Author: huangshiwen
 * @Date: 2022-02-14 12:30:42
 * @LastEditTime: 2022-02-14 13:29:43
 */
import { combineReducers } from 'redux';
import loginReducer from './login';
import homeMenuModeReducer from './homeMenuMode';

export default combineReducers({
  login: loginReducer,
  homeMenuMode: homeMenuModeReducer,
});
