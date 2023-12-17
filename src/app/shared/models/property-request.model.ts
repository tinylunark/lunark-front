import Location from "./location.model";
import PropertyAvailabilityEntry from "./property-availability-entry.model";
import { PropertyType } from "./property.model";

export default interface ProeprtyRequest {
  id?: number;
  name: string;
  latitude: number | null;
  longitude: number | null;
  address: Location;
  description: string;
  type: PropertyType | null;
  availabilityEntries: PropertyAvailabilityEntry[];
  cancellationDeadline: number | null;
  pricingMode: string;
  autoApproveEnabled: boolean;
  minGuests: number;
  maxGuests: number;
  amenityIds: number[];
}