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
  cancelCount?: number,
}
