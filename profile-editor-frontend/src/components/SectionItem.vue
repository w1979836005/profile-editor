<script setup lang="ts">
/**
 * 可拖拽板块包装器组件
 * 支持拖拽排序、标题编辑、删除等功能
 */
import { computed, ref } from 'vue'
import { HolderOutlined, DeleteOutlined, EditOutlined, RightOutlined, DownOutlined } from '@ant-design/icons-vue'
import { useUIStore } from '@/stores/ui'

const props = withDefaults(
  defineProps<{
    id: string
    title: string
    draggable?: boolean
    editable?: boolean
    deletable?: boolean
    defaultExpanded?: boolean
  }>(),
  {
    draggable: false,
    editable: false,
    deletable: false,
    defaultExpanded: false,
  },
)

const emit = defineEmits<{
  (e: 'dragstart'): void
  (e: 'dragover', event: DragEvent): void
  (e: 'drop'): void
  (e: 'delete'): void
  (e: 'update:title', title: string): void
}>()

const uiStore = useUIStore()
const isEditing = ref(false)
const editTitle = ref(props.title)

/**
 * 计算属性：板块是否展开
 */
const expanded = computed({
  get: () => uiStore.isSectionExpanded(props.id, props.defaultExpanded),
  set: (value: boolean) => uiStore.setSectionExpanded(props.id, value),
})

/**
 * 处理拖拽开始（仅在拖拽手柄上触发）
 */
function handleDragStart(event: DragEvent) {
  if (!props.draggable) return
  event.dataTransfer!.effectAllowed = 'move'
  emit('dragstart')
}

/**
 * 处理拖拽经过
 */
function handleDragOver(event: DragEvent) {
  if (!props.draggable) return
  event.preventDefault()
  emit('dragover', event)
}

/**
 * 处理放置
 */
function handleDrop() {
  if (!props.draggable) return
  emit('drop')
}

/**
 * 开始编辑标题
 */
function startEdit() {
  editTitle.value = props.title
  isEditing.value = true
}

/**
 * 保存标题
 */
function saveTitle() {
  if (editTitle.value.trim()) {
    emit('update:title', editTitle.value.trim())
  }
  isEditing.value = false
}

/**
 * 取消编辑
 */
function cancelEdit() {
  isEditing.value = false
}
</script>

<template>
  <div
    class="section-item"
    :class="{ 'is-expanded': expanded }"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <div class="section-header" @click="expanded = !expanded">
      <div class="header-left">
        <div
          v-if="props.draggable"
          class="drag-handle"
          draggable="true"
          @dragstart="handleDragStart"
        >
          <HolderOutlined />
        </div>
        <div v-if="isEditing" class="title-edit" @click.stop>
          <a-input
            v-model:value="editTitle"
            size="small"
            @press-enter="saveTitle"
            @blur="saveTitle"
            @keydown.esc="cancelEdit"
            autofocus
          />
        </div>
        <span v-else class="section-title">{{ props.title }}</span>
      </div>
      <div class="header-right" @click.stop>
        <a-button
          v-if="props.editable"
          type="text"
          size="small"
          @click="startEdit"
        >
          <EditOutlined />
        </a-button>
        <a-button
          v-if="props.deletable"
          type="text"
          danger
          size="small"
          @click="emit('delete')"
        >
          <DeleteOutlined />
        </a-button>
        <DownOutlined v-if="expanded" class="expand-icon" />
        <RightOutlined v-else class="expand-icon" />
      </div>
    </div>
    <div v-show="expanded" class="section-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.section-item {
  margin-bottom: 8px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;
  background: #fafafa;
  border-bottom: 1px solid transparent;
  transition: background 0.2s;
}

.section-item.is-expanded .section-header {
  border-bottom: 1px solid #f0f0f0;
}

.section-header:hover {
  background: #f5f5f5;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.drag-handle {
  cursor: grab;
  color: #999;
  display: flex;
  align-items: center;
  padding: 4px;
}

.drag-handle:hover {
  color: #666;
}

.drag-handle:active {
  cursor: grabbing;
}

.section-title {
  font-weight: 600;
  font-size: 15px;
  color: #333;
}

.title-edit {
  flex: 1;
  max-width: 300px;
}

.expand-icon {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
  transition: transform 0.2s;
}

.section-content {
  padding: 16px;
}
</style>
