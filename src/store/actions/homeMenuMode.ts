import ActionTypes from '@/store/action-types';

export default {
  homeModeChange(data: any) {
    return {
      type: ActionTypes.HOMEMENUMODE,
      data,
    };
  },
};
