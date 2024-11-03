'use client';

import React, { useState } from 'react';
import { MessageSquarePlus, X as CloseIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface FeedbackFormData {
  rating: number;
  improvements: string;
  suggestions: string;
}

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>({
    rating: 5,
    improvements: '',
    suggestions: ''
  });
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const feedback = {
      page: pathname,
      rating: formData.rating,
      improvements: formData.improvements,
      suggestions: formData.suggestions,
      timestamp: new Date().toISOString()
    };

    try {
      // 将反馈写入本地文件
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        throw new Error('反馈提交失败');
      }

      // 重置表单并关闭modal
      setFormData({ rating: 5, improvements: '', suggestions: '' });
      setIsOpen(false);
      alert('感谢您的反馈！');
    } catch (error) {
      console.error('提交反馈时出错:', error);
      alert('提交反馈时出现错误，请稍后重试');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-[#4E2A84] to-[#6B3DAD] text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        aria-label="提供反馈"
      >
        <MessageSquarePlus size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[480px] max-w-[90vw] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseIcon size={20} />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-center">帮助我们变得更好</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  您对当前页面的满意度如何？
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`text-2xl transition-colors ${
                        star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  您觉得哪些地方需要改进？
                </label>
                <textarea
                  value={formData.improvements}
                  onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="请具体描述需要改进的地方..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  您认为需要补充哪些信息？
                </label>
                <textarea
                  value={formData.suggestions}
                  onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="请提供您认为所需要补充的信息..."
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:scale-105 transition-all duration-300"
                >
                  提交反馈
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}