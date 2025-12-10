import react from "@vitejs/plugin-react";
import { ConfigEnv, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default ({ mode }: ConfigEnv) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base: "/",
        server: {
            port: 3000,
            host: true,
            proxy: {
                "/api": {
                    target: "http://localhost:8000",
                },
                "/images/": {
                    target: "http://localhost:9000/",
                },
            },
        },
        plugins: [react(), tsconfigPaths()],
        test: {
            coverage: {
                reporter: ["text", "json-summary", "json"],
                reportOnFailure: true,
            },
        },
    });
};
