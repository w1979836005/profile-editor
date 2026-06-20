<script setup lang="ts">
import HeaderEditor from '@/components/HeaderEditor.vue'
import EducationEditor from '@/components/EducationEditor.vue'
import SkillsEditor from '@/components/SkillsEditor.vue'
import ExperienceEditor from '@/components/ExperienceEditor.vue'
import ProjectEditor from '@/components/ProjectEditor.vue'
</script>

<template>
  <div class="editor-view">
    <a-collapse :bordered="false" default-active-key="['header', 'education', 'skills', 'experiences', 'projects']">
      <a-collapse-panel key="header" header="基本信息">
        <HeaderEditor />
      </a-collapse-panel>
      <a-collapse-panel key="education" header="教育经历">
        <EducationEditor />
      </a-collapse-panel>
      <a-collapse-panel key="skills" header="专业技能">
        <SkillsEditor />
      </a-collapse-panel>
      <a-collapse-panel key="experiences" header="实习经历">
        <ExperienceEditor />
      </a-collapse-panel>
      <a-collapse-panel key="projects" header="项目经历">
        <ProjectEditor />
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<style scoped>
.editor-view {
  padding: 16px;
}
</style>

<style>
.editor-view .ant-collapse-item {
  margin-bottom: 8px;
}
.editor-view .ant-collapse-header {
  font-weight: 600 !important;
  font-size: 15px !important;
}
</style>
