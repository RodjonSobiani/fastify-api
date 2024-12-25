import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../../external/database/repositories/userRepo';
import {config} from "../../../app/config";

export class AuthService {
    constructor(private userRepo: UserRepository) {}

    async register(email: string, password: string) {
        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepo.create({ email, password: hashedPassword });

        return this.generateTokens(user.id);
    }

    async login(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        return this.generateTokens(user.id);
    }

    private generateTokens(userId: string) {
        const accessToken = jwt.sign({ userId }, config.jwt.secret, { expiresIn: config.jwt.expiration });
        const refreshToken = jwt.sign({ userId }, config.jwt.secret, { expiresIn: '7d' });

        return { accessToken, refreshToken };
    }
}