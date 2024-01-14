import { ReviewReport } from "../models/review-report.model";

export enum ApiPaths {
  Properties = 'properties',
  UnapprovedProperties = 'properties/unapproved',
  UnapprovedReviews = 'unapproved',
  MyProperties = 'my-properties',
  ApproveProperty = 'approve',
  Amenities = 'amenities',
  Profile = 'accounts',
  LogIn = 'auth/login',
  LogOut = 'auth/logout',
  Reservations = 'reservations',
  IncomingReservations = 'incoming-reservations',
  AcceptedReservations = 'accepted-reservations',
  Verification = 'accounts/verify',
  Reviews = 'reviews',
  ApproveReview = 'approve',
  ReviewReports = 'reports/reviews',
  CommentsGrades = 'reports/reviews',
  ReportedAccounts = 'reports/accounts',
  HostReportEligibility = 'reports/accounts/host-report-eligibility',
  Reports = 'reports'
}
