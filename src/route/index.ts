/*
 * @Description:
 * @Author: QYang
 * @Date: 2022-05-10 10:34:47
 * @LastEditTime: 2022-05-28 10:50:46
 */

import { MomRouteProp } from '@zxy/mom-utils/lib/globalInterface';
import MomPlatForm from '@zxy/mom-platform';
import MomDynamic from '@zxy/mom-dynamic';
import MomProcess from '@zxy/mom-process';
import MomLogRoute from '@zxy/mom-log-route';
import MomWorkFlow from '@zxy/mom-workflow';
import MomFile from '@zxy/mom-file';
import MomBusinessProduction from '@zxy/mom-business-production';
import MomBusinessQuality from '@zxy/mom-business-quality';
import MomPlatFormTask from '@zxy/mom-platform-task';
import MomBaseModel from '@zxy/mom-base-model';
import MomCxjx from '@zxy/mom-cxjx';
import MomBusinessWarehouse from '@zxy/mom-business-warehouse';
import MomBusinessWarehouseMaterial from '@zxy/mom-business-warehouse-material';
import MomBusinessDevice from '@zxy/mom-business-device';
import MomPurchaseManage from '@zxy/mom-purchase-manage';
import MomProductionManage from '@zxy/mom-production-manage';

const Route: MomRouteProp[] = [
  ...MomPlatForm,
  ...MomDynamic,
  ...MomProcess,
  ...MomLogRoute,
  ...MomWorkFlow,
  ...MomFile,
  ...MomBusinessProduction,
  ...MomBusinessQuality,
  ...MomPlatFormTask,
  ...MomBaseModel,
  ...MomCxjx,
  ...MomBusinessWarehouse,
  ...MomBusinessDevice,
  ...MomBusinessWarehouseMaterial,
  ...MomProductionManage,
  ...MomPurchaseManage
];
export default Route;
