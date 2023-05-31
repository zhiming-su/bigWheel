import { defHttp } from '/@/utils/http/axios';

enum Api {
  wrjList = '/sys/uav/queryUavList',
  addUav = '/sys/uav/addUav',
  taskList ='/sys/uav/queryUavTaskList',
  addUavTask = '/sys/uav/addUavTask',
  queryUavTaskLog='/sys/uav/queryUavTaskLog',
}

/**
 * 租户角色列表
 * @param params
 */
export const getWrjList = (params) => defHttp.get({ url: Api.wrjList, params });
export const getTaskList = (params) => defHttp.get({ url: Api.taskList, params });
export const addUav = (params) => defHttp.post({ url: Api.addUav, params });
export const addUavTask = (params) => defHttp.post({ url: Api.addUavTask, params });
export const getUavTask = (params) => defHttp.get({ url: Api.addUavTask, params });
export const queryUavTaskLog = (params) => defHttp.get({ url: Api.queryUavTaskLog, params });
