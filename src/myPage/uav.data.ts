import {BasicColumn, FormSchema} from '/@/components/Table';
import {isRoleExist} from "/@/views/system/myPage/role.api";
export const columns = [
  {
    title: '型号',
    dataIndex: 'modelNumber',
    width: 100,
  },
  {
    title: '分辨率',
    dataIndex: 'distinguishability',
    width: 100,
  },
  {
    title: '重量（克）',
    dataIndex: 'weight',
    width: 100,
  },
  {
    title: '像素',
    dataIndex: 'pixel',
    width: 100,
  },
  {
    title: '兼容系统',
    dataIndex: 'compatibilitySystem',
    width: 100,
  },
  {
    title: '电池',
    dataIndex: 'battery',
    width: 100,
  },
  {
    title: '水平飞行速度',
    dataIndex: 'flightSpeed',
    width: 100,
  },
  {
    title: '上升速度',
    dataIndex: 'ascendingVelocity',
    width: 100,
  },
  {
    title: '下降速度',
    dataIndex: 'rateOfDescent',
    width: 100,
  },
];

export const columnsTask = [
  {
    title: '无人机id',
    dataIndex: 'uavId',
    width: 100,
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    width: 100,
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    width: 100,
  },
  {
    title: '每一节点预计执行时间',
    dataIndex: 'plannedTime',
    width: 100,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'crateTime',
    width: 100,
  },
]


export const searchFormSchema: FormSchema[] = [
  {
    field: 'modelNumber',
    label: '型号',
    component: 'Input',
    colProps: { span: 6 },
  },
];
export const searchFormSchemaTask: FormSchema[] = [
  {
    field: 'uavId',
    label: '无人机id',
    component: 'Input',
    colProps: { span: 6 },
  },
];


export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'modelNumber',
    label: '型号',
    required: true,
    component: 'Input',
  },
  {
    label: '分辨率',
    field: 'distinguishability',
    required: true,
    component: 'Input',
  },
  {
    label: '重量（克）',
    field: 'weight',
    required: true,
    component: 'Input',
  },
  {
    label: '像素',
    field: 'pixel',
    required: true,
    component: 'Input',
  },
  {
    label: '兼容系统',
    field: 'compatibilitySystem',
    required: true,
    component: 'Input',
  },
  {
    label: '电池',
    field: 'battery',
    required: true,
    component: 'Input',
  },
  {
    label: '水平飞行速度',
    field: 'flightSpeed',
    required: true,
    component: 'Input',
  },
  {
    label: '上升速度',
    field: 'ascendingVelocity',
    required: true,
    component: 'Input',
  },
  {
    label: '下降速度',
    field: 'rateOfDescent',
    required: true,
    component: 'Input',
  },
];

export const dataColumnsTaskPoint: BasicColumn[] = [
  {
    title: '坐标顺序',
    dataIndex: 'serialNumber',
    width: 150,
  },
  {
    title: '经度',
    dataIndex: 'longitude',
    width: 100,
  },
  {
    title: '纬度',
    dataIndex: 'latitude',
    width: 100,
  },
];

export const formSchemaTaskPoint: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'serialNumber',
    label: '坐标顺序',
    //required: true,
    component: 'Input',
    show: false,
  },
  {
    label: '经度',
    field: 'longitude',
    required: true,
    component: 'Input',
  },
  {
    label: '纬度',
    field: 'latitude',
    required: true,
    component: 'Input',

  },


];

export const formSchemaTask: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'uavId',
    label: '无人机ID',
    required: true,
    component: 'Input',
  },
  {
    label: '任务名称',
    field: 'taskName',
    required: true,
    component: 'Input',
  },
  {
    label: '飞行开始时间',
    field: 'plannedTime',
    required: true,
    component: 'InputNumber',

  },/*,
  {
    label: '飞行结束时间',
    field: 'endTime',
    required: true,
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },*/


];
