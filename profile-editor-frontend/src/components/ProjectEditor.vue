<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()
</script>

<template>
  <div class="project-editor">
    <div v-for="(proj, index) in store.data.projects" :key="proj.id" class="section-card">
      <div class="card-header">
        <span class="card-title">项目经历 {{ index + 1 }}</span>
        <a-button type="link" danger size="small" @click="store.removeProject(proj.id)">
          删除
        </a-button>
      </div>
      <a-form layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="项目名称">
              <a-input
                :value="proj.name"
                @update:value="(v: string) => store.updateProject(proj.id, { name: v })"
                placeholder="如：GOJ 在线刷题平台"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="时间段">
              <a-input
                :value="proj.period"
                @update:value="(v: string) => store.updateProject(proj.id, { period: v })"
                placeholder="如：2025-09 ~ 至今"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="项目描述">
          <a-textarea
            :value="proj.description"
            @update:value="(v: string) => store.updateProject(proj.id, { description: v })"
            placeholder="项目概述（支持 HTML 加粗标签 &lt;b&gt;）"
            :auto-size="{ minRows: 2, maxRows: 6 }"
          />
        </a-form-item>
        <a-form-item label="技术栈">
          <a-input
            :value="proj.techStack"
            @update:value="(v: string) => store.updateProject(proj.id, { techStack: v })"
            placeholder="如：SpringBoot + Vue3 + Redis"
          />
        </a-form-item>
        <a-form-item label="工作亮点">
          <div v-for="(h, i) in proj.highlights" :key="i" class="highlight-row">
            <a-textarea
              :value="h"
              @update:value="(v: string) => store.updateProjectHighlight(proj.id, i, v)"
              placeholder="工作亮点描述（支持 HTML 加粗标签）"
              :auto-size="{ minRows: 1, maxRows: 3 }"
              class="highlight-input"
            />
            <a-button
              type="link"
              danger
              size="small"
              @click="store.removeProjectHighlight(proj.id, i)"
            >
              删除
            </a-button>
          </div>
          <a-button
            type="dashed"
            size="small"
            @click="store.addProjectHighlight(proj.id)"
          >
            + 添加亮点
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-button type="dashed" block @click="store.addProject">
      + 添加项目经历
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
