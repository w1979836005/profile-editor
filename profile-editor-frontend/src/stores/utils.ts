/**
 * 工具函数
 */

/**
 * 生成唯一ID
 * @returns 唯一标识符
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
