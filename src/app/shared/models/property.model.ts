import Location from "./location.model";

export interface Property {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  images: {
    id: number,
    mimeType: string
  }[];
  description: string;
  type: PropertyType;
  averageRating?: number;
  pricePerNight?: number;
}

export enum PropertyType {
  Hut = "HUT",
  Apartment = "APARTMENT"
}
