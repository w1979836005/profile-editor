<script setup lang="ts">
/**
 * 富文本编辑器组件
 * 支持 Ctrl+B 快捷键加粗
 * 内部使用 contenteditable 实现，不显示 HTML 标签
 */
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  minHeight?: number
  maxHeight?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorRef = ref<HTMLDivElement | null>(null)
const isInitialized = ref(false)

/**
 * 初始化编辑器内容
 * 将 HTML 字符串设置到 contenteditable div 中
 */
onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue || ''
    isInitialized.value = true
  }
})

/**
 * 监听外部值变化，同步到编辑器
 * 避免光标跳动，仅在值不同时更新
 */
watch(() => props.modelValue, (newVal) => {
  if (editorRef.value && isInitialized.value) {
    const currentHtml = editorRef.value.innerHTML
    if (currentHtml !== newVal) {
      editorRef.value.innerHTML = newVal || ''
    }
  }
})

/**
 * 处理输入事件，将编辑器内容同步到父组件
 */
function handleInput() {
  if (editorRef.value) {
    const html = editorRef.value.innerHTML
    emit('update:modelValue', html)
  }
}

/**
 * 切换加粗状态
 * 使用 document.execCommand 执行加粗命令
 */
function toggleBold() {
  document.execCommand('bold', false)
  handleInput()
}

/**
 * 处理键盘快捷键
 * Ctrl+B / Cmd+B 触发加粗
 */
function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
    e.preventDefault()
    toggleBold()
  }
}

/**
 * 处理粘贴事件
 * 粘贴纯文本，避免带入外部 HTML 格式
 */
function handlePaste(e: ClipboardEvent) {
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain') || ''
  document.execCommand('insertText', false, text)
}
</script>

<template>
  <div class="rich-text-editor">
    <div
      ref="editorRef"
      class="editor-content"
      contenteditable="true"
      :data-placeholder="placeholder || '请输入内容...'"
      :style="{ minHeight: (minHeight || 60) + 'px', maxHeight: (maxHeight || 200) + 'px' }"
      @input="handleInput"
      @keydown="handleKeydown"
      @paste="handlePaste"
    ></div>
  </div>
</template>

<style scoped>
.rich-text-editor {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.rich-text-editor:focus-within {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.editor-content {
  padding: 8px 12px;
  outline: none;
  overflow-y: auto;
  line-height: 1.5;
  font-size: 14px;
  color: #333;
}

.editor-content:empty::before {
  content: attr(data-placeholder);
  color: #bfbfbf;
  pointer-events: none;
}

.editor-content :deep(b),
.editor-content :deep(strong) {
  font-weight: 700;
  color: #111;
}
</style>
