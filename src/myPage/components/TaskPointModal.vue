<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" width="700px">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { defineProps, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchemaTaskPoint } from '../uav.data';
  //import { saveOrUpdateRule } from './menu.api';
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const props = defineProps({ permissionId: String });
  const isUpdate = ref(true);
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchemaTaskPoint,
    showActionButtonGroup: false,
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    }
  });

  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增飞行点' : '编辑规则'));

  //表单提交事件
  async function handleSubmit() {
    try {
      const valStr = await validate();
      //values.permissionId = props.permissionId;
      setModalProps({ confirmLoading: true });
      //提交表单
      //await saveOrUpdateRule(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      //console.log(valStr)
      emit('success', valStr);
      //emit(values);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
