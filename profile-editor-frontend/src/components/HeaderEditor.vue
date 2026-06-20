<script setup lang="ts">
/**
 * 基本信息编辑器组件
 */
import { ref } from 'vue'
import { useResumeStore } from '@/stores/resume'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const store = useResumeStore()
const uploading = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

/**
 * 触发文件选择
 */
function triggerFileSelect() {
  fileInputRef.value?.click()
}

/**
 * 处理文件选择
 */
function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    message.error('只能上传图片文件')
    input.value = ''
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    message.error('图片大小不能超过 2MB')
    input.value = ''
    return
  }

  uploading.value = true
  const reader = new FileReader()

  reader.onload = (e) => {
    const result = e.target?.result
    if (typeof result === 'string') {
      store.updateHeader({ photo: result })
      message.success('照片上传成功')
    }
    uploading.value = false
    input.value = ''
  }

  reader.onerror = () => {
    message.error('照片上传失败')
    uploading.value = false
    input.value = ''
  }

  reader.readAsDataURL(file)
}

/**
 * 删除照片
 */
function handlePhotoRemove() {
  store.updateHeader({ photo: '' })
  message.success('照片已删除')
}
</script>

<template>
  <div class="header-editor">
    <a-form layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="姓名">
            <a-input
              :value="store.header.name"
              @update:value="(v: string) => store.updateHeader({ name: v })"
              placeholder="请输入姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="电话">
            <a-input
              :value="store.header.phone"
              @update:value="(v: string) => store.updateHeader({ phone: v })"
              placeholder="请输入电话"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="邮箱">
            <a-input
              :value="store.header.email"
              @update:value="(v: string) => store.updateHeader({ email: v })"
              placeholder="请输入邮箱"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="身份状态">
            <a-input
              :value="store.header.status"
              @update:value="(v: string) => store.updateHeader({ status: v })"
              placeholder="如：应届毕业生"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="求职职位">
            <a-input
              :value="store.header.title"
              @update:value="(v: string) => store.updateHeader({ title: v })"
              placeholder="如：全栈开发工程师"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="证件照">
            <div class="photo-upload-area">
              <input
                ref="fileInputRef"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleFileSelect"
              />
              <div v-if="!store.header.photo" class="upload-trigger" @click="triggerFileSelect">
                <LoadingOutlined v-if="uploading" />
                <UploadOutlined v-else />
                <span>{{ uploading ? '上传中...' : '上传照片' }}</span>
              </div>
              <div v-if="store.header.photo" class="photo-preview">
                <img :src="store.header.photo" alt="证件照预览" />
                <div class="photo-actions">
                  <a-button size="small" @click="triggerFileSelect">更换</a-button>
                  <a-button type="link" danger size="small" @click="handlePhotoRemove">删除</a-button>
                </div>
              </div>
            </div>
            <div class="upload-tip">支持 JPG、PNG，最大 2MB</div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<style scoped>
.photo-upload-area {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.upload-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  background: #fafafa;
}

.upload-trigger:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.upload-trigger .anticon {
  font-size: 20px;
  margin-bottom: 4px;
}

.upload-trigger span {
  font-size: 12px;
}

.photo-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.photo-preview img {
  width: 72px;
  height: 96px;
  object-fit: cover;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.photo-actions {
  display: flex;
  gap: 4px;
}

.upload-tip {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>
