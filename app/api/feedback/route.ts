import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { FeedbackType } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const feedback = await req.json();
    
    // 数据验证
    if (!feedback.content?.trim()) {
      return NextResponse.json(
        { error: '反馈内容不能为空' },
        { status: 400 }
      );
    }

    // 插入数据到 Supabase
    const { data, error } = await supabase
      .from('feedback')
      .insert([
        {
          content: feedback.content.trim(),
          user_name: feedback.userName?.trim() || null,
          page_url: feedback.pageUrl || '/',
        }
      ])
      .select();

    if (error) {
      console.error('Supabase 错误:', error);
      throw error;
    }
    
    return NextResponse.json({ 
      success: true, 
      data,
      message: '反馈提交成功！'
    });
  } catch (error) {
    console.error('保存反馈时出错:', error);
    return NextResponse.json(
      { error: '保存反馈失败，请稍后重试' },
      { status: 500 }
    );
  }
} 

// 获取反馈列表（可选）
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    const { data, error, count } = await supabase
      .from('feedback')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      data,
      pagination: {
        total: count,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize)
      }
    });
  } catch (error) {
    console.error('获取反馈列表失败:', error);
    return NextResponse.json(
      { error: '获取反馈列表失败' },
      { status: 500 }
    );
  }
} 