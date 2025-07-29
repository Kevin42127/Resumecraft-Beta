export interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  category: 'general' | 'resume-review' | 'portfolio' | 'career-advice' | 'interview'
  likes: number
  comments: ForumComment[]
  createdAt: string
  updatedAt: string
}

export interface ForumComment {
  id: string
  postId: string
  content: string
  author: string
  likes: number
  createdAt: string
}

export interface CreatePostRequest {
  title: string
  content: string
  author: string
  category: ForumPost['category']
}

export interface CreateCommentRequest {
  postId: string
  content: string
  author: string
}

export interface ForumStats {
  totalPosts: number
  totalComments: number
  todayPosts: number
  todayComments: number
} 