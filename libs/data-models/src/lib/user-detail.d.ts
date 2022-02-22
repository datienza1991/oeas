import { User } from './user';

export interface UserDetail extends User {
  code: string;
  email: string;
  isActive: boolean;
  middleName: string;
  lastName: string;
  address: string;
  departmentId: number;
  sectionId: number;
  contactNumber: string;
  user_id: number;
  contactNumberPrefix: string;
  sectionName: string;
  departmentName: string;
  userType: string;
  userTypeId: number
}
