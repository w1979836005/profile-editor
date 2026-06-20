import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  ResumeData,
  Education,
  Skill,
  Experience,
  Project,
  CustomField,
  FieldType,
} from '@/types/resume'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function getDefaultData(): ResumeData {
  return {
    header: {
      name: '王淼',
      phone: '18474314498',
      email: '1979836005@qq.com',
      status: '应届毕业生',
      title: '全栈开发工程师',
      photo: '',
    },
    sectionOrder: [
      { id: 'education', type: 'education' },
      { id: 'skills', type: 'skills' },
      { id: 'experiences', type: 'experiences' },
      { id: 'projects', type: 'projects' },
    ],
    education: [
      {
        id: generateId(),
        school: '吉首大学',
        major: '软件工程 本科',
        period: '2022-09 ~ 2026-07',
        college: '计算机科学与工程学院（国家一流本科专业建设点）',
        awards: '证书与荣誉：蓝桥杯 C++ B组 省二等奖，英语 CET-4',
      },
    ],
    skills: [
      { id: generateId(), label: '语言基础', content: '熟悉 HTML、CSS（Flex、Grid、响应式布局）、JavaScript（闭包、原型链、深浅拷贝）、ES6+（解构赋值、箭头函数、Promise）、TypeScript' },
      { id: generateId(), label: '前端框架', content: '熟悉 Vue、React 前端框架与生态，熟练使用 Vue CLI、Pinia、Vue-router 构建项目' },
      { id: generateId(), label: '组件库', content: '掌握 Naive UI、Element UI、Ant Design Vue、Vant 等主流 UI 组件库，可封装复用组件' },
      { id: generateId(), label: '后端', content: '熟悉 SpringBoot、MyBatis-Plus、FastAPI、Node.js（Express），能独立开发接口' },
      { id: generateId(), label: '数据库', content: '熟悉 MySQL、Redis，具备数据库设计与建模能力' },
      { id: generateId(), label: '自动化', content: '熟悉 Ascript、WDA、OpenCV（图像预处理、模板匹配、边缘检测）、OCR 文字识别' },
      { id: generateId(), label: '团队协作', content: '熟悉 Git 分支管理与团队协作流程，常用 git remote、git checkout -b、git branch、git merge 等命令，有团队开发经验' },
      { id: generateId(), label: '学习习惯', content: '个人 CSDN 博客分享代码笔记 70+ 篇，主页访问量超 5 万+' },
      { id: generateId(), label: 'AI 开发能力', content: '熟练使用 Claude Code、Codex、v0、Cline 等 AI 辅助工具生成代码，提升开发效率' },
    ],
    experiences: [
      {
        id: generateId(),
        company: '福州东君网络科技有限公司',
        role: '全栈开发实习生',
        period: '2026.04 ~ 2026.06',
        description: '<b>多设备集群自动化调度系统</b> — <b>独立从零到一</b>设计并开发，涵盖<b>订单系统、任务调度中心、账户资源管理系统、设备执行引擎</b>共 <b>4 个子系统</b>，实现了从业务接入、集群调度、设备自动执行到数据回写与账单管理的<b>完整业务闭环</b>',
        techStack: 'SpringBoot · MyBatis-Plus · FastAPI · Vue · Ant Design Vue · MySQL · Ascript · WDA · OCR · OpenCV',
        highlights: [
          '<b>独立完成</b>系统架构设计，将业务拆分为<b>4 个模块</b>并设计模块间串联流程（订单系统 → 任务调度中心 → 查询账户资源池并分配 → 下发至设备执行引擎 → 读取流程模板 → 驱动<b>多台设备</b>自动执行 → 结果回写至账户资源管理系统），各模块<b>解耦合理、职责明确</b>',
          '使用 <b>SpringBoot + MyBatis-Plus</b> 开发后端核心服务：订单系统管理订单<b>全生命周期</b>流转（创建 → 分配 → 执行 → 完成/异常）；任务调度中心基于<b>数据库行级锁</b>实现账户与设备的<b>并发分配</b>（账户表增加执行标记字段、设备表增加状态字段），配合<b>分配算法</b>（负载均衡/过滤规则）与<b>异常重试机制</b>确保多任务场景下资源不冲突，并内置<b>模板流程编排</b>功能，支持在线制作编辑及<b>多种执行模式</b>（线性执行 / 条件分支）',
          '开发账户资源管理系统，管理账户资源池的可用状态与额度，对外提供查询、锁定与回写接口，负责<b>出账管理</b>与<b>账单回写</b>（通过<b>幂等</b>设计保证数据准确）；使用 <b>Vue + Ant Design Vue</b> 搭建各模块的管理后台界面',
          '<b>独立完成</b> <b>MySQL 数据库设计</b>，根据业务场景建模，合理设计表结构与索引，确保多任务并发场景下账户资源的<b>数据一致性</b>',
          '使用 <b>FastAPI + Ascript + WDA</b> 开发设备执行引擎，兼具<b>模板制作与任务执行</b>能力，结合 <b>OpenCV</b>（图像预处理、模板匹配、边缘检测、找色）与 <b>OCR 文字识别</b>技术实现自动化操作，驱动多台设备执行任务，实现<b>端到端的自动化执行链路</b>',
        ],
      },
      {
        id: generateId(),
        company: '未来未科技公司',
        role: '前端开发实习生',
        period: '2025.09 ~ 2026.01',
        description: '<b>回声校园小程序</b> — 一款专为校园打造的综合性社交平台小程序，实现了发布闲置物品、求购需求、求助问答及分享个人生活等多种功能，也可以对帖子进行点赞和评论，对帖主进行关注，促进了校园内部的交流与互动',
        techStack: 'UniApp + Vue2 + Sass + Vue-Router + Axios + Vuex + Vant',
        highlights: [
          '实现搭子圈功能的静态页面设计与交互实现。引入<b>防抖和节流</b>技术，优化用户交互响应，提升页面操作的流畅性。通过 <b>Vant</b> 完成复杂组件弹窗对话框的设计，并优化了组件的<b>重用性与扩展性</b>',
          '基于 <b>rpx、百分比布局、Flex</b> 等布局方式进行页面布局，以兼容不同分辨率屏幕机型的<b>自适应效果</b>',
          '采用 <b>uni-virtual-list 虚拟滚动</b>技术来处理首页帖子信息的展示，实现了页面的<b>无限滚动</b>，显著提高了页面加载速度和滚动流畅度，将页面加载时间缩短了<b>40%</b>',
        ],
      },
      {
        id: generateId(),
        company: '对外经济贸易大学',
        role: 'C++ 线上授课教师',
        period: '2023.05 ~ 2023.06',
        description: '为对外经济贸易大学管理专业 <b>50 人</b>班级，进行为期<b>两周</b> C++ 课程授课，内容包括 C++ 基础语法、基础 STL 库、基础数据结构、面向对象等，独立备课并完成全部授课任务',
        techStack: '',
        highlights: [],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: 'GOJ 在线刷题平台',
        period: '2025-09 ~ 至今',
        description: '一款集<b>在线判题</b>、刷题、打卡于一体的评测平台，系统根据预设的题目与测试用例对用户提交的代码进行评测；自主实现了<b>代码沙箱</b>，并将其<b>抽离为独立服务</b>，通过<b>内部预置密钥</b>（类似 API Key）的鉴权方式供其他服务调用。',
        techStack: 'SpringBoot + MyBatis-Plus + Redis + Vue3 + Naive UI + TailwindCSS + Pinia + Vue-router + ECharts + Axios + Monaco Editor + Bytemd',
        highlights: [
          '<b>后端：</b>自主实现<b>代码沙箱</b>，支持<b>多语言</b>代码判题；将沙箱<b>抽离为独立服务</b>，采用<b>内部预置密钥</b>（类似 API Key）的鉴权方式，调用方需持有系统预先写入的密钥才能访问，实现了服务间的<b>安全隔离与解耦</b>',
          '<b>前端：</b>基于 <b>Vite</b> 整合 Monaco Editor 并封装<b>可复用组件</b>，支持<b>多语言高亮</b>；选用 Bytemd 封装 Markdown 编辑器，实现题目与题解的富文本编辑；使用 openapi-typescript-codegen 根据 Swagger 文档<b>自动生成</b> API 调用代码',
          '<b>工程化：</b>基于 Vue3 + Naive UI，使用 Claude Code、Cline 等 AI 工具快速搭建在线做题、题目检索、提交列表、用户登录等页面；使用 <b>TypeScript + Prettier + ESLint</b> 保证代码规范',
        ],
      },
    ],
    customSections: [],
  }
}

export const useResumeStore = defineStore('resume', () => {
  const data = ref<ResumeData>(getDefaultData())

  function updateHeader(header: Partial<ResumeData['header']>) {
    Object.assign(data.value.header, header)
  }

  function addEducation() {
    data.value.education.push({
      id: generateId(),
      school: '',
      major: '',
      period: '',
      college: '',
      awards: '',
    })
  }

  function removeEducation(id: string) {
    data.value.education = data.value.education.filter((e) => e.id !== id)
  }

  function updateEducation(id: string, updates: Partial<Omit<Education, 'id'>>) {
    const item = data.value.education.find((e) => e.id === id)
    if (item) Object.assign(item, updates)
  }

  function addSkill() {
    data.value.skills.push({ id: generateId(), label: '', content: '' })
  }

  function removeSkill(id: string) {
    data.value.skills = data.value.skills.filter((s) => s.id !== id)
  }

  function updateSkill(id: string, updates: Partial<Omit<Skill, 'id'>>) {
    const item = data.value.skills.find((s) => s.id === id)
    if (item) Object.assign(item, updates)
  }

  function addExperience() {
    data.value.experiences.push({
      id: generateId(),
      company: '',
      role: '',
      period: '',
      description: '',
      techStack: '',
      highlights: [],
    })
  }

  function removeExperience(id: string) {
    data.value.experiences = data.value.experiences.filter((e) => e.id !== id)
  }

  function updateExperience(id: string, updates: Partial<Omit<Experience, 'id'>>) {
    const item = data.value.experiences.find((e) => e.id === id)
    if (item) Object.assign(item, updates)
  }

  function addExperienceHighlight(expId: string) {
    const exp = data.value.experiences.find((e) => e.id === expId)
    if (exp) exp.highlights.push('')
  }

  function removeExperienceHighlight(expId: string, index: number) {
    const exp = data.value.experiences.find((e) => e.id === expId)
    if (exp) exp.highlights.splice(index, 1)
  }

  function updateExperienceHighlight(expId: string, index: number, value: string) {
    const exp = data.value.experiences.find((e) => e.id === expId)
    if (exp) exp.highlights[index] = value
  }

  function addProject() {
    data.value.projects.push({
      id: generateId(),
      name: '',
      period: '',
      description: '',
      techStack: '',
      highlights: [],
    })
  }

  function removeProject(id: string) {
    data.value.projects = data.value.projects.filter((p) => p.id !== id)
  }

  function updateProject(id: string, updates: Partial<Omit<Project, 'id'>>) {
    const item = data.value.projects.find((p) => p.id === id)
    if (item) Object.assign(item, updates)
  }

  function addProjectHighlight(projId: string) {
    const proj = data.value.projects.find((p) => p.id === projId)
    if (proj) proj.highlights.push('')
  }

  function removeProjectHighlight(projId: string, index: number) {
    const proj = data.value.projects.find((p) => p.id === projId)
    if (proj) proj.highlights.splice(index, 1)
  }

  function updateProjectHighlight(projId: string, index: number, value: string) {
    const proj = data.value.projects.find((p) => p.id === projId)
    if (proj) proj.highlights[index] = value
  }

  function resetToDefault() {
    data.value = getDefaultData()
  }

  // ========== 板块排序 ==========

  /**
   * 交换板块位置
   * @param fromIndex - 起始索引
   * @param toIndex - 目标索引
   */
  function reorderSections(fromIndex: number, toIndex: number) {
    const order = data.value.sectionOrder
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
    data.value.customSections.push({
      id,
      title,
      fields: [{ id: generateId(), type: 'text', label: '内容', value: '' }],
    })
    data.value.sectionOrder.push({ id, type: 'custom' })
  }

  /**
   * 删除自定义板块
   * @param id - 板块ID
   */
  function removeCustomSection(id: string) {
    data.value.customSections = data.value.customSections.filter((s) => s.id !== id)
    data.value.sectionOrder = data.value.sectionOrder.filter((s) => s.id !== id)
  }

  /**
   * 更新自定义板块标题
   * @param id - 板块ID
   * @param title - 新标题
   */
  function updateCustomSectionTitle(id: string, title: string) {
    const section = data.value.customSections.find((s) => s.id === id)
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
    const section = data.value.customSections.find((s) => s.id === sectionId)
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
    const section = data.value.customSections.find((s) => s.id === sectionId)
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
    const section = data.value.customSections.find((s) => s.id === sectionId)
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
    const section = data.value.customSections.find((s) => s.id === sectionId)
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
    const section = data.value.customSections.find((s) => s.id === sectionId)
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
    const section = data.value.customSections.find((s) => s.id === sectionId)
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
    const section = data.value.customSections.find((s) => s.id === sectionId)
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
    const section = data.value.customSections.find((s) => s.id === sectionId)
    if (section) {
      const field = section.fields.find((f) => f.id === fieldId)
      if (field && field.type === 'list') {
        field.items[index] = value
      }
    }
  }

  return {
    data,
    updateHeader,
    addEducation,
    removeEducation,
    updateEducation,
    addSkill,
    removeSkill,
    updateSkill,
    addExperience,
    removeExperience,
    updateExperience,
    addExperienceHighlight,
    removeExperienceHighlight,
    updateExperienceHighlight,
    addProject,
    removeProject,
    updateProject,
    addProjectHighlight,
    removeProjectHighlight,
    updateProjectHighlight,
    resetToDefault,
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
  }
})
