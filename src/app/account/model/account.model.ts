import GuestNotificationSettings from "../../shared/models/guest-notification-settings.model";
import HostNotificationSettings from "../../shared/models/host-notification-settings.model";

export interface Account {
    id?: number,
    email: string,
    password: string,
    name: string,
    surname: string,
    address: string,
    phoneNumber: string,
    verified?: boolean,
    role: string,
    notificationsEnabled?: boolean,
    blocked?: boolean,
    cancelCount?: number,
    guestNotificationSettings?: GuestNotificationSettings,
    hostNotificationSettings?: HostNotificationSettings,
    averageRating?: number,
}
