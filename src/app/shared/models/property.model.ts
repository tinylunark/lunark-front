import Location from "./location.model";
import PropertyAvailabilityEntry from "./property-availability-entry.model";

export interface Property {
  id: number;
  name: string;
  address: Location;
  latitude: number;
  longitude: number;
  images: {
    id: number,
    mimeType: string
  }[];
  description: string;
  type: PropertyType | null;
  averageRating?: number;
  pricePerNight?: number;
  availabilityEntries: PropertyAvailabilityEntry[];
  cancellationDeadline: number;
  pricingMode: string;
  autoApproveEnabled: boolean;
  minGuests: number;
  amenityIds: number[];
  maxGuests: number;
  hostId: number;
}

export enum PropertyType {
  WholeHouse = 'WHOLE_HOUSE',
  Room = 'ROOM',
  SharedRoom = 'SHARED_ROOM'
}
