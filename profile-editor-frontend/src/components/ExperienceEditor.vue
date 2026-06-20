<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'
import RichTextEditor from './RichTextEditor.vue'

const store = useResumeStore()
</script>

<template>
  <div class="experience-editor">
    <div v-for="(exp, index) in store.experiences" :key="exp.id" class="section-card">
      <div class="card-header">
        <span class="card-title">实习经历 {{ index + 1 }}</span>
        <a-button type="link" danger size="small" @click="store.removeExperience(exp.id)">
          删除
        </a-button>
      </div>
      <a-form layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="公司/组织">
              <a-input
                :value="exp.company"
                @update:value="(v: string) => store.updateExperience(exp.id, { company: v })"
                placeholder="如：福州东君网络科技有限公司"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="职位">
              <a-input
                :value="exp.role"
                @update:value="(v: string) => store.updateExperience(exp.id, { role: v })"
                placeholder="如：全栈开发实习生"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="时间段">
          <a-input
            :value="exp.period"
            @update:value="(v: string) => store.updateExperience(exp.id, { period: v })"
            placeholder="如：2026.04 ~ 2026.06"
          />
        </a-form-item>
        <a-form-item label="项目描述">
          <RichTextEditor
            :model-value="exp.description"
            @update:model-value="(v: string) => store.updateExperience(exp.id, { description: v })"
            placeholder="项目概述，选中文字后按 Ctrl+B 加粗"
            :min-height="60"
            :max-height="150"
          />
        </a-form-item>
        <a-form-item label="技术栈">
          <a-input
            :value="exp.techStack"
            @update:value="(v: string) => store.updateExperience(exp.id, { techStack: v })"
            placeholder="如：SpringBoot · Vue · MySQL"
          />
        </a-form-item>
        <a-form-item label="工作亮点">
          <div v-for="(h, i) in exp.highlights" :key="i" class="highlight-row">
            <div class="highlight-input">
              <RichTextEditor
                :model-value="h"
                @update:model-value="(v: string) => store.updateExperienceHighlight(exp.id, i, v)"
                placeholder="工作亮点描述，选中文字后按 Ctrl+B 加粗"
                :min-height="40"
                :max-height="100"
              />
            </div>
            <a-button
              type="link"
              danger
              size="small"
              @click="store.removeExperienceHighlight(exp.id, i)"
            >
              删除
            </a-button>
          </div>
          <a-button
            type="dashed"
            size="small"
            @click="store.addExperienceHighlight(exp.id)"
          >
            + 添加亮点
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-button type="dashed" block @click="store.addExperience">
      + 添加实习经历
    </a-button>
  </div>
</template>

<style scoped>
.section-card {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  background: #fafafa;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.card-title {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}
.highlight-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}
.highlight-input {
  flex: 1;
}
</style>
