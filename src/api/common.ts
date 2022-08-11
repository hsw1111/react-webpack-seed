/*
 * @Description: 通用接口
 * @Date: 2022-02-25 14:03:15
 * @LastEditTime: 2022-05-26 14:31:10
 */

import  {  momHttp,MomPlatFormUrl } from '@zxy/mom-http';

const CommonApi = {
  // RSA公钥
  rsaPublic() {
    return momHttp.http(
      { type: 'get', url: MomPlatFormUrl + '/rsa/public' },
      {},
    );
  },

  // 登录
  login(params: any) {
    return momHttp.http(
      { type: 'post', url: MomPlatFormUrl + '/user/login' },
      params,
    );
  },
    // 系统列表
    sysList(params: any) {
      return momHttp.http(
        { type: 'get', url: MomPlatFormUrl + '/sys/list' },
        params,
      );
    },
};

export default CommonApi;
