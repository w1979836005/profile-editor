/**
 * UI 状态 Store
 * 管理界面相关的状态，如板块折叠状态
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  /**
   * 板块折叠状态
   * key 为板块 ID，value 为是否展开
   */
  const expandedSections = ref<Record<string, boolean>>({})

  /**
   * 切换板块折叠状态
   * @param sectionId - 板块 ID
   */
  function toggleSection(sectionId: string) {
    expandedSections.value[sectionId] = !expandedSections.value[sectionId]
  }

  /**
   * 设置板块折叠状态
   * @param sectionId - 板块 ID
   * @param expanded - 是否展开
   */
  function setSectionExpanded(sectionId: string, expanded: boolean) {
    expandedSections.value[sectionId] = expanded
  }

  /**
   * 获取板块是否展开
   * @param sectionId - 板块 ID
   * @param defaultExpanded - 默认是否展开
   * @returns 是否展开
   */
  function isSectionExpanded(sectionId: string, defaultExpanded: boolean = false): boolean {
    if (expandedSections.value[sectionId] === undefined) {
      return defaultExpanded
    }
    return expandedSections.value[sectionId]
  }

  /**
   * 全部折叠
   */
  function collapseAll() {
    Object.keys(expandedSections.value).forEach((key) => {
      expandedSections.value[key] = false
    })
  }

  /**
   * 全部展开
   */
  function expandAll() {
    Object.keys(expandedSections.value).forEach((key) => {
      expandedSections.value[key] = true
    })
  }

  return {
    expandedSections,
    toggleSection,
    setSectionExpanded,
    isSectionExpanded,
    collapseAll,
    expandAll,
  }
}, {
  persist: true,
})
