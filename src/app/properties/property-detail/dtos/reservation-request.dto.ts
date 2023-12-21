export default interface ReservationRequestDto {
  propertyId: number;
  startDate: Date;
  endDate: Date;
  numberOfGuests: number;
}
