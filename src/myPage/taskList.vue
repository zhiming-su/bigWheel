<template>
  <BasicTable @register="registerTable">
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="batchHandleDelete">
              <Icon icon="ant-design:delete-outlined"></Icon>
              删除
            </a-menu-item>
          </a-menu>
        </template>
        <a-button
          >批量操作
          <Icon icon="mdi:chevron-down"></Icon>
        </a-button>
      </a-dropdown>
    </template>
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)"/>
    </template>
  </BasicTable>
  <!--角色用户表格-->
  <RoleUserTable @register="roleUserDrawer" :disableUserEdit="true"/>
  <!--角色编辑抽屉-->
  <UavTaskDrawer @register="registerDrawer" @success="reload" :showFooter="showFooter" />
  <!--角色详情-->
  <RoleDesc @register="registerDesc"></RoleDesc>
</template>
<script lang="ts" name="system-role" setup>
  import { ref } from 'vue';
  import {useRouter} from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import RoleDesc from './components/RoleDesc.vue';
  import RoleDrawer from './components/RoleDrawer.vue';
  import UavTaskDrawer from './components/UavTaskDrawer.vue';
  import RoleUserTable from './components/RoleUserTable.vue';
  import {columnsTask, searchFormSchema, searchFormSchemaTask} from './uav.data';
  import {getTaskList} from './getInfo.api';
  import { useListPage } from './useListPage';
  import {getToken} from "/@/utils/auth";
  import {useGlobSetting} from "/@/hooks/setting";
  const showFooter = ref(true);
  const [roleUserDrawer, { openDrawer: openRoleUserDrawer }] = useDrawer();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerModal, { openModal }] = useModal();
  const [registerDesc, { openDrawer: openRoleDesc }] = useDrawer();
  const glob = useGlobSetting();
  const [register, { openModal: openDetail }] = useModal();
  const iframeUrl = ref('');
  const myRouter=useRouter();
  const go = useGo();
  // 列表页面公共参数、方法
  const { prefixCls, tableContext, onImportXls, onExportXls } = useListPage({
    designScope: 'role-template',
    tableProps: {
      title: '无人机任务列表',
      api: getTaskList,
      columns: columnsTask,
      formConfig: {
        schemas: searchFormSchemaTask,
      },
      showActionColumn:true,
      actionColumn: {
        width: 120,
      },
      rowSelection: null,
    },
  });
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  /**
   * 新增
   */
  function handleCreate() {
    showFooter.value = true;
    openDrawer(true, {
      isUpdate: false,
    });
  }
  /**
   * 编辑
   */
  function handleEdit(record: Recordable) {
    showFooter.value = true;
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }
  /**
   * 详情
   */
  function handleDetail( record) {
    showFooter.value = false;
    go('/system/myPage/mapHtml/show?aid=' + record.id);

  }

  /**
   * 角色用户
   */
  function handleUser(record) {
    //onSelectChange(selectedRowKeys)
    openRoleUserDrawer(true, record);
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '飞行轨迹',
        onClick: handleDetail.bind(null, record),
      },
    ];
  }



</script>
