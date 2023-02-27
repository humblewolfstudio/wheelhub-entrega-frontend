import { calculateStrength, createUser } from "./Login.utility.tsx";

describe('Login', () => {

    it('password strength 1', () => {
        const strength = calculateStrength("Test");

        expect(strength).toBe(1);
    })

    it('password strength 3', () => {
        const strength = calculateStrength("Test12345");

        expect(strength).toBe(3);
    })

    it('password strength 4', () => {
        const strength = calculateStrength("Test12345*");

        expect(strength).toBe(4);
    })

    it('backend working', async () => {
        const userCreated = await createUser("test", "Test12345");

        expect(userCreated).toBe(true);
    })
});