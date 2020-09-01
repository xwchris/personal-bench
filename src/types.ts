export interface Token {
  id?: string
  token: string
  create_time: string
}

export interface Article {
  id?: string
  issueId?: string,
  title: string
  abstract: string
  content: string
  view_count?: number
  create_time?: string
  cover: string
}

export interface Essay {
  id?: string
  content: string
  create_time: string
}

export interface Project {
  id?: string
  html_url: string
  full_name: string
  description: string
  forks_count: number
  stargazers_count: number
  language: string
}

export interface Photo {
  id?: string
  fileId: string
  url?: string
  description: string
  shooting_time: string
  shooting_place: string
}

export interface TimelineDateActivity {
  id: string
  type: string
  text: string
  url: string
}

export interface TimelineDate {
  id: string
  date: string
  data: TimelineDateActivity[]
}

export interface Timeline {
  id?: string
  month: string
  data: TimelineDate[]
}


export interface File {
  id?: string
  filename: string
  mimetype: string
  encoding?: string
}


export interface Issue {
  id?: string
  number: number
  title: string
  body: string
}
