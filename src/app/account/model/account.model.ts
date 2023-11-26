export interface Account {
    id?: number,
    email: string,
    password: string,
    name: string,
    surname: string,
    address: string,
    phoneNumber: string,
    verified: boolean,
    role: string,
    notificationsEnabled: boolean,
    blocked: boolean,
}