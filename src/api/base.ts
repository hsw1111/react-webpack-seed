/*
 * @Description:平台管理接口
 * @Author: huangshiwen
 * @Date: 2022-02-14 12:30:40
 * @LastEditTime: 2022-05-26 11:45:22
 */
import { momHttp, MomPlatFormUrl } from '@zxy/mom-http';

const BaseApi = {
    // 获取菜单
    getMenu(params: any) {
      return momHttp.http(
        {
          type: 'get',
          url: MomPlatFormUrl + '/menu',
        },
        params,
      );
    },
};
export default BaseApi;
