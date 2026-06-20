<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()
</script>

<template>
  <div class="education-editor">
    <div v-for="(edu, index) in store.education" :key="edu.id" class="section-card">
      <div class="card-header">
        <span class="card-title">教育经历 {{ index + 1 }}</span>
        <a-button type="link" danger size="small" @click="store.removeEducation(edu.id)">
          删除
        </a-button>
      </div>
      <a-form layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="学校">
              <a-input
                :value="edu.school"
                @update:value="(v: string) => store.updateEducation(edu.id, { school: v })"
                placeholder="如：吉首大学"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="专业/学位">
              <a-input
                :value="edu.major"
                @update:value="(v: string) => store.updateEducation(edu.id, { major: v })"
                placeholder="如：软件工程 本科"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="时间段">
              <a-input
                :value="edu.period"
                @update:value="(v: string) => store.updateEducation(edu.id, { period: v })"
                placeholder="如：2022-09 ~ 2026-07"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="学院">
              <a-input
                :value="edu.college"
                @update:value="(v: string) => store.updateEducation(edu.id, { college: v })"
                placeholder="如：计算机科学与工程学院"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="证书与荣誉">
          <a-textarea
            :value="edu.awards"
            @update:value="(v: string) => store.updateEducation(edu.id, { awards: v })"
            placeholder="如：蓝桥杯 C++ B组 省二等奖，英语 CET-4"
            :auto-size="{ minRows: 2, maxRows: 4 }"
          />
        </a-form-item>
      </a-form>
    </div>
    <a-button type="dashed" block @click="store.addEducation">
      + 添加教育经历
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
</style>
