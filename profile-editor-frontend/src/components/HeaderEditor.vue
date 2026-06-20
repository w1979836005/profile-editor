<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { UploadChangeParam } from 'ant-design-vue'

const store = useResumeStore()

function handlePhotoChange(info: UploadChangeParam) {
  const file = info.file.originFileObj
  if (!file) return

  if (!file.type.startsWith('image/')) {
    message.error('只能上传图片文件')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result
    if (typeof result === 'string') {
      store.updateHeader({ photo: result })
    }
  }
  reader.readAsDataURL(file)
}

function handlePhotoRemove() {
  store.updateHeader({ photo: '' })
  return false
}
</script>

<template>
  <div class="header-editor">
    <a-form layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="姓名">
            <a-input
              :value="store.data.header.name"
              @update:value="(v: string) => store.updateHeader({ name: v })"
              placeholder="请输入姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="电话">
            <a-input
              :value="store.data.header.phone"
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
              :value="store.data.header.email"
              @update:value="(v: string) => store.updateHeader({ email: v })"
              placeholder="请输入邮箱"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="身份状态">
            <a-input
              :value="store.data.header.status"
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
              :value="store.data.header.title"
              @update:value="(v: string) => store.updateHeader({ title: v })"
              placeholder="如：全栈开发工程师"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="证件照">
            <div class="photo-upload-area">
              <a-upload
                :show-upload-list="false"
                :before-upload="() => false"
                accept="image/*"
                @change="handlePhotoChange"
              >
                <a-button v-if="!store.data.header.photo">
                  <UploadOutlined /> 上传照片
                </a-button>
              </a-upload>
              <div v-if="store.data.header.photo" class="photo-preview">
                <img :src="store.data.header.photo" alt="证件照预览" />
                <a-button type="link" danger size="small" @click="handlePhotoRemove">
                  删除
                </a-button>
              </div>
            </div>
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
.photo-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.photo-preview img {
  width: 60px;
  height: 80px;
  object-fit: cover;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
</style>
