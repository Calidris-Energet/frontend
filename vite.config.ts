import react from "@vitejs/plugin-react";
import { ConfigEnv, defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: ConfigEnv) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        base: "/",
        server: {
            port: 80,
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
    });
};
