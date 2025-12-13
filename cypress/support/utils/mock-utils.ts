import { RouteMock } from "../../fixtures/types";

export class MockUtils {
    static intercept(mock: RouteMock) {
        const { method, url, response, alias } = mock;

        cy.intercept(method, url, {
            statusCode: response.statusCode,
            body: response.body,
            headers: response.headers,
        }).as(alias || this.generateAlias(method, url));
    }

    static interceptMultiple(mocks: RouteMock[]) {
        mocks.forEach((mock) => this.intercept(mock));
    }

    static generateAlias(method: string, url: string): string {
        const urlPart = url.replace(/[^a-zA-Z0-9]/g, "_");
        return `${method.toLowerCase()}_${urlPart}`;
    }

    static waitForAll(aliases: string[]) {
        aliases.forEach((alias) => cy.wait(`@${alias}`));
    }
}
