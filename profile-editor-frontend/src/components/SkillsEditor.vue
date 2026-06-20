<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'
import RichTextEditor from './RichTextEditor.vue'

const store = useResumeStore()
</script>

<template>
  <div class="skills-editor">
    <div v-for="skill in store.skills" :key="skill.id" class="skill-item">
      <div class="skill-header">
        <a-input
          :value="skill.label"
          @update:value="(v: string) => store.updateSkill(skill.id, { label: v })"
          placeholder="技能标签"
          class="skill-label"
        />
        <a-button type="link" danger size="small" @click="store.removeSkill(skill.id)">
          删除
        </a-button>
      </div>
      <RichTextEditor
        :model-value="skill.content"
        @update:model-value="(v: string) => store.updateSkill(skill.id, { content: v })"
        placeholder="技能描述，选中文字后按 Ctrl+B 加粗"
        :min-height="40"
        :max-height="100"
      />
    </div>
    <a-button type="dashed" block @click="store.addSkill">
      + 添加技能
    </a-button>
  </div>
</template>

<style scoped>
.skills-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skill-item {
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 12px;
  background: #fafafa;
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.skill-label {
  width: 150px;
  flex-shrink: 0;
}
</style>
