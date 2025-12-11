export const apiMocks = {
    emptyTypes: {
        method: "GET",
        url: "/api/items/types",
        response: { statusCode: 200, body: [] },
    },

    emptyProducers: {
        method: "GET",
        url: "/api/items/producers",
        response: { statusCode: 200, body: [] },
    },

    emptyItems: {
        method: "GET",
        url: "/api/items?offset=0",
        response: { statusCode: 200, body: [] },
    },

    draftOrders: {
        method: "GET",
        url: "/api/orders/draft/",
        response: { statusCode: 200 },
    },
};
