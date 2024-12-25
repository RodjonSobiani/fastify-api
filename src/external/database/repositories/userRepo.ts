export class UserRepository {
    private users = new Map<string, { id: string; email: string; password: string }>();

    async findByEmail(email: string) {
        return Array.from(this.users.values()).find(user => user.email === email) || null;
    }

    async create(user: { email: string; password: string }) {
        const id = `${this.users.size + 1}`;
        const newUser = { id, ...user };
        this.users.set(id, newUser);
        return newUser;
    }
}