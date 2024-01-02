import { Account } from "../../account/model/account.model";
import Amenity from "./amenity.model";
import Location from "./location.model";
import PropertyAvailabilityEntry from "./property-availability-entry.model";
import PropertyRequest from "./property-request.model";
import { Review } from "./review.model";

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
  amenities: Amenity[];
  maxGuests: number;
  hostId: number;
  reviews?: Review[];
  host?: Account;
}

export enum PropertyType {
  WholeHouse = 'WHOLE_HOUSE',
  Room = 'ROOM',
  SharedRoom = 'SHARED_ROOM'
}

export function convertToPropertyRequest(property: Property): PropertyRequest {
  return {
    id: property.id,
    name: property.name,
    latitude: property.latitude,
    longitude: property.longitude,
    address: property.address,
    description: property.description,
    type: property.type,
    availabilityEntries: property.availabilityEntries,
    cancellationDeadline: property.cancellationDeadline,
    pricingMode: property.pricingMode,
    autoApproveEnabled: property.autoApproveEnabled,
    minGuests: property.minGuests,
    maxGuests: property.maxGuests,
    amenityIds: property.amenities.map(amenity => amenity.id),
    hostId: property.hostId,
  }
}
