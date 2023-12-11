import Location from "./location.model";
import PropertyAvailabilityEntry from "./property-availability-entry.model";

export default interface Property {
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
  pricePerNight: number;
  averageRating: number;
  availabilityEntries: PropertyAvailabilityEntry[];
  cancellationDeadline: number;
  pricingMode: string;
  autoApproveEnabled: boolean;
}
