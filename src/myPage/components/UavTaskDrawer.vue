<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" :title="getTitle" width="500px" @ok="handleSubmit" destroyOnClose>
    <BasicForm @register="registerForm" />
    <a-button type="primary" @click="handleCreate"> 新增飞行点</a-button>
    <div v-for="(item,index) in taskPoint" :key="index" style="display:flex;margin-bottom:10px">
      <div style="margin-right:20px">序号:{{item.serialNumber}}</div>
      <div  style="margin-right:20px">经度：{{item.longitude}}</div>
      <div style="margin-right:20px">纬度：{{item.latitude}}</div>
      <div><a-button @click="delTaskPoint(index)">删除</a-button></div>
    </div>
<!--    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 新增飞行点{{ taskPoint.length }}</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>-->
  </BasicDrawer>

  <TaskPointModal @register="registerModal" @success="getTableList($event)" :permissionId="permissionId" />
</template>
<script lang="ts" setup>
  import { ref, reactive, computed, unref, useAttrs } from 'vue';
  import { BasicForm, useForm } from '/src/components/Form';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicDrawer, useDrawerInner } from '/src/components/Drawer';
  import { BasicTree, TreeItem } from '/src/components/Tree';
  import { dataColumnsTaskPoint, formSchemaTask, formSchemaTaskPoint } from '../uav.data';
  import { addUavTask } from '../getInfo.api';
  import { useModal } from '/@/components/Modal';
  import TaskPointModal from './TaskPointModal.vue';
  import { ColEx } from '/@/components/Form/src/types';
  import { dataRuleList, deleteRule } from '/@/views/system/menu/menu.api';
  const [registerModal, { openModal }] = useModal();
  const permissionId = ref('');
  const taskPoint = reactive([]);
  //const dataSource= reactive([])
  // 声明Emits
  const emit = defineEmits(['success', 'register', 'getlist']);
  const attrs = useAttrs();
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    schemas: formSchemaTask,
    showActionButtonGroup: false,
  });
  const delTaskPoint=(id)=>{
    taskPoint.splice(id,1);
    for (let i = 0; i < taskPoint.length; i++) {
      taskPoint[i].serialNumber = i+1;
    }
  };
  const getTableList = (valStr) => {
    valStr.serialNumber = taskPoint.length+1;
    taskPoint.push(valStr);
    //reload();

   /* reload({
      dataSource: taskPoint, // 使用 ref 值的 value 属性传递数据源
    });

    reload();*/
    //console.log(taskPoint);
  };
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    isUpdate.value = !!data?.isUpdate;
    setDrawerProps({ confirmLoading: false });
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
    //禁用表单
    //setProps({ disabled: !attrs.showFooter  });
    //setProps({ disabled: !attrs.showFooter,searchInfo: { permissionId: unref(permissionId) } });
    permissionId.value = data.id;
    reload();
  });
  // 自适应列配置
  const adaptiveColProps: Partial<ColEx> = {
    xs: 24, // <576px
    sm: 24, // ≥576px
    md: 24, // ≥768px
    lg: 12, // ≥992px
    xl: 8, // ≥1200px
    xxl: 8, // ≥1600px
  };
  const [registerTable, { reload }] = useTable({
    dataSource: taskPoint,
    columns: dataColumnsTaskPoint,
    size: 'small',
    formConfig: {
      baseColProps: adaptiveColProps,
      labelAlign: 'right',
      labelCol: {
        offset: 1,
        xs: 24,
        sm: 24,
        md: 24,
        lg: 8,
        xl: 8,
        xxl: 8,
      },
      wrapperCol: {},
      //schemas: dataColumnsTaskPoint,
      autoSubmitOnEnter: true,
    },
    striped: true,
    //useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    showTableSetting: false,
    canResize: false,
    immediate: false,
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  /**
   * 新增
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  /**
   * 编辑
   */
  function handleEdit(record) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * 删除
   */
  function handleDelete() {
    reload();
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      /*{
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },*/
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: ()=>{reload();}
        },
      },
    ];
  }
  /**
   * 标题
   */
  const getTitle = computed(() => (!unref(isUpdate) ? '新增飞行计划' : '编辑'));
  /**
   * 提交
   */
  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      let subInfo={uavTaskIn:{},coordIns:[]}
      subInfo.uavTaskIn=values
      subInfo.coordIns=taskPoint
      console.log(subInfo)
      //提交表单
      await addUavTask(subInfo);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
