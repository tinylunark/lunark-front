import Location from "./location.model";
import PropertyAvailabilityEntry from "./property-availability-entry.model";
import { PropertyType } from "./property.model";

export default interface PropertyRequest {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  address: Location;
  description: string;
  type: PropertyType | null;
  availabilityEntries: PropertyAvailabilityEntry[];
  cancellationDeadline: number;
  pricingMode: string;
  autoApproveEnabled: boolean;
  minGuests: number;
  maxGuests: number;
  amenityIds: number[];
  hostId: number;
}