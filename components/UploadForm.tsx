'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase } from '@/lib/supabase'

export default function UploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // 上传数据到 Supabase
      const { data, error } = await supabase
        .from('feedback')
        .insert([
          {
            title: formData.title,
            price: formData.price,
            description: formData.description,
            // 如果需要保存图片，需要先上传到 storage
            // image_url: imageUrl
          }
        ])

      if (error) throw error

      toast({
        title: "提交成功",
        description: "您的反馈已成功保存",
      })
      setFormData({ title: '', price: '', description: '', image: null })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "提交失败",
        description: "保存反馈时出错，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">标题</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">价格 (元)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">描述</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="image">图片</Label>
        <Input
          id="image"
          name="image"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '上传中...' : '上传电动车信息'}
      </Button>
    </form>
  )
}