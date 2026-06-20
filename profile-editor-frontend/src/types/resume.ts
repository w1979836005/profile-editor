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

export interface ResumeData {
  header: HeaderInfo
  education: Education[]
  skills: Skill[]
  experiences: Experience[]
  projects: Project[]
}
