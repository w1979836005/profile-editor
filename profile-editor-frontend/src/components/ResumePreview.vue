<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'

const store = useResumeStore()
</script>

<template>
  <div class="resume-wrapper">
    <div class="resume">
      <!-- HEADER -->
      <div class="header">
        <div class="header-left">
          <div class="name">{{ store.data.header.name }}</div>
          <div class="contact-row">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              {{ store.data.header.phone }}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="2 7 12 13 22 7" />
              </svg>
              {{ store.data.header.email }}
            </span>
          </div>
          <div class="contact-row">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {{ store.data.header.status }}
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              {{ store.data.header.title }}
            </span>
          </div>
        </div>
        <div class="header-right">
          <img
            v-if="store.data.header.photo"
            class="photo"
            :src="store.data.header.photo"
            alt="证件照"
          />
          <div v-else class="photo photo-placeholder">证件照</div>
        </div>
      </div>

      <!-- 教育经历 -->
      <div class="section-title">教育经历</div>
      <div v-for="edu in store.data.education" :key="edu.id" class="exp-item">
        <div class="exp-head">
          <div class="exp-left">{{ edu.school }} <span class="role">{{ edu.major }}</span></div>
          <div class="exp-date">{{ edu.period }}</div>
        </div>
        <div class="exp-sub">{{ edu.college }}</div>
        <div class="exp-desc">{{ edu.awards }}</div>
      </div>

      <!-- 专业技能 -->
      <div class="section-title">专业技能</div>
      <ul>
        <li v-for="skill in store.data.skills" :key="skill.id">
          <b>{{ skill.label }}：</b>{{ skill.content }}
        </li>
      </ul>

      <!-- 实习经历 -->
      <div class="section-title">实习经历</div>
      <div v-for="exp in store.data.experiences" :key="exp.id" class="exp-item">
        <div class="exp-head">
          <div class="exp-left">{{ exp.company }} <span class="role">{{ exp.role }}</span></div>
          <div class="exp-date">{{ exp.period }}</div>
        </div>
        <div v-if="exp.description" class="exp-desc" v-html="exp.description"></div>
        <div v-if="exp.techStack" class="tech-line"><b>主要技术：</b>{{ exp.techStack }}</div>
        <ol v-if="exp.highlights.length">
          <li v-for="(h, i) in exp.highlights" :key="i" v-html="h"></li>
        </ol>
      </div>

      <!-- 项目经历 -->
      <div class="section-title">项目经历</div>
      <div v-for="proj in store.data.projects" :key="proj.id" class="exp-item">
        <div class="exp-head">
          <div class="exp-left">{{ proj.name }}</div>
          <div class="exp-date">{{ proj.period }}</div>
        </div>
        <div v-if="proj.description" class="exp-desc" v-html="proj.description"></div>
        <div v-if="proj.techStack" class="tech-line"><b>主要技术：</b>{{ proj.techStack }}</div>
        <ol v-if="proj.highlights.length">
          <li v-for="(h, i) in proj.highlights" :key="i" v-html="h"></li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style>
/* ===== Resume Print Styles (no scoped, needed for window.print) ===== */
@media print {
  body * {
    visibility: hidden;
  }
  .resume,
  .resume * {
    visibility: visible;
  }
  .resume {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 4mm !important;
    box-shadow: none !important;
  }
  .resume-wrapper {
    background: #fff !important;
    padding: 0 !important;
  }
  @page {
    size: A4;
    margin: 4mm;
  }
}
</style>

<style scoped>
.resume-wrapper {
  background: #e8e8e8;
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100%;
}

.resume {
  width: 800px;
  max-width: 100%;
  background: #fff;
  padding: 22px 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  font-family: "Microsoft YaHei", "PingFang SC", "Helvetica Neue", sans-serif;
  color: #333;
  line-height: 1.3;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}
.header-left {
  flex: 1;
}
.header-left .name {
  font-size: 22px;
  font-weight: 900;
  color: #111;
  margin-bottom: 2px;
  letter-spacing: 2px;
}
.header-left .contact-row {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 11px;
  color: #555;
  margin-bottom: 1px;
}
.header-left .contact-row span {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}
.header-left .contact-row svg {
  width: 1em;
  height: 1em;
  flex-shrink: 0;
}
.header-right .photo {
  width: 72px;
  height: 96px;
  object-fit: cover;
  border: 1px solid #ddd;
}
.photo-placeholder {
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #bbb;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #111;
  border-bottom: 1.5px solid #000;
  padding-bottom: 1px;
  margin-top: 14px;
  margin-bottom: 6px;
}
.section-title:first-of-type {
  margin-top: 0;
}

.exp-item {
  margin-bottom: 8px;
}
.exp-item:last-child {
  margin-bottom: 0;
}
.exp-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}
.exp-head .exp-left {
  font-weight: 700;
  font-size: 13px;
  color: #111;
}
.exp-head .exp-left .role {
  font-weight: 400;
  font-size: 11px;
  color: #555;
}
.exp-head .exp-date {
  font-size: 10px;
  color: #888;
  white-space: nowrap;
}

.exp-sub {
  font-size: 11px;
  color: #555;
  margin-bottom: 0;
}

.exp-desc {
  font-size: 11px;
  color: #333;
  margin-bottom: 1px;
  line-height: 1.35;
}

ul,
ol {
  margin: 0;
}
ul {
  list-style-type: disc;
  padding-left: 12px;
  font-size: 11px;
  color: #333;
  line-height: 1.35;
}
ul li {
  margin-bottom: 0;
}
ol {
  padding-left: 14px;
  font-size: 11px;
  color: #333;
  line-height: 1.35;
}
ol li {
  margin-bottom: 0;
}

.tech-line {
  font-size: 11px;
  color: #555;
  margin-top: 1px;
}
.tech-line b {
  color: #111;
}

b,
strong {
  color: #111;
}
</style>
