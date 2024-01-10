import GuestNotificationSettings from "./guest-notification-settings.model";
import HostNotificationSettings from "./host-notification-settings.model";

export interface Profile {
  id?: number;
  email?: string;
  name?: string;
  surname?: string;
  address?: string;
  phoneNumber?: string;
  role?: string;
  verified?: boolean;
  blocked?: boolean;
  cancelCount?: number;
  notificationsEnabled?: boolean;
  guestNotificationSettings?: GuestNotificationSettings,
  hostNotificationSettings?: HostNotificationSettings,
}
