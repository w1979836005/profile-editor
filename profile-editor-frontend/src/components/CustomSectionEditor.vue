<script setup lang="ts">
/**
 * 自定义板块编辑器组件
 * 管理板块内的所有字段
 */
import { ref } from 'vue'
import { useResumeStore } from '@/stores/resume'
import CustomFieldEditor from './CustomFieldEditor.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { CustomSection, FieldType } from '@/types/resume'

const props = defineProps<{
  section: CustomSection
}>()

const store = useResumeStore()
const showAddField = ref(false)

/**
 * 字段类型选项
 */
const fieldTypeOptions = [
  { label: '文本', value: 'text' },
  { label: '富文本（支持加粗）', value: 'richtext' },
  { label: '时间段', value: 'period' },
  { label: '链接', value: 'link' },
  { label: '列表', value: 'list' },
]

/**
 * 添加字段
 */
function handleAddField(type: FieldType) {
  store.addCustomField(props.section.id, type)
  showAddField.value = false
}
</script>

<template>
  <div class="custom-section-editor">
    <div v-for="field in props.section.fields" :key="field.id">
      <CustomFieldEditor :section-id="props.section.id" :field="field" />
    </div>

    <div class="add-field-area">
      <a-dropdown v-model:open="showAddField" trigger="click">
        <a-button type="dashed" block size="small">
          <PlusOutlined /> 添加字段
        </a-button>
        <template #overlay>
          <a-menu @click="({ key }: { key: string }) => handleAddField(key as FieldType)">
            <a-menu-item v-for="option in fieldTypeOptions" :key="option.value">
              {{ option.label }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped>
.custom-section-editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.add-field-area {
  margin-top: 8px;
}
</style>
