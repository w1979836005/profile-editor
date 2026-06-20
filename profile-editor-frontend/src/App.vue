<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { message } from 'ant-design-vue'
import ResumePreview from '@/components/ResumePreview.vue'
import html2pdf from 'html2pdf.js'

const activeTab = ref<string>('edit')
const exporting = ref(false)

/**
 * 导出 PDF
 * 使用 html2pdf.js 直接下载 PDF
 */
async function handleExportPDF() {
  exporting.value = true

  // 获取预览区域的 DOM 元素
  const element = document.querySelector('.resume') as HTMLElement
  if (!element) {
    message.error('未找到预览内容')
    exporting.value = false
    return
  }

  // 获取用户姓名作为文件名
  const store = await import('@/stores/resume').then((m) => m.useResumeStore())
  const fileName = store.header.name ? `${store.header.name}_简历.pdf` : '简历.pdf'

  const opt = {
    margin: [0, 0, 0, 0] as [number, number, number, number],
    filename: fileName,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      width: 800,
      windowWidth: 800,
    },
    jsPDF: {
      unit: 'mm' as const,
      format: 'a4' as const,
      orientation: 'portrait' as const,
    },
    pagebreak: { mode: 'avoid-all' as const },
  }

  try {
    await html2pdf().set(opt).from(element).save()
    message.success('PDF 导出成功！')
  } catch (error) {
    console.error('[ExportPDF] 导出失败:', error)
    message.error('PDF 导出失败，请重试')
  } finally {
    exporting.value = false
  }
}
</script>

<template>
  <a-layout class="app-layout">
    <a-layout-header class="app-header">
      <div class="header-left">
        <span class="app-title">简历制作工具</span>
      </div>
      <div class="header-right">
        <a-button @click="handleExportPDF" type="primary" :loading="exporting">
          {{ exporting ? '导出中...' : '导出 PDF' }}
        </a-button>
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

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1px;
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

/* 自定义滚动条样式 */
.editor-pane::-webkit-scrollbar,
.preview-pane::-webkit-scrollbar {
  width: 5px;
}

.editor-pane::-webkit-scrollbar-thumb,
.preview-pane::-webkit-scrollbar-thumb {
  background: #d9d9d9;
  border-radius: 3px;
}

.editor-pane::-webkit-scrollbar-thumb:hover,
.preview-pane::-webkit-scrollbar-thumb:hover {
  background: #bfbfbf;
}

.editor-pane::-webkit-scrollbar-track,
.preview-pane::-webkit-scrollbar-track {
  background: transparent;
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

/* 打印样式优化 */
@media print {
  /* 隐藏非打印元素 */
  .app-header,
  .editor-pane,
  .mobile-layout {
    display: none !important;
  }

  /* 确保预览面板完整显示 */
  .desktop-layout {
    display: flex !important;
  }

  .editor-pane {
    display: none !important;
  }

  .preview-pane {
    overflow: visible !important;
    height: auto !important;
    width: 100% !important;
  }

  /* 移除背景色和阴影 */
  .app-layout {
    background: #fff !important;
  }

  /* 确保打印时页面尺寸正确，移除默认页眉页脚 */
  @page {
    size: A4;
    margin: 10mm 10mm 10mm 10mm;
  }

  /* 移除浏览器默认的页眉页脚 */
  @page :header {
    display: none;
  }

  @page :footer {
    display: none;
  }

  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
