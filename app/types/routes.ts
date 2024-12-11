export interface Review {
  text: string
  date: string
}

export interface RepairStation {
  id: string
  name: string
  location: string
  contact: string
  rating: string
  reviews?: Review[]
}

export interface RepairStationsData {
  zh: {
    repairStations: RepairStation[]
  }
  en: {
    repairStations: RepairStation[]
  }
} 