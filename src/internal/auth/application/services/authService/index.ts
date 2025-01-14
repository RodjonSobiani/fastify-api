import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../../../db';
import { config } from '../../../../../app/config';
import {v4 as uuidV4} from "uuid";

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export class AuthService {
    static async registerUser(email: string, password: string): Promise<void> {
        const passwordHash = await bcrypt.hash(password, 10);

        await db
            .insertInto('users')
            .values({
                id: uuidV4(),
                email,
                password_hash: passwordHash,
                created_at: new Date(),
            })
            .execute();
    }

    static async loginUser(email: string, password: string): Promise<Tokens | null> {
        const user = await db
            .selectFrom('users')
            .select(['id', 'password_hash'])
            .where('email', '=', email)
            .executeTakeFirst();

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return null;
        }

        const accessToken = jwt.sign({ userId: user.id }, config.jwt.secret, {
            expiresIn: config.jwt.expiration,
        });

        const refreshToken = jwt.sign({ userId: user.id }, config.jwt.secret, {
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }
}
