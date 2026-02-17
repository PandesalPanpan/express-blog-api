export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

export const SECRET = process.env.SECRET ?? 'maculitiza';

export const SALT_ROUNDS = process.env.SALT_ROUNDS ?? Number(10);

export const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error("Missing DATABASE URL");
}
