import Location from "./location.model";
import PropertyAvailabilityEntry from "./property-availability-entry.model";

export interface Property {
  id: number;
  name: string;
  address: Location;
  images: {
    id: number,
    mimeType: string
  }[];
  description: string;
  type: PropertyType | '';
  averageRating?: number;
  pricePerNight?: number;
  availabilityEntries: PropertyAvailabilityEntry[];
  cancellationDeadline: number;
  pricingMode: string;
  autoApproveEnabled: boolean;
  minGuests: number;
  maxGuests: number;
}

export enum PropertyType {
  WholeHouse="WHOLE_HOUSE",
  Room = "ROOM",
  SharedRoom = "SHARED_ROOM"
}
