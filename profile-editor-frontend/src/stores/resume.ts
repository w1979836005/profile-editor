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

export const useResumeStore = defineStore(
  'resume',
  () => {
    const headerStore = createHeaderStore(getDefaultData)
    const educationStore = createEducationStore(getDefaultData)
    const skillsStore = createSkillsStore(getDefaultData)
    const experiencesStore = createExperiencesStore(getDefaultData)
    const projectsStore = createProjectsStore(getDefaultData)
    const sectionsStore = createSectionsStore(getDefaultData)

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
      header: headerStore.header,
      education: educationStore.education,
      skills: skillsStore.skills,
      experiences: experiencesStore.experiences,
      projects: projectsStore.projects,
      sectionOrder: sectionsStore.sectionOrder,
      customSections: sectionsStore.customSections,

      updateHeader: headerStore.updateHeader,
      addEducation: educationStore.addEducation,
      removeEducation: educationStore.removeEducation,
      updateEducation: educationStore.updateEducation,
      addSkill: skillsStore.addSkill,
      removeSkill: skillsStore.removeSkill,
      updateSkill: skillsStore.updateSkill,
      addExperience: experiencesStore.addExperience,
      removeExperience: experiencesStore.removeExperience,
      updateExperience: experiencesStore.updateExperience,
      addExperienceHighlight: experiencesStore.addExperienceHighlight,
      removeExperienceHighlight: experiencesStore.removeExperienceHighlight,
      updateExperienceHighlight: experiencesStore.updateExperienceHighlight,
      addProject: projectsStore.addProject,
      removeProject: projectsStore.removeProject,
      updateProject: projectsStore.updateProject,
      addProjectHighlight: projectsStore.addProjectHighlight,
      removeProjectHighlight: projectsStore.removeProjectHighlight,
      updateProjectHighlight: projectsStore.updateProjectHighlight,
      reorderSections: sectionsStore.reorderSections,
      addCustomSection: sectionsStore.addCustomSection,
      removeCustomSection: sectionsStore.removeCustomSection,
      updateCustomSectionTitle: sectionsStore.updateCustomSectionTitle,
      addCustomField: sectionsStore.addCustomField,
      removeCustomField: sectionsStore.removeCustomField,
      updateCustomFieldLabel: sectionsStore.updateCustomFieldLabel,
      updateCustomFieldValue: sectionsStore.updateCustomFieldValue,
      updateCustomFieldLink: sectionsStore.updateCustomFieldLink,
      addCustomListItem: sectionsStore.addCustomListItem,
      removeCustomListItem: sectionsStore.removeCustomListItem,
      updateCustomListItem: sectionsStore.updateCustomListItem,
      resetToDefault,
    }
  },
  {
    persist: true,
  },
)
