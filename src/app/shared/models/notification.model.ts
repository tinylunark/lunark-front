export interface Notification {
    id: number;
    text: string;
    type: string;
    date: Date;
    read: boolean;
}

export interface UnreadNotificationCount {
    unreadNotificationCount: number;
}

export function isNotification(arg: Notification | UnreadNotificationCount): arg is Notification {
    return 'text' in arg;
}

export function isUnreadNotificationCount(arg: Notification | UnreadNotificationCount): arg is UnreadNotificationCount {
    return 'unreadNotificationCount' in arg;
}