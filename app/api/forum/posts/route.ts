import { NextRequest, NextResponse } from 'next/server'
import { ForumPost, CreatePostRequest } from '@/types/forum'

// 模擬資料庫存儲
let posts: ForumPost[] = []

export async function GET() {
  try {
    // 過濾掉已刪除的討論，按創建時間排序，最新的在前
    const activePosts = posts.filter(post => !post.isDeleted)
    const sortedPosts = activePosts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ posts: sortedPosts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: '獲取討論失敗' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreatePostRequest = await request.json()
    
    // 驗證必要欄位
    if (!body.title?.trim() || !body.content?.trim() || !body.author?.trim()) {
      return NextResponse.json(
        { error: '請填寫所有必要欄位' },
        { status: 400 }
      )
    }

    // 創建新討論
    const newPost: ForumPost = {
      id: Date.now().toString(),
      title: body.title.trim(),
      content: body.content.trim(),
      author: body.author.trim(),
      category: body.category,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    posts.unshift(newPost) // 添加到開頭

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: '創建討論失敗' },
      { status: 500 }
    )
  }
} 