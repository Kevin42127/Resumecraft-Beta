'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Clock, 
  User, 
  ThumbsUp, 
  MessageCircle,
  Eye,
  Calendar
} from 'lucide-react'
import { ForumPost } from '@/types/forum'
import ForumPostDetail from './ForumPostDetail'

interface ForumPostListProps {
  posts: ForumPost[]
  onPostUpdate: () => void
}

const categoryIcons = {
  general: '💬',
  'resume-review': '📄',
  portfolio: '🎨',
  'career-advice': '💼',
  interview: '🤝',
}

const categoryLabels = {
  general: '一般討論',
  'resume-review': '履歷檢視',
  portfolio: '作品集分享',
  'career-advice': '職涯建議',
  interview: '面試經驗',
}

export default function ForumPostList({ posts, onPostUpdate }: ForumPostListProps) {
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return '剛剛'
    } else if (diffInHours < 24) {
      return `${diffInHours}小時前`
    } else {
      return date.toLocaleDateString('zh-TW')
    }
  }

  const handlePostClick = (post: ForumPost) => {
    setSelectedPost(post)
  }

  const handleCloseDetail = () => {
    setSelectedPost(null)
    onPostUpdate()
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">還沒有討論</h3>
        <p className="text-gray-600">成為第一個發文的人吧！</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{categoryIcons[post.category]}</span>
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                    {categoryLabels[post.category]}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments.length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>0</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <ForumPostDetail
          post={selectedPost}
          onClose={handleCloseDetail}
        />
      )}
    </>
  )
} 