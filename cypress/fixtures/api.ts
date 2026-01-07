export const CommonMocks = {
    items: {
        empty: {
            method: "GET" as const,
            url: "/api/items?offset=0",
            response: {
                statusCode: 200,
                body: [],
            },
            alias: "itemsEmpty",
        },
        withData: {
            method: "GET" as const,
            url: "/api/items?offset=0",
            response: {
                statusCode: 200,
                body: [
                    { id: 1, name: "Item 1", price: 100 },
                    { id: 2, name: "Item 2", price: 200 },
                ],
            },
            alias: "itemsWithData",
        },
    },

    types: {
        empty: {
            method: "GET" as const,
            url: "/api/items/types",
            response: {
                statusCode: 200,
                body: [],
            },
            alias: "typesEmpty",
        },
    },

    producers: {
        empty: {
            method: "GET" as const,
            url: "/api/items/producers",
            response: {
                statusCode: 200,
                body: [],
            },
            alias: "producersEmpty",
        },
    },

    orders: {
        draft: {
            empty: {
                method: "GET",
                url: "/api/orders/draft/",
                response: { statusCode: 200 },
                alias: "orderDraftEmpty",
            },
        },
    },
};

export const AuthMocks = {
    check: {
        unauthorized: {
            method: "POST" as const,
            url: "/api/auth/check/",
            response: {
                statusCode: 401,
                body: { message: "Unauthorized", statusCode: 401 },
            },
            alias: "checkFailed",
        },
        authorized: {
            method: "POST" as const,
            url: "/api/auth/check/",
            response: {
                statusCode: 200,
                body: {
                    id: 1,
                    email: "user@user.com",
                    name: "Трофим Семенов",
                },
            },
            alias: "checkSuccess",
        },
    },

    login: {
        success: {
            method: "POST" as const,
            url: "/api/auth/login/",
            response: {
                statusCode: 200,
                body: {
                    id: 1,
                    email: "user@user.com",
                    name: "Трофим Семенов",
                    phone: "+79251411694",
                    foreign: false,
                    role: 0,
                },
            },
            alias: "loginSuccess",
        },
        error: {
            method: "POST" as const,
            url: "/api/auth/login/",
            response: {
                statusCode: 400,
                body: { message: "Invalid credentials" },
            },
            alias: "loginError",
        },
    },

    register: {
        success: {
            method: "POST" as const,
            url: "/api/auth/register/",
            response: {
                statusCode: 200,
                body: {
                    id: 1,
                    email: "user@user.com",
                    name: "Трофим Семенов",
                    phone: "+79251411694",
                    foreign: false,
                    role: 0,
                },
            },
            alias: "registerSuccess",
        },
    },
} as const;
