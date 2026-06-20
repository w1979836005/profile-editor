<script setup lang="ts">
/**
 * 编辑器视图组件
 * 支持板块拖拽排序和自定义板块
 */
import { ref } from 'vue'
import { useResumeStore } from '@/stores/resume'
import HeaderEditor from '@/components/HeaderEditor.vue'
import EducationEditor from '@/components/EducationEditor.vue'
import SkillsEditor from '@/components/SkillsEditor.vue'
import ExperienceEditor from '@/components/ExperienceEditor.vue'
import ProjectEditor from '@/components/ProjectEditor.vue'
import CustomSectionEditor from '@/components/CustomSectionEditor.vue'
import SectionItem from '@/components/SectionItem.vue'
import { PlusOutlined } from '@ant-design/icons-vue'

const store = useResumeStore()

const showAddModal = ref(false)
const newSectionTitle = ref('')
const dragIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

/**
 * 板块标题映射
 */
const sectionTitleMap: Record<string, string> = {
  education: '教育经历',
  skills: '专业技能',
  experiences: '实习经历',
  projects: '项目经历',
}

/**
 * 获取板块标题
 */
function getSectionTitle(section: { id: string; type: string }): string {
  if (section.type === 'custom') {
    const custom = store.customSections.find((s) => s.id === section.id)
    return custom?.title || '自定义板块'
  }
  return sectionTitleMap[section.id] || section.id
}

/**
 * 处理拖拽开始
 */
function handleDragStart(index: number) {
  dragIndex.value = index
}

/**
 * 处理拖拽经过
 */
function handleDragOver(index: number) {
  dragOverIndex.value = index
}

/**
 * 处理放置
 */
function handleDrop(index: number) {
  if (dragIndex.value !== null && dragIndex.value !== index) {
    store.reorderSections(dragIndex.value, index)
  }
  dragIndex.value = null
  dragOverIndex.value = null
}

/**
 * 处理拖拽结束
 */
function handleDragEnd() {
  dragIndex.value = null
  dragOverIndex.value = null
}

/**
 * 添加自定义板块
 */
function handleAddSection() {
  if (newSectionTitle.value.trim()) {
    store.addCustomSection(newSectionTitle.value.trim())
    newSectionTitle.value = ''
    showAddModal.value = false
  }
}

/**
 * 删除自定义板块
 */
function handleDeleteSection(id: string) {
  store.removeCustomSection(id)
}

/**
 * 更新自定义板块标题
 */
function handleUpdateSectionTitle(id: string, title: string) {
  store.updateCustomSectionTitle(id, title)
}
</script>

<template>
  <div class="editor-view">
    <!-- 基本信息（固定在最上面，不可拖拽） -->
    <SectionItem title="基本信息" :default-expanded="true">
      <HeaderEditor />
    </SectionItem>

    <!-- 可排序的板块 -->
    <div
      v-for="(section, index) in store.sectionOrder"
      :key="section.id"
      :class="{ 'drag-over': dragOverIndex === index }"
      @dragend="handleDragEnd"
    >
      <!-- 内置板块 -->
      <SectionItem
        v-if="section.type === 'education'"
        :title="getSectionTitle(section)"
        :draggable="true"
        :default-expanded="true"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver(index)"
        @drop="handleDrop(index)"
      >
        <EducationEditor />
      </SectionItem>

      <SectionItem
        v-else-if="section.type === 'skills'"
        :title="getSectionTitle(section)"
        :draggable="true"
        :default-expanded="true"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver(index)"
        @drop="handleDrop(index)"
      >
        <SkillsEditor />
      </SectionItem>

      <SectionItem
        v-else-if="section.type === 'experiences'"
        :title="getSectionTitle(section)"
        :draggable="true"
        :default-expanded="true"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver(index)"
        @drop="handleDrop(index)"
      >
        <ExperienceEditor />
      </SectionItem>

      <SectionItem
        v-else-if="section.type === 'projects'"
        :title="getSectionTitle(section)"
        :draggable="true"
        :default-expanded="true"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver(index)"
        @drop="handleDrop(index)"
      >
        <ProjectEditor />
      </SectionItem>

      <!-- 自定义板块 -->
      <SectionItem
        v-else-if="section.type === 'custom'"
        :title="getSectionTitle(section)"
        :draggable="true"
        :editable="true"
        :deletable="true"
        :default-expanded="true"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver(index)"
        @drop="handleDrop(index)"
        @delete="handleDeleteSection(section.id)"
        @update:title="(t: string) => handleUpdateSectionTitle(section.id, t)"
      >
        <CustomSectionEditor
          :section="store.customSections.find((s) => s.id === section.id)!"
        />
      </SectionItem>
    </div>

    <!-- 新增板块按钮 -->
    <div class="add-section-area">
      <a-button type="dashed" block @click="showAddModal = true">
        <PlusOutlined /> 新增板块
      </a-button>
    </div>

    <!-- 新增板块弹窗 -->
    <a-modal
      v-model:open="showAddModal"
      title="新增自定义板块"
      @ok="handleAddSection"
      :ok-button-props="{ disabled: !newSectionTitle.trim() }"
    >
      <a-form layout="vertical">
        <a-form-item label="板块名称">
          <a-input
            v-model:value="newSectionTitle"
            placeholder="请输入板块名称，如：获奖荣誉、个人总结"
            @press-enter="handleAddSection"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped>
.editor-view {
  padding: 16px;
}

.add-section-area {
  margin-top: 16px;
}

.drag-over {
  border-top: 2px solid #1890ff;
  margin-top: -2px;
}
</style>
