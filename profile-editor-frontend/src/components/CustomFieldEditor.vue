<script setup lang="ts">
/**
 * 自定义字段编辑器组件
 * 根据字段类型渲染不同的编辑界面
 */
import { useResumeStore } from '@/stores/resume'
import RichTextEditor from './RichTextEditor.vue'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { CustomField } from '@/types/resume'

const props = defineProps<{
  sectionId: string
  field: CustomField
}>()

const store = useResumeStore()

/**
 * 更新字段标签
 */
function handleLabelChange(label: string) {
  store.updateCustomFieldLabel(props.sectionId, props.field.id, label)
}

/**
 * 更新文本/富文本/时间段字段值
 */
function handleValueChange(value: string) {
  store.updateCustomFieldValue(props.sectionId, props.field.id, value)
}

/**
 * 更新链接字段
 */
function handleLinkUrlChange(url: string) {
  if (props.field.type === 'link') {
    store.updateCustomFieldLink(props.sectionId, props.field.id, url, props.field.text)
  }
}

function handleLinkTextChange(text: string) {
  if (props.field.type === 'link') {
    store.updateCustomFieldLink(props.sectionId, props.field.id, props.field.url, text)
  }
}

/**
 * 删除字段
 */
function handleRemove() {
  store.removeCustomField(props.sectionId, props.field.id)
}
</script>

<template>
  <div class="custom-field-editor">
    <div class="field-header">
      <a-input
        :value="props.field.label"
        @update:value="handleLabelChange"
        placeholder="字段名称"
        size="small"
        class="field-label-input"
      />
      <a-button
        type="link"
        danger
        size="small"
        @click="handleRemove"
      >
        <DeleteOutlined />
      </a-button>
    </div>

    <!-- 文本字段 -->
    <a-input
      v-if="props.field.type === 'text'"
      :value="props.field.value"
      @update:value="handleValueChange"
      placeholder="请输入内容"
    />

    <!-- 富文本字段 -->
    <RichTextEditor
      v-else-if="props.field.type === 'richtext'"
      :model-value="props.field.value"
      @update:model-value="handleValueChange"
      placeholder="请输入内容，选中文字后按 Ctrl+B 加粗"
      :min-height="60"
      :max-height="150"
    />

    <!-- 时间段字段 -->
    <a-input
      v-else-if="props.field.type === 'period'"
      :value="props.field.value"
      @update:value="handleValueChange"
      placeholder="如：2024-01 ~ 2024-06"
    />

    <!-- 链接字段 -->
    <div v-else-if="props.field.type === 'link'" class="link-fields">
      <a-input
        :value="props.field.url"
        @update:value="handleLinkUrlChange"
        placeholder="链接地址 (https://...)"
      />
      <a-input
        :value="props.field.text"
        @update:value="handleLinkTextChange"
        placeholder="显示文本"
      />
    </div>

    <!-- 列表字段 -->
    <div v-else-if="props.field.type === 'list'" class="list-field">
      <div v-for="(item, index) in props.field.items" :key="index" class="list-item">
        <a-input
          :value="item"
          @update:value="(v: string) => store.updateCustomListItem(props.sectionId, props.field.id, index, v)"
          placeholder="列表项内容"
        />
        <a-button
          type="link"
          danger
          size="small"
          @click="store.removeCustomListItem(props.sectionId, props.field.id, index)"
        >
          <DeleteOutlined />
        </a-button>
      </div>
      <a-button
        type="dashed"
        size="small"
        block
        @click="store.addCustomListItem(props.sectionId, props.field.id)"
      >
        <PlusOutlined /> 添加列表项
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.custom-field-editor {
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 12px;
  background: #fafafa;
  margin-bottom: 8px;
}

.field-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.field-label-input {
  flex: 1;
  max-width: 200px;
}

.link-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.list-item .ant-input {
  flex: 1;
}
</style>
