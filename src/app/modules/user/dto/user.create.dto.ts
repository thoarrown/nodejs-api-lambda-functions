export interface UserCreateDto {
  email: string;
  dateOfBirth: Date;
  name?: string;
  firebaseId: string;
  role?: string;
}
