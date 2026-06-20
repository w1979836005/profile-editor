/**
 * 简历主 Store
 * 组合所有子模块的状态和方法
 */
import { defineStore } from 'pinia'
import { getDefaultData } from './defaultData'
import { createHeaderStore } from './header'
import { createEducationStore } from './education'
import { createSkillsStore } from './skills'
import { createExperiencesStore } from './experiences'
import { createProjectsStore } from './projects'
import { createSectionsStore } from './sections'
import type { ResumeData } from '@/types/resume'

export const useResumeStore = defineStore('resume', () => {
  const headerStore = createHeaderStore(getDefaultData)
  const educationStore = createEducationStore(getDefaultData)
  const skillsStore = createSkillsStore(getDefaultData)
  const experiencesStore = createExperiencesStore(getDefaultData)
  const projectsStore = createProjectsStore(getDefaultData)
  const sectionsStore = createSectionsStore(getDefaultData)

  /**
   * 组合所有子模块的数据
   */
  const data: ResumeData = {
    get header() { return headerStore.header.value },
    get sectionOrder() { return sectionsStore.sectionOrder.value },
    get education() { return educationStore.education.value },
    get skills() { return skillsStore.skills.value },
    get experiences() { return experiencesStore.experiences.value },
    get projects() { return projectsStore.projects.value },
    get customSections() { return sectionsStore.customSections.value },
  }

  /**
   * 重置所有数据到默认状态
   */
  function resetToDefault() {
    headerStore.resetHeader()
    educationStore.resetEducation()
    skillsStore.resetSkills()
    experiencesStore.resetExperiences()
    projectsStore.resetProjects()
    sectionsStore.resetSections()
  }

  return {
    data,
    ...headerStore,
    ...educationStore,
    ...skillsStore,
    ...experiencesStore,
    ...projectsStore,
    ...sectionsStore,
    resetToDefault,
  }
})
