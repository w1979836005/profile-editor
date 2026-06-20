/**
 * 基本信息 Store
 */
import { ref } from 'vue'
import type { HeaderInfo } from '@/types/resume'

/**
 * 创建基本信息 Store
 * @param getDefaultData - 获取默认数据函数
 * @returns 基本信息相关的状态和方法
 */
export function createHeaderStore(getDefaultData: () => { header: HeaderInfo }) {
  const header = ref<HeaderInfo>(getDefaultData().header)

  /**
   * 更新基本信息
   * @param updates - 要更新的字段
   */
  function updateHeader(updates: Partial<HeaderInfo>) {
    Object.assign(header.value, updates)
  }

  /**
   * 重置基本信息
   */
  function resetHeader() {
    header.value = getDefaultData().header
  }

  return {
    header,
    updateHeader,
    resetHeader,
  }
}
