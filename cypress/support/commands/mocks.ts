import { AuthMocks, CommonMocks } from "fixtures/api";
import { MockUtils } from "../utils/mock-utils";

Cypress.Commands.add(
    "setupAuthMocks",
    (authState: "authorized" | "unauthorized") => {
        // Аутентификация
        if (authState === "unauthorized") {
            MockUtils.intercept(AuthMocks.check.unauthorized);
        } else {
            MockUtils.intercept(AuthMocks.check.authorized);
        }

        // Общие моки
        MockUtils.intercept(CommonMocks.types.empty);
        MockUtils.intercept(CommonMocks.items.empty);

        // Дополнительные моки
        MockUtils.intercept({
            method: "GET",
            url: "/api/items/producers",
            response: { statusCode: 200, body: [] },
            alias: "producers",
        });

        MockUtils.intercept({
            method: "GET",
            url: "/api/orders/draft/",
            response: { statusCode: 200, body: {} },
            alias: "draftOrders",
        });

        // Логин и регистрация всегда доступны
        MockUtils.intercept(AuthMocks.login.success);
        MockUtils.intercept(AuthMocks.register.success);
    }
);
