<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()
</script>

<template>
  <div class="skills-editor">
    <div v-for="skill in store.data.skills" :key="skill.id" class="skill-row">
      <a-input
        :value="skill.label"
        @update:value="(v: string) => store.updateSkill(skill.id, { label: v })"
        placeholder="标签"
        class="skill-label"
      />
      <a-input
        :value="skill.content"
        @update:value="(v: string) => store.updateSkill(skill.id, { content: v })"
        placeholder="技能描述"
        class="skill-content"
      />
      <a-button type="link" danger size="small" @click="store.removeSkill(skill.id)">
        删除
      </a-button>
    </div>
    <a-button type="dashed" block @click="store.addSkill">
      + 添加技能
    </a-button>
  </div>
</template>

<style scoped>
.skill-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
}
.skill-label {
  width: 120px;
  flex-shrink: 0;
}
.skill-content {
  flex: 1;
}
</style>
