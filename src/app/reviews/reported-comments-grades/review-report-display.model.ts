import { Profile } from '../../shared/models/profile.model';
import { Review } from '../../shared/models/review.model';

export class ReviewReportDisplay {
  id: number;
  date: Date;
  reporter: Profile;
  review: Review;
  reviewType: string;
}
