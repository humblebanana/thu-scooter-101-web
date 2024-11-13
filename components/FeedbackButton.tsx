'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { FeedbackType } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { MessageSquarePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          page: window.location.pathname,
          rating: formData.rating,
          improvements: formData.improvements,
          suggestions: formData.suggestions
        })

      if (error) throw error;

      // 成功提交后显示感谢信息
      toast({
        title: "感谢您的反馈！",
        description: "您的意见对我们非常重要",
        duration: 3000,
      })

      // 重置表单
      setFormData({ rating: 5, improvements: '', suggestions: '' });
      
      // 延迟关闭对话框
      setTimeout(() => setIsOpen(false), 2000);
    } catch (error) {
      console.error('提交反馈时出错:', error);
      toast({
        title: "提交失败",
        description: "抱歉，提交反馈时出现错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-16 right-8 z-50">
      <Button
        variant="default"
        size="lg"
        className="fixed bottom-8 right-8 bg-gradient-to-r from-[#4E2A84] to-[#6B3DAD] text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquarePlus className="w-4 h-4 md:mr-2" />
        <span className="hidden md:inline">反馈｜Feedback</span>
        <span className="md:hidden ml-1">Feedback</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              帮助我们变得更好
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-base font-medium">
                您对当前页面的满意度如何？
              </label>
              <div className="px-3">
                <Slider
                  value={[formData.rating]}
                  onValueChange={(value: number[]) => setFormData({ ...formData, rating: value[0] })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>不满意</span>
                  <span className="font-medium">{formData.rating}/10</span>
                  <span>非常满意</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-base">
                您觉得哪些地方需要改进？
              </label>
              <textarea
                value={formData.improvements}
                onChange={(e) =>
                  setFormData({ ...formData, improvements: e.target.value })
                }
                className="w-full min-h-[100px] p-3 rounded-lg border"
                placeholder="如：页面设计、信息准确性、功能实用性等……"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-base">
                您认为需要补充哪些信息？
              </label>
              <textarea
                value={formData.suggestions}
                onChange={(e) =>
                  setFormData({ ...formData, suggestions: e.target.value })
                }
                className="w-full min-h-[100px] p-3 rounded-lg border"
                placeholder="如：推荐的电动车型号、充电桩位置、购买渠道等……"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                取消
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-[#4E2A84] to-[#6B3DAD] text-white">
                提交反馈
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}