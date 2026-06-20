/**
 * 板块排序和自定义板块 Store
 */
import { ref } from 'vue'
import type { SectionOrder, CustomSection, CustomField, FieldType } from '@/types/resume'
import { generateId } from './utils'

/**
 * 创建板块排序 Store
 * @param getDefaultData - 获取默认数据函数
 * @returns 板块排序和自定义板块相关的状态和方法
 */
export function createSectionsStore(
  getDefaultData: () => { sectionOrder: SectionOrder[]; customSections: CustomSection[] },
) {
  const sectionOrder = ref<SectionOrder[]>(getDefaultData().sectionOrder)
  const customSections = ref<CustomSection[]>(getDefaultData().customSections)

  // ========== 板块排序 ==========

  /**
   * 交换板块位置
   * @param fromIndex - 起始索引
   * @param toIndex - 目标索引
   */
  function reorderSections(fromIndex: number, toIndex: number) {
    const order = sectionOrder.value
    const [removed] = order.splice(fromIndex, 1)
    if (removed) {
      order.splice(toIndex, 0, removed)
    }
  }

  // ========== 自定义板块 CRUD ==========

  /**
   * 添加自定义板块
   * @param title - 板块标题
   */
  function addCustomSection(title: string) {
    const id = generateId()
    customSections.value.push({
      id,
      title,
      fields: [{ id: generateId(), type: 'text', label: '内容', value: '' }],
    })
    sectionOrder.value.push({ id, type: 'custom' })
  }

  /**
   * 删除自定义板块
   * @param id - 板块ID
   */
  function removeCustomSection(id: string) {
    customSections.value = customSections.value.filter((s) => s.id !== id)
    sectionOrder.value = sectionOrder.value.filter((s) => s.id !== id)
  }

  /**
   * 更新自定义板块标题
   * @param id - 板块ID
   * @param title - 新标题
   */
  function updateCustomSectionTitle(id: string, title: string) {
    const section = customSections.value.find((s) => s.id === id)
    if (section) section.title = title
  }

  // ========== 自定义字段 CRUD ==========

  /**
   * 创建默认字段
   * @param type - 字段类型
   * @returns 新字段对象
   */
  function createDefaultField(type: FieldType): CustomField {
    const id = generateId()
    const label = '新字段'
    switch (type) {
      case 'text':
        return { id, type, label, value: '' }
      case 'richtext':
        return { id, type, label, value: '' }
      case 'list':
        return { id, type, label, items: [''] }
      case 'period':
        return { id, type, label, value: '' }
      case 'link':
        return { id, type, label, url: '', text: '' }
    }
  }

  /**
   * 添加自定义字段
   * @param sectionId - 板块ID
   * @param type - 字段类型
   */
  function addCustomField(sectionId: string, type: FieldType) {
    const section = customSections.value.find((s) => s.id === sectionId)
    if (section) {
      section.fields.push(createDefaultField(type))
    }
  }

  /**
   * 删除自定义字段
   * @param sectionId - 板块ID
   * @param fieldId - 字段ID
   */
  function removeCustomField(sectionId: string, fieldId: string) {
    const section = customSections.value.find((s) => s.id === sectionId)
    if (section) {
      section.fields = section.fields.filter((f) => f.id !== fieldId)
    }
  }

  /**
   * 更新自定义字段标签
   * @param sectionId - 板块ID
   * @param fieldId - 字段ID
   * @param label - 新标签
   */
  function updateCustomFieldLabel(sectionId: string, fieldId: string, label: string) {
    const section = customSections.value.find((s) => s.id === sectionId)
    if (section) {
      const field = section.fields.find((f) => f.id === fieldId)
      if (field) field.label = label
    }
  }

  /**
   * 更新自定义字段值（text/richtext/period）
   * @param sectionId - 板块ID
   * @param fieldId - 字段ID
   * @param value - 新值
   */
  function updateCustomFieldValue(sectionId: string, fieldId: string, value: string) {
    const section = customSections.value.find((s) => s.id === sectionId)
    if (section) {
      const field = section.fields.find((f) => f.id === fieldId)
      if (field && (field.type === 'text' || field.type === 'richtext' || field.type === 'period')) {
        field.value = value
      }
    }
  }

  /**
   * 更新链接字段
   * @param sectionId - 板块ID
   * @param fieldId - 字段ID
   * @param url - 链接地址
   * @param text - 显示文本
   */
  function updateCustomFieldLink(sectionId: string, fieldId: string, url: string, text: string) {
    const section = customSections.value.find((s) => s.id === sectionId)
    if (section) {
      const field = section.fields.find((f) => f.id === fieldId)
      if (field && field.type === 'link') {
        field.url = url
        field.text = text
      }
    }
  }

  /**
   * 添加列表项
   * @param sectionId - 板块ID
   * @param fieldId - 字段ID
   */
  function addCustomListItem(sectionId: string, fieldId: string) {
    const section = customSections.value.find((s) => s.id === sectionId)
    if (section) {
      const field = section.fields.find((f) => f.id === fieldId)
      if (field && field.type === 'list') {
        field.items.push('')
      }
    }
  }

  /**
   * 删除列表项
   * @param sectionId - 板块ID
   * @param fieldId - 字段ID
   * @param index - 项索引
   */
  function removeCustomListItem(sectionId: string, fieldId: string, index: number) {
    const section = customSections.value.find((s) => s.id === sectionId)
    if (section) {
      const field = section.fields.find((f) => f.id === fieldId)
      if (field && field.type === 'list') {
        field.items.splice(index, 1)
      }
    }
  }

  /**
   * 更新列表项
   * @param sectionId - 板块ID
   * @param fieldId - 字段ID
   * @param index - 项索引
   * @param value - 新值
   */
  function updateCustomListItem(sectionId: string, fieldId: string, index: number, value: string) {
    const section = customSections.value.find((s) => s.id === sectionId)
    if (section) {
      const field = section.fields.find((f) => f.id === fieldId)
      if (field && field.type === 'list') {
        field.items[index] = value
      }
    }
  }

  /**
   * 重置板块排序和自定义板块
   */
  function resetSections() {
    sectionOrder.value = getDefaultData().sectionOrder
    customSections.value = getDefaultData().customSections
  }

  return {
    sectionOrder,
    customSections,
    reorderSections,
    addCustomSection,
    removeCustomSection,
    updateCustomSectionTitle,
    addCustomField,
    removeCustomField,
    updateCustomFieldLabel,
    updateCustomFieldValue,
    updateCustomFieldLink,
    addCustomListItem,
    removeCustomListItem,
    updateCustomListItem,
    resetSections,
  }
}
