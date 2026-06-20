/**
 * 项目经历 Store
 */
import { ref } from 'vue'
import type { Project } from '@/types/resume'
import { generateId } from './utils'

/**
 * 创建项目经历 Store
 * @param getDefaultData - 获取默认数据函数
 * @returns 项目经历相关的状态和方法
 */
export function createProjectsStore(getDefaultData: () => { projects: Project[] }) {
  const projects = ref<Project[]>(getDefaultData().projects)

  /**
   * 添加项目经历
   */
  function addProject() {
    projects.value.push({
      id: generateId(),
      name: '',
      period: '',
      description: '',
      techStack: '',
      highlights: [],
    })
  }

  /**
   * 删除项目经历
   * @param id - 项目经历ID
   */
  function removeProject(id: string) {
    projects.value = projects.value.filter((p) => p.id !== id)
  }

  /**
   * 更新项目经历
   * @param id - 项目经历ID
   * @param updates - 要更新的字段
   */
  function updateProject(id: string, updates: Partial<Omit<Project, 'id'>>) {
    const item = projects.value.find((p) => p.id === id)
    if (item) Object.assign(item, updates)
  }

  /**
   * 添加项目亮点
   * @param projId - 项目经历ID
   */
  function addProjectHighlight(projId: string) {
    const proj = projects.value.find((p) => p.id === projId)
    if (proj) proj.highlights.push('')
  }

  /**
   * 删除项目亮点
   * @param projId - 项目经历ID
   * @param index - 亮点索引
   */
  function removeProjectHighlight(projId: string, index: number) {
    const proj = projects.value.find((p) => p.id === projId)
    if (proj) proj.highlights.splice(index, 1)
  }

  /**
   * 更新项目亮点
   * @param projId - 项目经历ID
   * @param index - 亮点索引
   * @param value - 新内容
   */
  function updateProjectHighlight(projId: string, index: number, value: string) {
    const proj = projects.value.find((p) => p.id === projId)
    if (proj) proj.highlights[index] = value
  }

  /**
   * 重置项目经历
   */
  function resetProjects() {
    projects.value = getDefaultData().projects
  }

  return {
    projects,
    addProject,
    removeProject,
    updateProject,
    addProjectHighlight,
    removeProjectHighlight,
    updateProjectHighlight,
    resetProjects,
  }
}
