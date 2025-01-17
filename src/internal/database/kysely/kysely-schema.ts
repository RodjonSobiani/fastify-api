import {ColumnType, Generated, Insertable, Selectable, Updateable} from "kysely";

export interface UsersTable {
    id: Generated<string>;
    email: string;
    password_hash: string;
    created_at: ColumnType<Date, string | Date | undefined>;
}

export type Users = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export interface Database {
    users: UsersTable;
}
