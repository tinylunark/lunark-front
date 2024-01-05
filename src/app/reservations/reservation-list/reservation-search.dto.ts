import {ReservationStatus} from "../../shared/models/reservation.model";

export default interface ReservationSearchDto {
  propertyName?: string;
  startDate?: string;
  endDate?: string;
  status?: ReservationStatus;
}
