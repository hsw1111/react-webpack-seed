/*
 * @name: HOME 菜单 mode状态  水平 竖直
 * @description:
 * @author: QYang
 * @date: 2022/3/7
 */

import { MomHomeMode } from '@zxy/mom-home';
import Actions, { ReducerAction } from '@/store/action-types';

export interface StateProps {
  homeMode: MomHomeMode;
}

const defaultState: StateProps = {
  homeMode: MomHomeMode.Vertical,
};

export default function (state = defaultState, action: ReducerAction) {
  let tempState = { ...state };
  switch (action.type) {
    case Actions.HOMEMENUMODE:
      tempState.homeMode = action.data;
      break;
  }
  return tempState;
}
