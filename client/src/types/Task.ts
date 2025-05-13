export interface ChecklistItem {
  text: string
  completed: boolean
}

export interface Task {
  id: string | number
  title: string
  description?: string
  dueDate?: string | null
  completed: boolean
  type: "basic" | "timed" | "checklist"
  items?: ChecklistItem[]
  isOverdue?: boolean
}

export interface RawTask {
  id: string | number
  title: string
  description?: string
  dueDate?: string | null
  completed?: boolean
  type?: string
  items?: any[]
}
