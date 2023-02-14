import { faker } from '@faker-js/faker'
import { expect } from 'chai';
import AuthService from "../../services/AuthService";
import { password } from '../fixtures/auth.fixtures';

const { hashPassword, comparePasswords, generateToken, decodeToken } = AuthService;

let token: string;
let hashedPassword: string;

describe(("Authentication Services"), () => {
    it('Should has password', async() => {
        const result = await hashPassword(password);
        hashedPassword = result;
        expect(result).to.be.a('string');
        expect(result).not.to.be.a('null');
    });
    it('Should generate token', () => {
        const result = generateToken(faker.random.alphaNumeric())
        token = result;
        expect(result).to.be.a('string');
        expect(result).not.to.be.a('null');
    });
    it('Should decode token', () => {
        const result = decodeToken(token);
        expect(result).to.be.an('object');
        expect(result).not.to.be.a('null');
    });
    it('Should compare password', async () => {
        const result = await comparePasswords(password, hashedPassword);
        expect(result).to.be.a('boolean');
    });
});