/*
 * @Description: 
 * @Author: huangshiwen
 * @Date: 2022-05-24 18:49:50
 * @LastEditTime: 2022-05-26 11:50:20
 */
export interface ReducerAction {
  type: string;
  data: any;
}

const LOGINCHANGE = 'LOGINCHANGE';
const HOMEMENUMODE = 'HOMEMENUMODE'; //HOME MODE 切换


export default {
  LOGINCHANGE,
  HOMEMENUMODE
};
