import {
    ConsoleInstrumentation,
    createReactRouterV6Options,
    ErrorsInstrumentation,
    getWebInstrumentations,
    initializeFaro,
    ReactIntegration,
    WebVitalsInstrumentation,
} from "@grafana/faro-react";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";
import {
    createRoutesFromChildren,
    matchRoutes,
    Routes,
    useLocation,
    useNavigationType,
} from "react-router-dom";

const initFaro = () => {
    initializeFaro({
        url:
            process.env.NODE_ENV == "production"
                ? `${import.meta.env.VITE_PRODUCTION_URL}/collect`
                : `http://localhost:3101/collect`,
        app: {
            name: "frontend-app",
            version: "1.0.0",
            environment: process.env.NODE_ENV,
        },
        trackResources: true,
        trackGeolocation: true,
        instrumentations: [
            ...getWebInstrumentations({
                captureConsole: true,
            }),
            new ReactIntegration({
                router: createReactRouterV6Options({
                    createRoutesFromChildren,
                    matchRoutes,
                    Routes,
                    useLocation,
                    useNavigationType,
                }),
            }),
            new TracingInstrumentation(),
            new ConsoleInstrumentation(),
            new ErrorsInstrumentation(),
            new WebVitalsInstrumentation(),
        ],
    });
};
export default initFaro;
