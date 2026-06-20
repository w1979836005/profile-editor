<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import ResumePreview from '@/components/ResumePreview.vue'

const activeTab = ref<string>('edit')

function handlePrint() {
  activeTab.value = 'preview'
  setTimeout(() => {
    window.print()
  }, 100)
}
</script>

<template>
  <a-layout class="app-layout">
    <a-layout-header class="app-header">
      <div class="header-left">
        <span class="app-title">简历制作工具</span>
      </div>
      <div class="header-right">
        <a-button @click="handlePrint" type="primary">导出 PDF</a-button>
      </div>
    </a-layout-header>

    <!-- Desktop: side-by-side -->
    <a-layout-content class="app-content desktop-layout">
      <div class="editor-pane">
        <RouterView />
      </div>
      <div class="preview-pane">
        <ResumePreview />
      </div>
    </a-layout-content>

    <!-- Mobile: tab switch -->
    <a-layout-content class="app-content mobile-layout">
      <a-tabs v-model:activeKey="activeTab" centered>
        <a-tab-pane key="edit" tab="编辑">
          <div class="editor-pane-mobile">
            <RouterView />
          </div>
        </a-tab-pane>
        <a-tab-pane key="preview" tab="预览">
          <div class="preview-pane-mobile">
            <ResumePreview />
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  z-index: 10;
  height: 56px;
  line-height: 56px;
}

.header-left {
  display: flex;
  align-items: center;
}

.app-title {
  font-size: 18px;
  font-weight: 700;
  color: #111;
}

.app-content {
  flex: 1;
  overflow: hidden;
}

/* Desktop: side-by-side */
.desktop-layout {
  display: flex;
}

.editor-pane {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 56px);
  background: #fff;
  border-right: 1px solid #f0f0f0;
}

.preview-pane {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 56px);
}

/* Mobile: hidden by default */
.mobile-layout {
  display: none;
}

.editor-pane-mobile {
  background: #fff;
}

.preview-pane-mobile {
  min-height: 100%;
}

/* Responsive */
@media (max-width: 900px) {
  .desktop-layout {
    display: none;
  }
  .mobile-layout {
    display: block;
  }
}

@media print {
  .app-header,
  .editor-pane,
  .mobile-layout {
    display: none !important;
  }
  .desktop-layout {
    display: flex !important;
  }
  .editor-pane {
    display: none !important;
  }
  .preview-pane {
    overflow: visible !important;
    height: auto !important;
  }
}
</style>
