import {PropertyType} from "../shared/models/property.model";

export default interface PropertiesSearchDto {
  location?: string;
  guestNumber?: number;
  startDate?: Date;
  endDate?: Date;
  minPrice?: number;
  maxPrice?: number;
  type?: PropertyType;
  amenityIds?: number[];
}
