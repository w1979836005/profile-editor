/**
 * 专业技能 Store
 */
import { ref } from 'vue'
import type { Skill } from '@/types/resume'
import { generateId } from './utils'

/**
 * 创建专业技能 Store
 * @param getDefaultData - 获取默认数据函数
 * @returns 专业技能相关的状态和方法
 */
export function createSkillsStore(getDefaultData: () => { skills: Skill[] }) {
  const skills = ref<Skill[]>(getDefaultData().skills)

  /**
   * 添加技能
   */
  function addSkill() {
    skills.value.push({ id: generateId(), label: '', content: '' })
  }

  /**
   * 删除技能
   * @param id - 技能ID
   */
  function removeSkill(id: string) {
    skills.value = skills.value.filter((s) => s.id !== id)
  }

  /**
   * 更新技能
   * @param id - 技能ID
   * @param updates - 要更新的字段
   */
  function updateSkill(id: string, updates: Partial<Omit<Skill, 'id'>>) {
    const item = skills.value.find((s) => s.id === id)
    if (item) Object.assign(item, updates)
  }

  /**
   * 重置技能
   */
  function resetSkills() {
    skills.value = getDefaultData().skills
  }

  return {
    skills,
    addSkill,
    removeSkill,
    updateSkill,
    resetSkills,
  }
}
