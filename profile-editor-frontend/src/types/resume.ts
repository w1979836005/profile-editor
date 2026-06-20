export interface HeaderInfo {
  name: string
  phone: string
  email: string
  status: string
  title: string
  photo: string
}

export interface Education {
  id: string
  school: string
  major: string
  period: string
  college: string
  awards: string
}

export interface Skill {
  id: string
  label: string
  content: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string
  techStack: string
  highlights: string[]
}

export interface Project {
  id: string
  name: string
  period: string
  description: string
  techStack: string
  highlights: string[]
}

// 自定义字段类型
export type FieldType = 'text' | 'richtext' | 'list' | 'period' | 'link'

// 基础字段接口
export interface BaseField {
  id: string
  type: FieldType
  label: string
}

// 文本字段
export interface TextField extends BaseField {
  type: 'text'
  value: string
}

// 富文本字段
export interface RichTextField extends BaseField {
  type: 'richtext'
  value: string
}

// 列表字段
export interface ListField extends BaseField {
  type: 'list'
  items: string[]
}

// 时间段字段
export interface PeriodField extends BaseField {
  type: 'period'
  value: string
}

// 链接字段
export interface LinkField extends BaseField {
  type: 'link'
  url: string
  text: string
}

// 自定义字段联合类型
export type CustomField = TextField | RichTextField | ListField | PeriodField | LinkField

// 自定义板块
export interface CustomSection {
  id: string
  title: string
  fields: CustomField[]
}

// 板块排序项
export interface SectionOrder {
  id: string
  type: 'education' | 'skills' | 'experiences' | 'projects' | 'custom'
}

export interface ResumeData {
  header: HeaderInfo
  sectionOrder: SectionOrder[]
  education: Education[]
  skills: Skill[]
  experiences: Experience[]
  projects: Project[]
  customSections: CustomSection[]
}
