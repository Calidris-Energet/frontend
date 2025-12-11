export {};

declare global {
    interface Window {
        Cypress?: {
            [key: string]: never;
        };
    }
}
