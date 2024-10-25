'use client'

import React from 'react'
import { MapPin, User, Battery } from 'lucide-react'
import type { ChargingMaster } from '@/lib/db'

export default function ChargingMasterCard({ master }: { master: ChargingMaster }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">{master.name}</h3>
      <p className="text-gray-600">
        <MapPin className="inline-block w-4 h-4 mr-1" /> 
        位置: {master.location}
      </p>
      <p className="text-gray-600">
        <User className="inline-block w-4 h-4 mr-1" /> 
        联系电话: {master.phone}
      </p>
      <p className="text-gray-600">
        <Battery className="inline-block w-4 h-4 mr-1" /> 
        服务时间: {master.available_time}
      </p>
    </div>
  )
}
