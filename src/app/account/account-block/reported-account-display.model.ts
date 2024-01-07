import { Profile } from '../../shared/models/profile.model';

export class ReportedAccountDisplay {
  id: number;
  date: Date;
  reporter: Profile;
  reported: Profile;
  reason: string;
}
