'use client';

import { Suspense } from 'react'
import BikeList from '@/components/BikeList'
import { ErrorBoundary } from 'react-error-boundary'
import UploadForm from '@/components/UploadForm';

function ErrorFallback({error}: {error: Error}) {
  return (
    <div className="text-red-500 p-4 border border-red-300 rounded">
      <h2 className="text-lg font-bold">出错了</h2>
      <p>{error.message}</p>
    </div>
  )
}

export default function ElectricBikesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">二手电动车交易平台</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div>
            <h2 className="text-2xl font-semibold mb-4">上传您的电动车</h2>
            <Suspense fallback={<div>加载中...</div>}>
              <UploadForm />
            </Suspense>
          </div>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div>
            <h2 className="text-2xl font-semibold mb-4">可用的电动车</h2>
            <Suspense fallback={<div>加载中...</div>}>
              <BikeList />
            </Suspense>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  )
}
