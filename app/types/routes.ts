export type RepairStation = {
  id: string;
  name: string;
  location: string;
  contact: string;
  rating: string;
  reviews: {
    text: string;
    date: string;
  }[];
}; 