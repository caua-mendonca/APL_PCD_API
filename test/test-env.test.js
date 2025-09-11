import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
describe('Environment Configuration', () => {
    test('should load .env file correctly', () => {
        const envPath = path.resolve(process.cwd(), '.env');
        expect(() => {
            const fileContent = fs.readFileSync(envPath, { encoding: 'utf8' });
            expect(fileContent).toBeDefined();
        }).not.toThrow();
    });
    test('should have required environment variables', () => {
        dotenv.config();
        expect(process.env.DB_USER).toBeDefined();
        expect(process.env.DB_HOST).toBeDefined();
        expect(process.env.DB_DATABASE).toBeDefined();
        expect(process.env.DB_PASSWORD).toBeDefined();
        expect(process.env.DB_PORT).toBeDefined();
    });
});
