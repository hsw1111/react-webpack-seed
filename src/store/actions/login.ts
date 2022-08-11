import ActionTypes from '../action-types';

export default {
  loginChange(data: any) {
    return {
      type: ActionTypes.LOGINCHANGE,
      data,
    };
  },
};
