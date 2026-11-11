export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface InfrastructureReport {
  id: string;
  title: string;
  description: string;
  location: Coordinates;
  category: 'jalan_rusak' | 'banjir' | 'longsor' | 'fasum';
  timestamp: number;
}