import { Property } from "./property.model";
import { Profile } from "./profile.model";

export interface Reservation {
  id: number;
  startDate: Date;
  endDate: Date;
  numberOfGuests: number;
  status: ReservationStatus;
  price: number;
  property: Property;
  guest: Profile;
  propertyId: number;
  propertyName: string;
  guestId: number;
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED'
}

