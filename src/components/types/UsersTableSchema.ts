import { Entity } from '../../domain/types/Entity'
import { User } from '../../domain/models/User'
import { UserFieldType } from './UserFieldType'

export type UsersTableSchemaItem = {
    code: keyof Entity<User>;
    type?: UserFieldType;
    header: {
        title: string;
        filter?: boolean;
        sort?: boolean;
    };
    readonly?: boolean;
}

export type UsersTableSchema = UsersTableSchemaItem[]
