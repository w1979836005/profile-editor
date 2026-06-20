/**
 * 实习经历 Store
 */
import { ref } from 'vue'
import type { Experience } from '@/types/resume'
import { generateId } from './utils'

/**
 * 创建实习经历 Store
 * @param getDefaultData - 获取默认数据函数
 * @returns 实习经历相关的状态和方法
 */
export function createExperiencesStore(getDefaultData: () => { experiences: Experience[] }) {
  const experiences = ref<Experience[]>(getDefaultData().experiences)

  /**
   * 添加实习经历
   */
  function addExperience() {
    experiences.value.push({
      id: generateId(),
      company: '',
      role: '',
      period: '',
      description: '',
      techStack: '',
      highlights: [],
    })
  }

  /**
   * 删除实习经历
   * @param id - 实习经历ID
   */
  function removeExperience(id: string) {
    experiences.value = experiences.value.filter((e) => e.id !== id)
  }

  /**
   * 更新实习经历
   * @param id - 实习经历ID
   * @param updates - 要更新的字段
   */
  function updateExperience(id: string, updates: Partial<Omit<Experience, 'id'>>) {
    const item = experiences.value.find((e) => e.id === id)
    if (item) Object.assign(item, updates)
  }

  /**
   * 添加工作亮点
   * @param expId - 实习经历ID
   */
  function addExperienceHighlight(expId: string) {
    const exp = experiences.value.find((e) => e.id === expId)
    if (exp) exp.highlights.push('')
  }

  /**
   * 删除工作亮点
   * @param expId - 实习经历ID
   * @param index - 亮点索引
   */
  function removeExperienceHighlight(expId: string, index: number) {
    const exp = experiences.value.find((e) => e.id === expId)
    if (exp) exp.highlights.splice(index, 1)
  }

  /**
   * 更新工作亮点
   * @param expId - 实习经历ID
   * @param index - 亮点索引
   * @param value - 新内容
   */
  function updateExperienceHighlight(expId: string, index: number, value: string) {
    const exp = experiences.value.find((e) => e.id === expId)
    if (exp) exp.highlights[index] = value
  }

  /**
   * 重置实习经历
   */
  function resetExperiences() {
    experiences.value = getDefaultData().experiences
  }

  return {
    experiences,
    addExperience,
    removeExperience,
    updateExperience,
    addExperienceHighlight,
    removeExperienceHighlight,
    updateExperienceHighlight,
    resetExperiences,
  }
}
