import Actions, { ReducerAction } from '../action-types';

const initState: any = {
  momUT: sessionStorage.getItem('xsmes_ut') || '',
  momRsaKey: sessionStorage.getItem('mom_rsa_key') || '',
};

export default function (state: any = initState, action: ReducerAction) {
  let tempState = { ...state };
  switch (action.type) {
    case Actions.LOGINCHANGE:
      tempState = { ...action.data };
      break;
  }
  return tempState;
}
