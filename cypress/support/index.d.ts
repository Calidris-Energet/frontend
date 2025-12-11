/// <reference types="cypress" />

// Расширяем типы Cypress
declare global {
    namespace Cypress {
        interface Chainable {
            setupAuthMocks(): Chainable<void>;
            login(email: string, password: string): Chainable<void>;
            verifyProfile(user: Record<string, string>): Chainable<void>;
        }
    }
}

export {};
