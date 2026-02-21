import { FaroErrorBoundary } from "@grafana/faro-react";
import { YMaps } from "@pbe/react-yandex-maps";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as VKID from "@vkid/sdk";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ErrorFallback from "shared/ErrorFallback/ErrorFallback.tsx";
import initFaro from "shared/monitoring";
import { StoreProvider } from "src/app/providers/StoreProvider";
import { AppRouter } from "src/app/Router/AppRouter.tsx";

const isCypress = window.Cypress;

if (!isCypress) {
    VKID.Config.init({
        app: import.meta.env.VITE_VK_SDK_APP_ID,
        redirectUrl: import.meta.env.VITE_VK_ID_REDIRECT_URL,
        scope: "email",
        responseMode: VKID.ConfigResponseMode.Callback,
    });
}

const root = createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();

if (
    process.env.NODE_ENV == "production" &&
    import.meta.env.VITE_SENTRY_ENABLED === "true"
) {
    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        sendDefaultPii: true,
    });
}

initFaro();

root.render(
    <FaroErrorBoundary
        fallback={(error, resetError) => (
            <ErrorFallback error={error} resetErrorBoundary={resetError} />
        )}
    >
        <StoreProvider>
            <QueryClientProvider client={queryClient}>
                <YMaps
                    query={{
                        apikey: import.meta.env.VITE_YMAPS_API_KEY,
                    }}
                >
                    <BrowserRouter basename="/">
                        <AppRouter />
                    </BrowserRouter>
                </YMaps>
            </QueryClientProvider>
        </StoreProvider>
    </FaroErrorBoundary>
);
