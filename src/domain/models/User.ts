export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export type User = {
    firstName: string;
    lastName: string;
    role: UserRole;
    birthdate: Date;
    photo: string;
}
