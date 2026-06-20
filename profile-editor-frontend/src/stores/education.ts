/**
 * 教育经历 Store
 */
import { ref } from 'vue'
import type { Education } from '@/types/resume'
import { generateId } from './utils'

/**
 * 创建教育经历 Store
 * @param getDefaultData - 获取默认数据函数
 * @returns 教育经历相关的状态和方法
 */
export function createEducationStore(getDefaultData: () => { education: Education[] }) {
  const education = ref<Education[]>(getDefaultData().education)

  /**
   * 添加教育经历
   */
  function addEducation() {
    education.value.push({
      id: generateId(),
      school: '',
      major: '',
      period: '',
      college: '',
      awards: '',
    })
  }

  /**
   * 删除教育经历
   * @param id - 教育经历ID
   */
  function removeEducation(id: string) {
    education.value = education.value.filter((e) => e.id !== id)
  }

  /**
   * 更新教育经历
   * @param id - 教育经历ID
   * @param updates - 要更新的字段
   */
  function updateEducation(id: string, updates: Partial<Omit<Education, 'id'>>) {
    const item = education.value.find((e) => e.id === id)
    if (item) Object.assign(item, updates)
  }

  /**
   * 重置教育经历
   */
  function resetEducation() {
    education.value = getDefaultData().education
  }

  return {
    education,
    addEducation,
    removeEducation,
    updateEducation,
    resetEducation,
  }
}
