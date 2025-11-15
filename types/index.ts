export interface Project {
  name: string;
  location: string;
  price: string;
  builder: string;
}

export interface MarkerType extends Project {
  lat: number;
  lng: number;
}
