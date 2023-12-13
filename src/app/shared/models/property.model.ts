import Location from "./location.model";
import PropertyAvailabilityEntry from "./property-availability-entry.model";

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
  availabilityEntries: PropertyAvailabilityEntry[];
  cancellationDeadline: number;
  pricingMode: string;
  autoApproveEnabled: boolean;
}

export enum PropertyType {
  Hut = "HUT",
  Apartment = "APARTMENT"
}
